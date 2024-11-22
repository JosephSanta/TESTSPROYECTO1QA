//* Enrutador de la página de login *//

const { Router } = require("express");
const router = Router();

//* Controlador de login, tiene el comportamiento de PUT, GET, DELETE, POST *//
const loginController = require("../controllers/login.controller");


//* Esta api recupera la contraseña, si es admin, si es jefe de algun usuario existente, mandenle el correo insitucional que ingresa la persona
router.get("/retrieve-credentials/:correo_institucional/:contrasenna", loginController.retrieveCredentials);
//* Retorna si el usuario existe
router.get("/retrieve-credentials/:correo_institucional/exists", loginController.exists);


module.exports = router;
