// * Controlador de '/registrar-vehiculo' *//

const registrarVehiculoController = {};
const Funcionario = require("../models/Usuario_Funcionario");

// A este deben mandarle un JSON de la forma "{"codigo_placa": [Num PLaca]}"
registrarVehiculoController.asociarPlaca = async (req, res) => {
  const funcionarioEncontrado = await Funcionario.findOne({
    identificacion: req.params.cedula_funcionario,
  });
  const placasFuncionario = funcionarioEncontrado;

  var exists = 0;

  for (let index = 0; index < placasFuncionario.placas_asociadas.length; index++) {
    //console.log(placasFuncionario.placas_asociadas[index].codigo_placa);  
    if (placasFuncionario.placas_asociadas[index].codigo_placa==req.body.codigo_placa) {
        exists = 1
        console.log("Exists")
    }
  }

  placasFuncionario.placas_asociadas.push(req.body);


  //console.log(placasFuncionario);
  if (!exists) {
    await funcionarioEncontrado.save();
    console.log("Does not exist")
    
  }
  res.send("Placa añadida");
  
};

registrarVehiculoController.getVehiculos = async (req, res) => {
  const funcionarioEncontrado = await Funcionario.findOne({
    identificacion: req.id,
  });

  res.send(funcionarioEncontrado.placas_asociadas);
  
};

registrarVehiculoController.updateVehiculo = async (req, res) => {
  const funcionarioEncontrado = await Funcionario.findOne({
    identificacion: req.id,
  });
  funcionarioEncontrado.placas_asociadas = req.body;
  funcionarioEncontrado.overwrite(funcionarioEncontrado);
  await funcionarioEncontrado.save();
  res.send("Updated");
};

registrarVehiculoController.read = (req, res) => res.send("Displaying page");

module.exports = registrarVehiculoController;