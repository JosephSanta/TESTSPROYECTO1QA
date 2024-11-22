const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const reservarEspacioController = require('../src/controllers/reservar-espacio.controller');

const Reserva = require('../src/models/Reserva');
jest.mock('../src/models/Reserva');

const app = express();
app.use(express.json());


router.post('/reservar', reservarEspacioController.submitReservation);
router.get('/reservas', reservarEspacioController.getReservas);
app.use('/parqueo', router);

describe('Pruebas para el controlador de reservas', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Debe manejar correctamente POST /parqueo/reservar', async () => {

        const reservaMock = {
            _id_reserva: '123',
            id_persona: '001',
            parqueo: 'A1',
            placa: 'XYZ123',
            hora_entrada: '2024-10-01 09:00',
            hora_salida: '2024-10-01 17:00',
            save: jest.fn(),
        };

        Reserva.mockImplementation(() => reservaMock);

        const reservaData = {
            _id_reserva: '123',
            id_persona: '001',
            parqueo: 'A1',
            placa: 'XYZ123',
            hora_entrada: '2024-10-01 09:00',
            hora_salida: '2024-10-01 17:00'
        };

        const response = await request(app)
            .post('/parqueo/reservar')
            .send(reservaData)
            .expect(200);

        expect(Reserva).toHaveBeenCalledWith(reservaData);
        expect(reservaMock.save).toHaveBeenCalled();
        expect(response.text).toBe('Reservation created successfully');
    });

    it('Debe manejar correctamente GET /parqueo/reservas', async () => {
        // Simular reservas
        const reservasMock = [
            {
                _id_reserva: '123',
                id_persona: '001',
                parqueo: 'A1',
                placa: 'XYZ123',
                hora_entrada: '2024-10-01 09:00',
                hora_salida: '2024-10-01 17:00',
            },
            {
                _id_reserva: '124',
                id_persona: '002',
                parqueo: 'B2',
                placa: 'ABC456',
                hora_entrada: '2024-10-02 08:00',
                hora_salida: '2024-10-02 18:00',
            },
        ];

        Reserva.find.mockResolvedValue(reservasMock);

        const response = await request(app)
            .get('/parqueo/reservas')
            .expect(200);

        expect(Reserva.find).toHaveBeenCalled();
        expect(response.body).toEqual(reservasMock);
    });
});
