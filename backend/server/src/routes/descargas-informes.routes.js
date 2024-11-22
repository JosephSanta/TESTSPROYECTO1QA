//* Enrutador de la página principal *//

const { Router } = require("express");
const router = Router();

//* Controlador de home, tiene el comportamiento de PUT, GET, DELETE, POST *//
const descargaInformesController = require("../controllers/descargas-informes.controller");
const { verifyToken } = require("../controllers/token");
const token = require("../controllers/token");

router.get("/get-by/:campus/:departamento", token.verifyToken, descargaInformesController.getByCampusDepartamento);
router.get("/get-by/:campus", token.verifyToken, descargaInformesController.getByCampus);


module.exports = router;