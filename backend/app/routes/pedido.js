var express = require('express');
var router = express.Router();

// dado proxy

const pedido = [
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


/* GET users listing. */
router.post('/', function(req, res, next) {
  pedido.push(req.body);

  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.json(req.body);

});

module.exports = router;