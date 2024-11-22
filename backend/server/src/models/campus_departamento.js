const { Schema, model } = require("mongoose");
const campus_departamento_schema = new Schema(
  {
    nombre_campus: String,
    departamento: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("campus_departamento", campus_departamento_schema);
