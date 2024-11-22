//* Enrutador de la página principal *//

const { Router } = require("express");
const router = Router();


//* Controlador de home, tiene el comportamiento de PUT, GET, DELETE, POST *//
const registroHorarioController = require("../controllers/registro-horario.controller");
const token = require("../controllers/token");

//Para hacerle update, mandenle un JSON de esta forma '{"dia":[], "hora_entrada" : [], "hora_salida" : []}'
router.put("/add-horario/:cedula_funcionario", token.verifyToken, registroHorarioController.asociarHorario);
router.get("/get-horarios/:cedula_funcionario", token.verifyToken, registroHorarioController.getHorarios);
router.put("/update-horarios", token.verifyToken, registroHorarioController.updateHorarios);

module.exports = router;