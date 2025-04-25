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

passport.serializeUser((user, done) => {
  try {
    done(null, user._id); 
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
//module.exports.passport = passport;