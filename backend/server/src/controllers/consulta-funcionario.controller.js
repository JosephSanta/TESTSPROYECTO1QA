// * Controlador de 'consulta de funcionario' *//


const Funcionario = require("../models/Usuario_Funcionario");

const consultaFuncionarioController = {};

consultaFuncionarioController.display = (req, res) =>
  res.send("[Página de búsqueda de funcionario]");

consultaFuncionarioController.getFuncionario = async (req, res) => {
  console.log(req.params.cedula_funcionario);

  const funcionarioEncontrado = await Funcionario.findOne({identificacion: req.params.cedula_funcionario})

  res.send(funcionarioEncontrado);
};

consultaFuncionarioController.getFuncionarioByCorreoInstitucional = async (req, res) => {
  console.log(req.params.correo_institucional);

  const funcionarioEncontrado = await Funcionario.findOne({correo_institucional: req.params.correo_institucional})

  res.send(funcionarioEncontrado);
};


consultaFuncionarioController.getAllFuncionarios = async (req, res) => {
    const foundFuncionarios = await Funcionario.find()
    res.send(foundFuncionarios)

};

consultaFuncionarioController.updateOneFuncionario = async (req, res) => {
    const funcionarioEncontrado = await Funcionario.findOne({identificacion: req.params.cedula_funcionario})
    funcionarioEncontrado.overwrite(req.body);
    await funcionarioEncontrado.save();
    res.send("Updated");
};

consultaFuncionarioController.getByCampusDepartamento = async (req, res) => {
  const foundFuncionarios = await Funcionario.find({'departamentos.campus': req.params.campus, 'departamentos.departamento' : req.params.departamento})
  
  res.send(foundFuncionarios)
};

consultaFuncionarioController.getByCampus = async (req, res) => {
  const foundFuncionarios = await Funcionario.find({'departamentos.campus': req.params.campus})
  
  res.send(foundFuncionarios)
};

consultaFuncionarioController.editarCorreoPersonal = async (req, res) => {
  const func = await Funcionario.findOneAndUpdate({ identificacion: req.params.cedula_funcionario }, req.body);
  res.send("Updated");
}

consultaFuncionarioController.borrarFuncionario = async (req, res) => {
  const func = await Funcionario.findOneAndDelete({ identificacion: req.params.cedula_funcionario }, req.body);
  res.send("Deleted");
}

consultaFuncionarioController.getHorariosAdm = async (req, res) => {
  horarios = []
  
  const foundFuncionarios = await Funcionario.find({'tipo_funcionario': "Administrador", 'departamentos.campus': req.params.campus})
  for (let index = 0; index < foundFuncionarios.length; index++) {
    //console.log(placasFuncionario.placas_asociadas[index].codigo_placa);  
    for (let index2 = 0; index2 < foundFuncionarios[index].horario.length; index2++) {
      //console.log(placasFuncionario.placas_asociadas[index].codigo_placa);  
      horarios.push(foundFuncionarios[index].horario[index2])
    }
  }
  res.send(horarios)
}

consultaFuncionarioController.getHorariosDoc = async (req, res) => {
  horarios = []
  
  const foundFuncionarios = await Funcionario.find({'tipo_funcionario': "Docente", 'departamentos.campus': req.params.campus})
  for (let index = 0; index < foundFuncionarios.length; index++) {
    //console.log(placasFuncionario.placas_asociadas[index].codigo_placa);  
    for (let index2 = 0; index2 < foundFuncionarios[index].horario.length; index2++) {
      //console.log(placasFuncionario.placas_asociadas[index].codigo_placa);  
      horarios.push(foundFuncionarios[index].horario[index2])
    }
  }
  res.send(horarios)
}


consultaFuncionarioController.getHorariosAmbos = async (req, res) => {
  horarios = []
  
  const foundFuncionarios = await Funcionario.find({'departamentos.campus': req.params.campus})
  for (let index = 0; index < foundFuncionarios.length; index++) {
    //console.log(placasFuncionario.placas_asociadas[index].codigo_placa);  
    for (let index2 = 0; index2 < foundFuncionarios[index].horario.length; index2++) {
      //console.log(placasFuncionario.placas_asociadas[index].codigo_placa);  
      horarios.push(foundFuncionarios[index].horario[index2])
    }
  }
  res.send(horarios)
}

module.exports = consultaFuncionarioController;
