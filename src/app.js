const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const routes = require("./routes/index");
const listEndpoints = require('express-list-endpoints');
require('./bd/conexion.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine({
      extname: '.handlebars',
      defaultLayout: 'main',
      partialsDir: path.join(__dirname, 'views', 'partials'),
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, "public")));


app.use("/", routes);

console.log(listEndpoints(routes));

module.exports = app;