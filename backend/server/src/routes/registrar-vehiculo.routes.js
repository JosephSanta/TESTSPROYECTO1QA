//* Enrutador de la página principal *//

const { Router } = require("express");
const router = Router();

//* Controlador de home, tiene el comportamiento de PUT, GET, DELETE, POST *//
const registrarVehiculoController = require("../controllers/registrar-vehiculo.controller");
const token = require("../controllers/token");

//Para hacerle este put, deben mandarle un JSON de la forma {"codigo_placa": []}
router.put("/add-vehiculo/:cedula_funcionario", token.verifyToken, registrarVehiculoController.asociarPlaca);
router.get("/get-vehiculos/:cedula_funcionario", token.verifyToken, registrarVehiculoController.getVehiculos);
router.put("/update-vehiculos", token.verifyToken, registrarVehiculoController.updateVehiculo);

module.exports = router;