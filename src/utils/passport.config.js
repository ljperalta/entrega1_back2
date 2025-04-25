require("dotenv").config();
const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const User = require('../managers/login.js');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyToken = async (jwtPayload, done) => {
  if(!jwtPayload) return done(null, false);
  return done(null, jwtPayload);
}

passport.use('jwt', new Strategy(opts, verifyToken));

module.exports = passport;