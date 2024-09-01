var express = require('express');
var router = express.Router();

const cors = require('./cors');
var authenticate = require('../authenticate');
// dado proxy

const { pedido } = require('../models/pedido');
const {user} = require('../models/users');

/**
 * @module routes/pedido
 */
router.route('/:id')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
/**
 * @function
 * @description Função de remoção de pedido (por id)
 */
.delete(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
  pedido.findByIdAndDelete(req.params.id)
    .then((pedidoDeletado) => {
      if(pedidoDeletado) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.body);
      } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: "Pedido não foi deletado, porque não foi encontrado"});
      }
    })
    .catch(
      (err) => next(err)
    );
})
/**
 * @function
 * @description Função de atualização de pedido por id e suas atualizações 
 */
.put(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => { 
  pedido.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((pedidoAlterado) => {
      if(pedidoAlterado) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.body);
      } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: "Pedido não foi atualizado, porque não foi encontrado"});
      }
      
    })
    .catch(
      (err) => next(err)
    );
    
})

router.route('/:userKey').options(cors.corsWithOptions, (req, res) => {res.sendStatus(200) ;})
/**
 * @function
 * @description Função de seleção de pedidos por id de usuário
 */
.get(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
  console.log(req.params)
  pedido.find({ 'user.userKey' : req.params.userKey})
    .then((pedidosBanco) => {
      if(pedidosBanco) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pedidosBanco);
      } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: "Pedido não foi encontrado para este usuário"});
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
 * @description Função de seleção de todos os pedidos
 */
.get(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
    console.log(req.params)
    pedido.find({})
      .then((pedidosBanco) => {
        if(pedidosBanco) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(pedidosBanco);
        } else {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: "Pedido não foi encontrado para este usuário"});
        }
      })
      .catch(
        (err) => next(err)
      );

  })
/**
 * @function
 * @description Função de criação de um pedido 
*/
.post(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => { 
      pedido.create(req.body)
      .then( (pedidoCriado) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log(pedidoCriado)
        res.json({id: pedidoCriado._id});
      }).catch(
        (err) => next(err)
      );
    }
  )

module.exports = router;
