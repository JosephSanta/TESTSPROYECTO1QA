// * Controlador de '/home' *//

const funcionarioController = {};

const Funcionario = require("../models/Usuario_Funcionario");

funcionarioController.registrarFuncionario = async (req, res) => {
  const newFuncionario = new Funcionario(req.body);

  await newFuncionario.save();

  res.send("Funcionario created successfully");
};

module.exports = funcionarioController;
