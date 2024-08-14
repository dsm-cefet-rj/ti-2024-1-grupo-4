var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var {user} = require('./models/users');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // de fato a token, usado para criar,assinar e verificar tokens

var config = require('./config');

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser()); 


exports.getToken = function(User) {
    return jwt.sign(User, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log("JWT payload: ", jwt_payload);
    try {
        const userFound = await user.findOne({ _id: jwt_payload._id });
        if (userFound) {
            return done(null, userFound);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));


exports.verifyUser = passport.authenticate('jwt', {session: false}); 