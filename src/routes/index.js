const express = require("express");
const router = express.Router();
const {loginn, registrarr, logoutt} = require("../controllers/user.js");

//router.get("/", login);
router.get("/login", loginn);
router.post("/registrar", registrarr);
router.get("/logout", logoutt);

module.exports = router;