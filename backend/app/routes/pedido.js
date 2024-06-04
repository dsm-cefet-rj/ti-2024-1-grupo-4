var express = require('express');
var router = express.Router();

// dado proxy

const { pedido } = require('../models/pedido');

/* GET users listing. */
router.route('/:id')
.delete((req, res, next) => {
  pedido.findByIdAndDelete(req.params.id)
    .then(
      (result) => {
        res.status(200).json(result);
      },(err) => next(err)
    ).catch(
      (err) => next(err)
    );
}
)
.put((req, res, next) => { 
  pedido.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(
      (pedido_alterado) => {
          if (!pedido_alterado) {
            res.status(404).json({ error: 'pedido não encontrado' });
          } else {
            res.status(200).json(pedido_alterado);
          }
        
      },
      (err) => next(err)
    )
    .catch(
      (err) => next(err)
    );
    
}
)

router.route('/')
  .get(function (req, res, next) {
    pedido.find({})
      .then(
        (pedidosBanco) => {
          res.status(200).json(pedidosBanco);
        }, (err) => next(err))
      .catch(
        (err) => next(err)
      );

  })
  .post(
    (req, res, next) => {
      req.body.id = 0;
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
router.route('/pedido/')
  .get(function (req, res, next) {
    const { id, admin } = req.query;
    if (id) {
      pedido.find({ 'user.id': id })
        .then(
          (pedidosBanco) => {
            res.status(200).json(pedidosBanco);
          }, (err) => next(err))
        .catch(
          (err) => next(err)
        );
    } else {
      res.status(404).json({ error: 'Erro. ID indefinido' });
    }
  })

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
