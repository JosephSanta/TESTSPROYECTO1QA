const request = require("supertest");
const express = require("express");
const mongodb = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const Parqueo = require('../src/models/Parqueo');
const consultaParqueosController = require('../src/controllers/consulta-parqueos.controller');

// Setup de Express para pruebas
const app = express();
app.use(express.json());
app.get("/parqueo/:mongo_id", consultaParqueosController.getParqueo);
app.get(
    "/parqueo/:mongo_id/espacios",
    consultaParqueosController.getEspaciosParqueo
);
app.get("/parqueos", consultaParqueosController.getAllParqueos);
app.get("/parqueos/combo", consultaParqueosController.getAllParqueosCombo);
app.put("/parqueo/:mongo_id", consultaParqueosController.updateOneParqueo);
app.delete("/parqueo/:mongo_id", consultaParqueosController.deleteParqueo);

describe("Controlador de parqueos", () => {
    let mongoServer;
    let mongoId;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const parqueo = new Parqueo({
            _id_parqueo: "P001",
            tipo: "Cubierto",
            espacios: 20,
        });
        await parqueo.save();
        mongoId = parqueo._id;
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    test("Debería obtener un parqueo por ID", async () => {
        const res = await request(app).get(`/parqueo/${mongoId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id_parqueo).toBe("P001");
        expect(res.body.tipo).toBe("Cubierto");
    });

    test("Debería obtener los espacios de un parqueo", async () => {
        const res = await request(app).get(`/parqueo/${mongoId}/espacios`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe(20);
    });

    test("Debería devolver todos los parqueos", async () => {
        const res = await request(app).get("/parqueos");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
    });

    test("Debería devolver parqueos en formato combo", async () => {
        const res = await request(app).get("/parqueos/combo");
        expect(res.statusCode).toBe(200);
        expect(res.body[0].nombre).toBe("P001");
    });

    test("Debería actualizar un parqueo", async () => {
        const res = await request(app)
            .put(`/parqueo/${mongoId}`)
            .send({ _id_parqueo: "P002", tipo: "Abierto", espacios: 25 });
        expect(res.statusCode).toBe(200);

        const parqueoActualizado = await Parqueo.findById(mongoId);
        expect(parqueoActualizado._id_parqueo).toBe("P002");
        expect(parqueoActualizado.tipo).toBe("Abierto");
    });

    test("Debería eliminar un parqueo", async () => {
        const res = await request(app).delete(`/parqueo/${mongoId}`);
        expect(res.statusCode).toBe(200);

        const parqueoEliminado = await Parqueo.findById(mongoId);
        expect(parqueoEliminado).toBeNull();
    });
});
