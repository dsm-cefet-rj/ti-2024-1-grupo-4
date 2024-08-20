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
    pedido.find({'pedido.user.id': req.params.id})
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
      .then(
        (pedido) => {
          if(!pedido){
            res.status(404).json({ error: 'Pedido não encontrado' });
          }else{
            res.status(200).json(pedido);
          }
        },(err) => next(err)
      ).catch(
        (err) => next(err)
      );
    }
  )

module.exports = router;
/*
[
  {
    "id": "e451",
    "user": {
      "id": "2",
      "email": "jean@jeje",
      "senha": "jeje",
      "nome": "jean",
      "admin": false
    },
    "endereco": {
      "instrucao_pedido": "",
      "bairro": "Olaria",
      "CompEnd": "perto de lugar nenhum",
      "numEnd": 321,
      "logradouro": "Rua qualquer",
      "cep": 123
    },
    "products": [
      {
        "id": "3",
        "nome": "Goiabada de marmelo",
        "imgUrl": "/img/food.jpg",
        "preco": 11.9,
        "descricao": "Feita com goiaba e muita marmelada",
        "quantity": 1
      },
      {
        "id": "2",
        "nome": "Bananada de Goiaba",
        "imgUrl": "/img/food.jpg",
        "preco": 17.9,
        "descricao": "Feita com banana e goiaba",
        "quantity": 1
      }
    ],
    "pagamento": {
      "T_pagamento": "pix",
      "num_cartao": "",
      "nome_cartao": "",
      "datacartao": "",
      "codcartao": "",
      "nomePagamento": "hernani",
      "cpfPagamento": "12345678910"
    },
    "valorTotal": 29.799999999999997,
    "status": "Avaliando pedido"
  }
]
*/
