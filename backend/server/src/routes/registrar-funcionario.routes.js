//* Enrutador de la página principal *//

const { Router } = require("express");
const router = Router();

//* Controlador de home, tiene el comportamiento de PUT, GET, DELETE, POST *//
const funcionarioController = require("../controllers/registrar-funcionario.controller");
const token = require("../controllers/token");

router.post("/", token.verifyToken, funcionarioController.registrarFuncionario);

module.exports = router;