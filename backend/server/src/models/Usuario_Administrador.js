const { Schema, model } = require("mongoose");

const usuario_administrador_schema = new Schema(
  {
    _id: ObjectId,
    identificacion: String,
    nombre_completo: String,
    contrasenna: String,
    celular: String,
    horario: [
      {
        dia: String,
        hora_entrada: String,
        hora_salida: String,
      },
    ],
    correo_institucional: String,
    correo_alterno: String,
    departamentos: [
      {
        _id: ObjectId,
        campus: ObjectId,
        departamento: ObjectId,
      },
    ],
    tipo_funcionario: String,
    placas_asociadas: String[{ codido_placa: String }],
    jefatura: int,
    incapacitado: int,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("UsuarioAdministrador", usuario_administrador_schema);
