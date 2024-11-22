//* Enrutador de la página principal *//

const { Router } = require("express");
const router = Router();

//* Controlador de home, tiene el comportamiento de PUT, GET, DELETE, POST *//
const manejoPlantillaController = require("../controllers/manejo-planilla.controller");
const token = require("../controllers/token");

router.get("/get-eliminables", token.verifyToken, manejoPlantillaController.getEliminables);
router.get("/get-elegibles", token.verifyToken, manejoPlantillaController.getElegibles);
router.post("/add/:cedula_funcionario", token.verifyToken, manejoPlantillaController.addOneFuncionario);
router.post("/delete/:cedula_funcionario", token.verifyToken, manejoPlantillaController.deleteOneFuncionario);
router.put("/addToPlanilla", token.verifyToken, manejoPlantillaController.addToPlanilla);
router.put("/deleteFromPlanilla", token.verifyToken, manejoPlantillaController.deleteFromPlanilla);

module.exports = router;