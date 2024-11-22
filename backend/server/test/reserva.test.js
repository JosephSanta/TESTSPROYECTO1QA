const mongoose = require('mongoose');
const Reserva = require('../src/models/Reserva'); 

describe('Pruebas para el modelo de Reservas', () => {
    beforeAll(async () => {
        
        mongoose.Promise = global.Promise;
    });

    afterEach(async () => {
        
        jest.clearAllMocks();
    });

    it('Debe crear correctamente una nueva reserva con los campos requeridos', async () => {
        const nuevaReserva = new Reserva({
            _id_reserva: 'RES123',
            id_persona: 'P123',
            parqueo: 'Parqueo Central',
            placa: 'ABC123',
            hora_entrada: '10:00',
            hora_salida: '12:00'
        });

        expect(nuevaReserva._id_reserva).toBe('RES123');
        expect(nuevaReserva.id_persona).toBe('P123');
        expect(nuevaReserva.parqueo).toBe('Parqueo Central');
        expect(nuevaReserva.placa).toBe('ABC123');
        expect(nuevaReserva.hora_entrada).toBe('10:00');
        expect(nuevaReserva.hora_salida).toBe('12:00');
    });

    it('Debe lanzar un error si falta algún campo obligatorio', async () => {
        try {
            const reservaInvalida = new Reserva({
                _id_reserva: 'RES123',
                // id_persona está ausente
                parqueo: 'Parqueo Central',
                placa: 'ABC123',
                hora_entrada: '10:00',
                hora_salida: '12:00'
            });
            await reservaInvalida.validate(); 
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError); 
        }
    });

    it('Debe agregar automáticamente los timestamps al crear una nueva reserva', async () => {
        const nuevaReserva = new Reserva({
            _id_reserva: 'RES123',
            id_persona: 'P123',
            parqueo: 'Parqueo Central',
            placa: 'ABC123',
            hora_entrada: '10:00',
            hora_salida: '12:00'
        });

        expect(nuevaReserva.createdAt).toBeUndefined(); 
        expect(nuevaReserva.updatedAt).toBeUndefined();

        await nuevaReserva.save(); 

        expect(nuevaReserva.createdAt).toBeDefined(); 
        expect(nuevaReserva.updatedAt).toBeDefined();
    });
});
