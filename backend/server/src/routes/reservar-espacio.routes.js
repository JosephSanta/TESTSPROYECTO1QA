//* Enrutador de la página principal *//

const { Router } = require("express");
const router = Router();

//* Controlador de home, tiene el comportamiento de PUT, GET, DELETE, POST *//
const reservarEspacioController = require("../controllers/reservar-espacio.controller");
const token = require("../controllers/token");

router.post("/", token.verifyToken, reservarEspacioController.submitReservation);
router.get("/get-all", token.verifyToken, reservarEspacioController.getReservas);

module.exports = router;