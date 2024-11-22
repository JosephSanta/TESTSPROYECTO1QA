const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.byxgi.mongodb.net/reservas_parqueos_tec?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then((db) => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to the database"));
