//* Enrutador de la página principal *//

const { Router } = require("express");
const router = Router();

//* Controlador de home, tiene el comportamiento de PUT, GET, DELETE, POST *//

// Aqui debe mandarse todo el JSON completo del parqueo
const registrarParqueoController = require("../controllers/registrar-parqueo.controller");
const token = require("../controllers/token");

router.post("/", token.verifyToken, registrarParqueoController.registrarParqueo);


module.exports = router;