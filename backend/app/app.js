var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pedidoRouter = require('./routes/pedido');
var produtoRouter = require('./routes/produto');
var enderecoRouter = require('./routes/endereco');
var entregaRouter = require('./routes/entrega');

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/luigipizzeria';

const connect = mongoose.connect(url);

connect.then(
    (db) => {
        console.log("Conectado corretamente ao servidor");
    }, (err) => {
        console.log(err);
    }
);


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name:'session-id',
    secret: 'abc',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}))
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/produto', produtoRouter);

function auth (req,res,next){
    console.log(req.user);
    if(!req.user){
        var err = new Error('Não autenticado');
        err.status = 403;
        next(err);
    }else{
        next();
    }
}

app.use(auth);
app.use('/pedido', pedidoRouter);
//app.use('/endereco', enderecoRouter);
//app.use('/entrega', entregaRouter);

module.exports = app;
