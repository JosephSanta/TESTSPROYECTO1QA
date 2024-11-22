const { Schema, model } = require("mongoose");
const reserva_schema = new Schema(
  {
    _id_reserva: String,
    id_persona: String,
    parqueo: String,
    placa: String,
    hora_entrada: String,
    hora_salida: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("reservas", reserva_schema);
