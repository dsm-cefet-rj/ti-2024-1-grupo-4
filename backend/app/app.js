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

var config = require('./config');

const mongoose = require('mongoose');

const url = config.mongoUrl;

async function run() {
    mongoose.connect(url)
        .then(
            () => console.log("Conectado corretamente ao servidor")
        )
        .catch(
            (error) => console.log(error)
        );
}
run().catch(console.dir);

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/produto', produtoRouter);
app.use('/endereco', enderecoRouter);


app.use('/pedido', pedidoRouter);
app.use('/entrega', entregaRouter);

module.exports = app;
