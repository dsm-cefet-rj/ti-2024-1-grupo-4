var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var {user, UserSchema} = require('./models/users');
var StrategyJwt = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // de fato a token, usado para criar,assinar e verificar tokens

var config = require('./config');

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

exports.getToken = function (user){
    return jwt.sign(user,config.secretKey,
        {expiresIn:3600}
    );
};

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new StrategyJwt(opts,
    (jwtPayload, done) => {
        console.log("JWT Payload: ", jwtPayload);
        user.findOne({ _id: jwtPayload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));
exports.verifyUser = passport.authenticate('jwt', {session: false});