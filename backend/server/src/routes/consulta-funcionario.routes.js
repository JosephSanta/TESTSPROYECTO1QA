//* Enrutador de la página principal *//

const { Router } = require("express");
const router = Router();

//* Controlador de consultar funcionario, tiene el comportamiento de PUT, GET, DELETE, POST *//
const consultaFuncionarioController = require("../controllers/consulta-funcionario.controller");
const token = require("../controllers/token");

router.get("/", consultaFuncionarioController.display);
router.get("/findByID/:cedula_funcionario", token.verifyToken, consultaFuncionarioController.getFuncionario);
router.get("/get-all", token.verifyToken, consultaFuncionarioController.getAllFuncionarios);
router.get("/findByCorreo/:correo_institucional", token.verifyToken, consultaFuncionarioController.getFuncionarioByCorreoInstitucional);

//A este hay que mandarle el json completo, con todo lo del funcionario cambiado
router.put("/updateByID/:cedula_funcionario", token.verifyToken, consultaFuncionarioController.updateOneFuncionario);

router.get("/get-by/:campus/:departamento", token.verifyToken, consultaFuncionarioController.getByCampusDepartamento);
router.get("/get-by/:campus", token.verifyToken, consultaFuncionarioController.getByCampus);

router.post("/updateEmail/:cedula_funcionario", token.verifyToken, consultaFuncionarioController.editarCorreoPersonal);
router.delete("/deleteByID/:cedula_funcionario", token.verifyToken, consultaFuncionarioController.borrarFuncionario);

router.get("/get-horariosAdm/:campus", token.verifyToken, consultaFuncionarioController.getHorariosAdm);
router.get("/get-horariosDoc/:campus", token.verifyToken, consultaFuncionarioController.getHorariosDoc);
router.get("/get-horariosAmb/:campus", token.verifyToken, consultaFuncionarioController.getHorariosAmbos);

module.exports = router;
