const { Schema, model } = require("mongoose");

const usuario_funcionario_schema = new Schema(
  {
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
    correo_personal: String,
    departamentos: [
      {
        campus: String,
        departamento: String,
      },
    ],
    tipo_funcionario: String,
    placas_asociadas: [{ codigo_placa: String }],
    admin: Number,
    jefatura: Number,
    campus_departamento_jefatura: { campus: String, departamento: String },
    incapacitado: Number
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("funcionarios", usuario_funcionario_schema);
