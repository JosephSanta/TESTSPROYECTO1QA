// * Controlador de '/home' *//

const reservarEspacioController = {};

const Reserva = require('../models/Reserva')

reservarEspacioController.submitReservation = async (req, res) => {
    const newReservation = new Reserva(req.body)

    await newReservation.save()

    res.send("Reservation created successfully")
};

reservarEspacioController.getReservas = async (req, res) => {
    const reservation = await Reserva.find()
    res.json(reservation)
};


module.exports = reservarEspacioController;
