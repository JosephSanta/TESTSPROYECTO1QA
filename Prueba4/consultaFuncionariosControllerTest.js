const request = require('supertest');
const app = require('../src/app'); 
const Funcionario = require('../src/models/Usuario_Funcionario');

jest.mock('../src/models/Usuario_Funcionario');
jest.mock('../controllers/token', () => ({
    verifyToken: (req, res, next) => next(), // Burlar el middleware
}));

describe('Controlador de consulta de funcionario', () => {
  
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('Debe obtener un funcionario por cédula', async () => {
    const mockFuncionario = { identificacion: '12345', nombre: 'Julian Pérez' };
    Funcionario.findOne.mockResolvedValue(mockFuncionario);

    const res = await request(app).get('/findByID/12345');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockFuncionario);
    expect(Funcionario.findOne).toHaveBeenCalledWith({ identificacion: '12345' });
  });

  test('Debe obtener todos los funcionarios', async () => {
    const mockFuncionarios = [
      { identificacion: '12345', nombre: 'Julian Pérez' },
      { identificacion: '67890', nombre: 'Ana López' },
    ];
    Funcionario.find.mockResolvedValue(mockFuncionarios);

    const res = await request(app).get('/get-all');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockFuncionarios);
    expect(Funcionario.find).toHaveBeenCalled();
  });

  test('Debe actualizar un funcionario', async () => {
    const mockFuncionario = { identificacion: '12345', nombre: 'Julian Pérez', overwrite: jest.fn(), save: jest.fn() };
    Funcionario.findOne.mockResolvedValue(mockFuncionario);

    const res = await request(app).put('/updateByID/12345').send({ nombre: 'Julian Actualizado' });

    expect(res.statusCode).toBe(200);
    expect(mockFuncionario.overwrite).toHaveBeenCalledWith({ nombre: 'Julian Actualizado' });
    expect(mockFuncionario.save).toHaveBeenCalled();
    expect(res.text).toBe('Updated');
  });

  test('Debe borrar un funcionario', async () => {
    Funcionario.findOneAndDelete.mockResolvedValue({});

    const res = await request(app).delete('/deleteByID/12345');

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Deleted');
    expect(Funcionario.findOneAndDelete).toHaveBeenCalledWith({ identificacion: '12345' });
  });
});
