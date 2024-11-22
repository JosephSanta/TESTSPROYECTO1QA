const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const parqueoAController = require('../src/controllers/registrar-parqueo.controller');


const Parqueo = require('../src/models/Parqueo');
jest.mock('../src/models/Parqueo');


const app = express();
app.use(express.json()); 


router.post('/parqueo', parqueoAController.registrarParqueo);
app.use('/', router);

describe('Pruebas para el controlador de parqueo', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Debería registrar un nuevo parqueo', async () => {
        const parqueoData = {
            _id_parqueo: '123',
            nombre: 'Parqueo Central',
            ubicacion: 'Centro',
        };


        Parqueo.findOne.mockResolvedValue(null); 

        const parqueoMock = {
            save: jest.fn(),
        };
        Parqueo.mockImplementation(() => parqueoMock);

        const response = await request(app)
            .post('/parqueo')
            .send(parqueoData)
            .expect(200); 

        expect(Parqueo.findOne).toHaveBeenCalledWith({ _id_parqueo: parqueoData._id_parqueo }); 
        expect(Parqueo).toHaveBeenCalledWith(parqueoData); 
        expect(parqueoMock.save).toHaveBeenCalled();
        expect(response.text).toBe('Registered');
    });

    it('No debería registrar un parqueo con ID existente', async () => {
        const parqueoData = {
            _id_parqueo: '123',
            nombre: 'Parqueo Central',
            ubicacion: 'Centro',
        };


        Parqueo.findOne.mockResolvedValue(parqueoData);

        const response = await request(app)
            .post('/parqueo')
            .send(parqueoData)
            .expect(401); 

        expect(Parqueo.findOne).toHaveBeenCalledWith({ _id_parqueo: parqueoData._id_parqueo }); 
        expect(response.text).toBe('El id del parqueo ya existe'); 
    });
});
