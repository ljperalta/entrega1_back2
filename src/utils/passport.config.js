const passport = require('passport');
const jwt = require('passport-jwt');

const JWTstrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const User = require('../models/user.js');  

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JWTstrategy(opts, async (jwt_payload, done) => {
  try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
        return done(null, user);
        } else {
        return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});


module.exports = passport;
//module.exports.passport = passport;