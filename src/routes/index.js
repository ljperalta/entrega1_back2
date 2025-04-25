const express = require("express");
const router = express.Router();
const {loginn, registrarr} = require("../controllers/user.js");
const passport = require("passport");

router.get("/login", loginn);
router.post("/registrar", registrarr);
router.get("/api/sessions", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send({ status: "success", payload: req.user });
});

module.exports = router;