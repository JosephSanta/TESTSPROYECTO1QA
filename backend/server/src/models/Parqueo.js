const { Schema, model } = require("mongoose");
const parqueo_schema = new Schema(
  {
    _id_parqueo: String,
    tipo: String,
    capacidad_total: Number,
    capacidad_actual: Number,
    horario: [
      {
        dia: String,
        hora_entrada: String,
        hora_salida: String
      }
    ],
    espacios: [
      {
        _id: String,
        tipo: String,
        ocupado: String
      }
    ],
    campus: String,
    espacios_jefatura: Number,
    espacios_VOficiales: Number,
    espacios_asignados: Number,
    espacios_visitantes: Number,
    espacios_NEspeciales: Number,
    direccion: String,
    id_contrato: String,
    contacto: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("parqueos", parqueo_schema);
