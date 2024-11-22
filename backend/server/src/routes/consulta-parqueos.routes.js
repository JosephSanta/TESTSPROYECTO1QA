//* Enrutador de la página principal *//

const { Router } = require("express");
const router = Router();

//* Controlador de home, tiene el comportamiento de PUT, GET, DELETE, POST *//
const consultaParqueosController = require("../controllers/consulta-parqueos.controller");
const token = require("../controllers/token");

router.get("/get-all", token.verifyToken, consultaParqueosController.getAllParqueos);
router.get("/get-all/combo-box", token.verifyToken, consultaParqueosController.getAllParqueosCombo);
router.get("/findByID/:mongo_id", token.verifyToken, consultaParqueosController.getParqueo);
router.get("/get-espacios-from/:mongo_id", token.verifyToken, consultaParqueosController.getEspaciosParqueo);
//A este hay que mandarle el json completo, con todo lo del parqueo cambiado
router.put("/updateByID/:mongo_id", token.verifyToken, consultaParqueosController.updateOneParqueo);
router.delete("/deleteByID/:mongo_id", token.verifyToken, consultaParqueosController.deleteParqueo);

module.exports = router;