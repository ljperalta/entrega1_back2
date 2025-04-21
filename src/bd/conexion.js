require("dotenv").config();
const mongoose = require("mongoose") 

mongoose.connect(process.env.URI)
  .then(() => console.log("MongoDB Atlas conectado"))
  .catch((err) => console.error("Error de conexión:", err));

module.exports = mongoose