// * Controlador de '/home' *//

const loginController = {};

const Funcionario = require("../models/Usuario_Funcionario");
const jwt = require('jsonwebtoken');


loginController.exists = async (req, res) => {
    var exists = 0;
    const funcionarioEncontrado = await Funcionario.findOne({correo_institucional: req.params.correo_institucional})
    
    res.send(!(funcionarioEncontrado===null));
};

loginController.retrieveCredentials = async (req, res) => {

    const funcionarioEncontrado = await Funcionario.findOne({correo_institucional: req.params.correo_institucional})
    if (!funcionarioEncontrado) return res.status(401).send("El correo ingresado no existe");

    console.log("Contraseña ingresada: %s, real: %s", req.params.contrasenna, funcionarioEncontrado.contrasenna)
    if (funcionarioEncontrado.contrasenna !== req.params.contrasenna) 
        return res.status(401).send("La contraseña ingresada es incorrecta");

    const token = jwt.sign({identificacion: funcionarioEncontrado.identificacion}, 'secretkey');

    res.status(200).json({token, identificacion: funcionarioEncontrado.identificacion, admin: funcionarioEncontrado.admin, jefatura:funcionarioEncontrado.jefatura, nombre_completo: funcionarioEncontrado.nombre_completo});
};

module.exports = loginController;
