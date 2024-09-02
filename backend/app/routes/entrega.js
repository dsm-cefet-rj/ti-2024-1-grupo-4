var express = require('express');
var router = express.Router();

const cors = require('./cors');
var authenticate = require('../authenticate');


const { entrega } = require('../models/entrega');
/**
 * @module routes/entrega
 */

router.route('/:id')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
/**
 * @function
 * @description Função de remoção de entrega por Id
 */
.delete(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
  entrega.findByIdAndDelete(req.params.id)
    .then((pedidoDeletado) => {
      if(pedidoDeletado) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.body);
      } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: "Entrega não foi deletado, porque não foi encontrado"});
      }
    })
    .catch(
      (err) => next(err)
    );
})
/**
 * @function
 * @description Função de atualização de uma entrega por id e suas atualizações
 */
.put(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => { 
  console.log(req.body)
  entrega.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((pedidoAlterado) => {
      console.log(pedidoAlterado)
      if(pedidoAlterado) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.body);
      } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: "Entrega não foi atualizado, porque não foi encontrado"});
      }
      
    })
    .catch(
      (err) => next(err)
    );
    
})

router.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
/**
 * @function
 * @description Função de seleção de todas as entregas por usuário (e seu id)
 */
.get(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
    entrega.find({'user.id': req.params.id})
      .then((pedidosBanco) => {
        if(pedidosBanco) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(pedidosBanco);
        } else {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: "Entrega não foi encontrado para este usuário"});
        }
      })
      .catch(
        (err) => next(err)
      );

  })
/**
 * @function
 * @description Função de criação de uma entrega
 */
.post(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => { 
      entrega.create(req.body)
      .then( (pedidoCriado) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.body);
      }).catch(
        (err) => next(err)
      );
    }
  )

router.route('/:pedido')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
/**
 * @function
 * @description Função de seleção de entregas por pedido (todas as informações do pedido devem ser iguais)
 */
.get(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
    entrega.find({'pedido': req.params.pedido})
      .then((pedidosBanco) => {
        if(pedidosBanco) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(pedidosBanco);
        } else {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: "Entrega não foi encontrado para este usuário"});
        }
      })
      .catch(
        (err) => next(err)
      );

  }) 

module.exports = router;