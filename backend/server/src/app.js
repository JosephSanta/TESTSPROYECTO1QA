//* Aquí seteen variables y atributos de app *//
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
//Setear puerto global para la aplicación
app.set("port", 3000);
//Cambiar 3000 por variable de entorno process.env.[varName]
//Decirle a la app que utilice morgan, (muestra gets en pantalla)
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({extended: false }))

//* Aqui van las rutas y cuales enrutadores usan *//
app.use("/log-in", require("./routes/login.routes"));


// Ambito de administradores //

app.use(cors())
app.use("/registrar/funcionario", require("./routes/registrar-funcionario.routes"));
app.use("/registrar/parqueo", require("./routes/registrar-parqueo.routes"));

// Ambito de funcionarios //
//Ruta de la pagina principal (prefijo '/home')
app.use("/registrar-vehiculo", require("./routes/registrar-vehiculo.routes"));
app.use("/consulta-parqueo", require("./routes/consulta-parqueos.routes"));
app.use("/registro-horario", require("./routes/registro-horario.routes"));
app.use("/reservar-espacio", require("./routes/reservar-espacio.routes"));
app.use("/manejo-plantilla", require("./routes/manejo-planilla.routes"));
app.use("/consulta-funcionario", require("./routes/consulta-funcionario.routes"));
app.use("/campus-departamentos", require("./routes/campus-departamentos.routes"));

module.exports = app;
