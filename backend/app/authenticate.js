var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var {user} = require('./models/users');

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());