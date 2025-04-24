const express = require('express');
const path = require('path');
const routes = require("./routes/index");
const listEndpoints = require('express-list-endpoints');
require('./bd/conexion.js');
const passport = require('./utils/passport.config.js');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/", routes);

//console.log(listEndpoints(routes));

module.exports = app;