const request = require('supertest');
const express = require('express');
const router = require('../src/routes/reservar-espacio.routes'); // Ruta del archivo de rutas
const token = require('../src/controllers/token'); // Simular verificación de token

// Simular el middleware de token.verifyToken para pruebas
jest.mock('../src/controllers/token', () => ({
  verifyToken: (req, res, next) => next(),
}));

// Simular el controlador de reservar espacio
const reservarEspacioController = require('../src/controllers/reservar-espacio.controller');
jest.mock('../src/controllers/reservar-espacio.controller', () => ({
  submitReservation: jest.fn((req, res) => res.status(201).send('Reservation created successfully')),
  getReservas: jest.fn((req, res) => res.status(200).json([{ _id: '1', parqueo: 'Central' }])),
}));

// Crear una app Express para pruebas
const app = express();
app.use(express.json()); // Soporte para JSON
app.use('/reservar-espacio', router); // Montar el enrutador

describe('Pruebas para las rutas de reservar espacio', () => {
  it('Debe manejar correctamente POST /reservar-espacio/', async () => {
    const reservaData = {
      _id_reserva: 'RES123',
      id_persona: 'P123',
      parqueo: 'Parqueo Central',
      placa: 'ABC123',
      hora_entrada: '10:00',
      hora_salida: '12:00',
    };

    const response = await request(app)
      .post('/reservar-espacio/')
      .send(reservaData)
      .expect(201); // Se espera un código de estado 201 (Created)

    expect(response.text).toBe('Reservation created successfully');
    expect(reservarEspacioController.submitReservation).toHaveBeenCalled();
  });

  it('Debe manejar correctamente GET /reservar-espacio/get-all', async () => {
    const response = await request(app)
      .get('/reservar-espacio/get-all')
      .expect(200); // Se espera un código de estado 200 (OK)

    expect(response.body).toEqual([{ _id: '1', parqueo: 'Central' }]);
    expect(reservarEspacioController.getReservas).toHaveBeenCalled();
  });
});
