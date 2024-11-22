const request = require("supertest");
const app = require('../src/app'); // Asegúrate de que apunte a tu archivo principal de Express
const Reserva = require('../src/models/Reserva'); // Importa el modelo que se va a mockear

// Mockear el modelo de Reserva
jest.mock('../src/models/Reserva');

describe("Pruebas para reservarEspacioController", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar mocks antes de cada prueba
    });

    it("POST /submitReservation debería crear una nueva reserva", async () => {
        const nuevaReserva = {
            cliente: "Juan Pérez",
            espacio: "A1",
            fecha: "2024-10-10",
            hora_inicio: "10:00",
            hora_fin: "12:00",
        };

        // Simular el comportamiento de guardar la reserva
        Reserva.prototype.save = jest.fn().mockResolvedValue(nuevaReserva);

        const response = await request(app)
            .post("/submitReservation")
            .send(nuevaReserva);

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Reservation created successfully");
        expect(Reserva.prototype.save).toHaveBeenCalled();
    });

    it("GET /getReservas debería devolver todas las reservas", async () => {
        const reservasMock = [
            {
                cliente: "Juan Pérez",
                espacio: "A1",
                fecha: "2024-10-10",
                hora_inicio: "10:00",
                hora_fin: "12:00",
            },
            {
                cliente: "Ana García",
                espacio: "B2",
                fecha: "2024-10-11",
                hora_inicio: "14:00",
                hora_fin: "16:00",
            },
        ];

        // Simular la respuesta de Reserva.find()
        Reserva.find.mockResolvedValue(reservasMock);

        const response = await request(app).get("/getReservas");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(reservasMock); // Verifica que el cuerpo de la respuesta sea el mock
        expect(Reserva.find).toHaveBeenCalled();
    });
});
