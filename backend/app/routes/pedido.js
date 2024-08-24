var express = require('express');
var router = express.Router();

const cors = require('./cors');
var authenticate = require('../authenticate');
// dado proxy

const { pedido } = require('../models/pedido');
const {user} = require('../models/users');

/* GET users listing. */
router.route('/:id')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
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

router.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
    pedido.find({'user.id': req.params.id})
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
