var express = require('express');
var router = express.Router();

const {produto} = require('../models/produto');
const cors = require('./cors');
var authenticate = require('../authenticate');


router.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(function (req, res, next) {
    produto.find({})
      .then(
        (produtosBanco) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(produtosBanco);
        },(err) => next(err))
        .catch(
          (err) => next(err)
        );
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
      produto.findOne({nome: req.body.nome}).then( existingProduto => {
        if(existingProduto) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.json({ err: 'Produto já existe' });
        } else {
          const novoProduto = produto.create(req.body);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true, message: 'Produto Criado'});
        }
      }).catch((err) => next(err));
})

router.route('/:id')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.delete(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
    produto.findByIdAndDelete(req.params.id)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, message: 'Produto Deletado', response });
      })
      .catch((err) => next(err));
  
})
.put(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => { 
    produto.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })
    .then( (response) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, message: 'Produto Atualizado', response });
    }).catch((err) => next(err));
})
 

module.exports = router;

/**
 * ° criar as exceptions dentro do backend
 * 
 * 
 */