const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Parqueo = require('../src/models/Parqueo');

describe("Modelo de Parqueo", () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async () => {
        await Parqueo.deleteMany({});
    });

    test("Debería crear un parqueo correctamente", async () => {
        const parqueoData = {
            _id_parqueo: "P001",
            tipo: "Cubierto",
            capacidad_total: 100,
            capacidad_actual: 50,
            horario: [
                {
                    dia: "Lunes",
                    hora_entrada: "08:00",
                    hora_salida: "18:00",
                },
            ],
            espacios: [
                {
                    _id: "E001",
                    tipo: "General",
                    ocupado: "No",
                },
            ],
            campus: "Central",
            espacios_jefatura: 5,
            espacios_VOficiales: 10,
            espacios_asignados: 30,
            espacios_visitantes: 20,
            espacios_NEspeciales: 5,
            direccion: "Calle 123",
            id_contrato: "C001",
            contacto: "contacto@empresa.com",
        };

        const parqueoCreado = await Parqueo.create(parqueoData);

        expect(parqueoCreado._id_parqueo).toBe("P001");
        expect(parqueoCreado.tipo).toBe("Cubierto");
        expect(parqueoCreado.capacidad_total).toBe(100);
        expect(parqueoCreado.capacidad_actual).toBe(50);
        expect(parqueoCreado.horario[0].dia).toBe("Lunes");
        expect(parqueoCreado.espacios[0]._id).toBe("E001");
        expect(parqueoCreado.campus).toBe("Central");
        expect(parqueoCreado.espacios_jefatura).toBe(5);
    });

    test("Debería fallar al crear un parqueo sin el campo requerido '_id_parqueo'", async () => {
        const parqueoDataInvalido = {
            tipo: "Cubierto",
            capacidad_total: 100,
            capacidad_actual: 50,
        };

        try {
            await Parqueo.create(parqueoDataInvalido);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.errors._id_parqueo).toBeDefined();
        }
    });

    test("Debería actualizar un parqueo existente", async () => {
        const parqueoData = {
            _id_parqueo: "P001",
            tipo: "Cubierto",
            capacidad_total: 100,
            capacidad_actual: 50,
            campus: "Central",
        };

        const parqueoCreado = await Parqueo.create(parqueoData);

        parqueoCreado.tipo = "Abierto";
        parqueoCreado.capacidad_actual = 80;

        const parqueoActualizado = await parqueoCreado.save();

        expect(parqueoActualizado.tipo).toBe("Abierto");
        expect(parqueoActualizado.capacidad_actual).toBe(80);
    });

    test("Debería eliminar un parqueo correctamente", async () => {
        const parqueoData = {
            _id_parqueo: "P001",
            tipo: "Cubierto",
            capacidad_total: 100,
            capacidad_actual: 50,
            campus: "Central",
        };

        const parqueoCreado = await Parqueo.create(parqueoData);
        await Parqueo.deleteOne({ _id: parqueoCreado._id });

        const parqueoEliminado = await Parqueo.findById(parqueoCreado._id);
        expect(parqueoEliminado).toBeNull();
    });
});
