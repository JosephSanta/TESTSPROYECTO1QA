const registrarHorarioController = {};

const Funcionario = require("../models/Usuario_Funcionario");

registrarHorarioController.asociarHorario = async (req, res) => {
    const funcionarioEncontrado = await Funcionario.findOne({
      identificacion: req.params.cedula_funcionario,
    });
    const horariosFuncionario = funcionarioEncontrado;
  
    horariosFuncionario.horario.push(req.body);
  
      await funcionarioEncontrado.save();
      
    res.send("Horario añadido");
    
  };

  registrarHorarioController.getHorarios = async (req, res) => {
    const funcionarioEncontrado = await Funcionario.findOne({
      identificacion: req.id,
    });
    console.log(req.id);    
    const horariosFuncionario = funcionarioEncontrado;
  
    res.send(horariosFuncionario.horario);
    
  };

  registrarHorarioController.updateHorarios = async (req, res) => {
    console.log("in api");
    const funcionarioEncontrado = await Funcionario.findOne({identificacion: req.id})
    funcionarioEncontrado.horario = req.body;
    funcionarioEncontrado.overwrite(funcionarioEncontrado);
    await funcionarioEncontrado.save();
    res.send("Updated");
};

module.exports = registrarHorarioController;
