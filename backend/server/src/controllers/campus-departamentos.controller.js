const campusDepartamentoController = {};
const CampusDep = require("../models/campus_departamento");

// A este deben mandarle un JSON de la forma "{"codigo_placa": [Num PLaca]}"
campusDepartamentoController.addDep = async (req, res) => {
  console.log(req.body)
    const newCampusDep = new CampusDep(req.body)

    await newCampusDep.save()

    res.send("POST successful")
  
};

campusDepartamentoController.getAllCampusDepartamentos = async (req, res) => {
  const foundCampusDepartamentos = await CampusDep.find()
  res.send(foundCampusDepartamentos)

};

campusDepartamentoController.getByCampus = async (req, res) => {
  const foundCampusDepartamentos = await CampusDep.find({'nombre_campus': req.params.nombre_campus})
  res.send(foundCampusDepartamentos)

};

module.exports = campusDepartamentoController;