var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pedidoRouter = require('./routes/pedido');
var produtoRouter = require('./routes/produto');
var enderecoRouter = require('./routes/endereco');
var entregaRouter = require('./routes/entrega');


var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pedido', pedidoRouter);
app.use('/produto', produtoRouter);
//app.use('/endereco', enderecoRouter);
//app.use('/entrega', entregaRouter);

module.exports = app;
