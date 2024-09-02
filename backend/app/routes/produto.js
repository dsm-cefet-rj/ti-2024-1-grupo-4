var express = require('express');
var router = express.Router();

const {produto} = require('../models/produto');
const cors = require('./cors');
var authenticate = require('../authenticate');

/**
 * @module routes/produto
 */
router.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
/**
 * @function
 * @description Função de seleção de todos os produtos na loja
 */
.get(function (req, res, next) {
    produto.find({})
      .then(
        (produtosBanco) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(produtosBanco);
        })
        .catch(
          (err) => next(err)
        );
})
/**
 * @function
 * @description Função de criação de um produto
 */
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
      produto.findOne({nome: req.body.nome})
      .then( (existingProduto) => {
        if(existingProduto) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.json({ err: 'Produto já existe' });
        } else {
          const novoProduto = produto.create(req.body);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(req.body);
        }
      }).catch((err) => next(err));
})

router.route('/:id')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
/**
 * @function
 * @description Função de remoção de um produto por id
 */
.delete(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
    console.log(req);
    produto.findByIdAndDelete(req.params.id)
      .then((produtoDeletado) => {
        if(produtoDeletado) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(req.body);
        } else {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: 'Produto não foi deletado, porque não foi encontrado'});
        }
      })
      .catch((err) => next(err));
  
})
/**
 * @function
 * @description Função de atualização de um produto por id e suas atualizações
 */
.put(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => { 
    produto.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })
    .then( (produtoAtualizado) => {
      if(produtoAtualizado) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.body);
      } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: 'Produto não foi atualizado, porque não foi encontrado'});
      }
    }).catch((err) => next(err));
})
 

module.exports = router;

/**
 * ° criar as exceptions dentro do backend
 * 
 * 
 */