const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const registrarHorarioController = require('../src/controllers/registro-horario.controller');

const Funcionario = require('../src/models/Usuario_Funcionario');
jest.mock('../src/models/Usuario_Funcionario');


const app = express();
app.use(express.json()); 

router.post('/asociar/:cedula_funcionario', registrarHorarioController.asociarHorario);
router.get('/horarios/:id', registrarHorarioController.getHorarios);
router.put('/update/:id', registrarHorarioController.updateHorarios);
app.use('/funcionario', router);

describe('Pruebas para el controlador de registro de horarios', () => {

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('Debe manejar correctamente POST /funcionario/asociar/:cedula_funcionario', async () => {
        // Simular un funcionario encontrado
        const funcionarioMock = {
            identificacion: '12345',
            horario: [],
            save: jest.fn(),
        };

        Funcionario.findOne.mockResolvedValue(funcionarioMock); 

        const horarioData = { dia: 'Lunes', hora: '09:00 - 17:00' };

        const response = await request(app)
            .post('/funcionario/asociar/12345')
            .send(horarioData)
            .expect(200); 

        expect(Funcionario.findOne).toHaveBeenCalledWith({ identificacion: '12345' });
        expect(funcionarioMock.horario).toContainEqual(horarioData);
        expect(funcionarioMock.save).toHaveBeenCalled();
        expect(response.text).toBe('Horario añadido');
    });

    it('Debe manejar correctamente GET /funcionario/horarios/:id', async () => {
        
        const funcionarioMock = {
            identificacion: '12345',
            horario: [{ dia: 'Lunes', hora: '09:00 - 17:00' }],
        };

        Funcionario.findOne.mockResolvedValue(funcionarioMock); 

        const response = await request(app)
            .get('/funcionario/horarios/12345')
            .expect(200); 

        expect(Funcionario.findOne).toHaveBeenCalledWith({ identificacion: '12345' });
        expect(response.body).toEqual(funcionarioMock.horario);
    });

    it('Debe manejar correctamente PUT /funcionario/update/:id', async () => {
        
        const funcionarioMock = {
            identificacion: '12345',
            horario: [{ dia: 'Lunes', hora: '09:00 - 17:00' }],
            overwrite: jest.fn(),
            save: jest.fn(),
        };

        Funcionario.findOne.mockResolvedValue(funcionarioMock); 

        const nuevosHorarios = [{ dia: 'Martes', hora: '10:00 - 18:00' }];

        const response = await request(app)
            .put('/funcionario/update/12345')
            .send(nuevosHorarios)
            .expect(200); 

        expect(Funcionario.findOne).toHaveBeenCalledWith({ identificacion: '12345' });
        expect(funcionarioMock.horario).toEqual(nuevosHorarios);
        expect(funcionarioMock.save).toHaveBeenCalled();
        expect(response.text).toBe('Updated');
    });
});
