// * Controlador de '/home' *//

const descargasInformesController = {};
const Funcionario = require("../models/Usuario_Funcionario");

descargasInformesController.getByCampusDepartamento = async (req, res) => {
    const foundFuncionarios = await Funcionario.find({'departamentos.campus': req.params.campus, 'departamentos.departamento' : req.params.departamento})
    
    res.send(foundFuncionarios)
};
descargasInformesController.getByCampus = async (req, res) => {
    const foundFuncionarios = await Funcionario.find({'departamentos.campus': req.params.campus})
    
    res.send(foundFuncionarios)
};
module.exports = descargasInformesController;
