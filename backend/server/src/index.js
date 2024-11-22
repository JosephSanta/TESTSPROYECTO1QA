const app = require("./app")
const db = require("./database")
// Atributo port, seteado en app.js
const port = app.get('port')

app.listen(port);
console.log("Running on port", port)