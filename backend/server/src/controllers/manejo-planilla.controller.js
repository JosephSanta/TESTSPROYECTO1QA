// * Controlador de '/home' *//

const manejoPlantillaController = {};
const Funcionario = require("../models/Usuario_Funcionario");

// Agregar
manejoPlantillaController.addOneFuncionario = async (req, res) => {
    const funcionarioEncontrado = await Funcionario.findOne({identificacion: req.params.cedula_funcionario})
    funcionarioEncontrado.departamentos.push(req.body);
    await funcionarioEncontrado.save();
    res.send("Added");
};

// Quitar
manejoPlantillaController.deleteOneFuncionario = async (req, res) => {
    const func = await Funcionario.findOneAndUpdate({ identificacion: req.params.cedula_funcionario }, { $pull: {departamentos: req.body } });
    res.send("Deleted");
}

manejoPlantillaController.getElegibles = async (req, res) => {
    const jefatura = await Funcionario.findOne({
        identificacion: req.id,
    });
    
    const elegibles = await Funcionario.find({ $and: [{departamentos: {$not: { $elemMatch : jefatura.campus_departamento_jefatura }}},
        { identificacion: {$ne : req.id} }] } );
    
    res.send(elegibles);
}

manejoPlantillaController.getEliminables = async (req, res) => {
    const jefatura = await Funcionario.findOne({
        identificacion: req.id,
    });
    
    const eliminables = await Funcionario.find({ $and: [{departamentos: { $elemMatch : jefatura.campus_departamento_jefatura }},
        { identificacion: {$ne : req.id} }] } );
    
    res.send(eliminables);
}

manejoPlantillaController.addToPlanilla = async (req, res) => {
    const jefatura = await Funcionario.findOne({
        identificacion: req.id,
    });
    console.log(jefatura);
    const funcionarioEncontrado = await Funcionario.findOne({
        identificacion : req.body.identificacion,
    });
    console.log("jefatura", jefatura);
    const temp = {campus: jefatura.campus_departamento_jefatura.campus,
        departamento: jefatura.campus_departamento_jefatura.departamento};
    funcionarioEncontrado.departamentos.push(temp);
    funcionarioEncontrado.overwrite(funcionarioEncontrado);
    await funcionarioEncontrado.save();
    res.send("Updated");
  };

  manejoPlantillaController.deleteFromPlanilla = async (req, res) => {
    const jefatura = await Funcionario.findOne({
        identificacion: req.id,
    });
    Funcionario.findOneAndUpdate({identificacion: req.body.identificacion}, 
        {$pull: {departamentos: {campus: jefatura.campus_departamento_jefatura.campus 
            , departamento: jefatura.campus_departamento_jefatura.departamento}}}).exec();
    res.send("Deleted");
  };

module.exports = manejoPlantillaController;
