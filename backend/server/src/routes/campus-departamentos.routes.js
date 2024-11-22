//* Enrutador de la página principal *//

const { Router } = require("express");
const router = Router();

//* Controlador de home, tiene el comportamiento de PUT, GET, DELETE, POST *//
const campus_dep = require("../controllers/campus-departamentos.controller");
const token = require("../controllers/token");

//Para hacerle este put, deben mandarle un JSON de la forma {"codigo_placa": []}
router.post("/add", token.verifyToken, campus_dep.addDep);

router.get("/getAll", token.verifyToken, campus_dep.getAllCampusDepartamentos);
router.get("/getByCampus/:nombre_campus", token.verifyToken, campus_dep.getByCampus);

module.exports = router;