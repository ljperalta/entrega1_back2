const mongoose = require("mongoose") 

mongoose.connect("mongodb+srv://leoperaltalp24:CpaD4lmKeF6WddJr@cluster0.4usbq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB Atlas conectado"))
  .catch((err) => console.error("Error de conexión:", err));

module.exports = mongoose