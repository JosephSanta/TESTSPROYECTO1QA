// * Controlador de '/home' *//

const Parqueo = require("../models/Parqueo");
const parqueoAController = {};

parqueoAController.registrarParqueo = async (req, res) => {
    const parqueoEncontrado = await Parqueo.findOne({_id_parqueo: req.body._id_parqueo});
    if (parqueoEncontrado) return res.status(401).send("El id del parqueo ya existe");

    const newParqueo = new Parqueo(req.body)

    await newParqueo.save()

    res.send("Registered")
};


module.exports = parqueoAController;
