var express = require('express');
var router = express.Router();

//produto proxy

const produto = [
    {
      "id": "1",
      "nome": "Marmelada de banana Novo",
      "imgUrl": "/img/pizza1.png",
      "preco": "16.9",
      "descricao": "Feita com banana e muita marmelada Novo"
    },
    {
      "id": "2",
      "nome": "Bananada de Goiaba",
      "imgUrl": "/img/pizza2.png",
      "preco": 17.9,
      "descricao": "Feita com banana e goiaba"
    },
    {
      "id": "3",
      "nome": "Goiabada de marmelo",
      "imgUrl": "/img/pizza3.png",
      "preco": 11.9,
      "descricao": "Feita com goiaba e muita marmelada"
    },
    {
      "id": "4",
      "nome": "Sitio do pica-pau amarelo",
      "imgUrl": "/img/pizza4.png",
      "preco": 1.9,
      "descricao": "Feita com Lorem Ipsum"
    },
    {
      "id": "5",
      "nome": "Goiabada de marmelo",
      "imgUrl": "/img/pizza5.png",
      "preco": 11.9,
      "descricao": "Feita com goiaba e muita marmelada"
    },
    {
      "id": "6",
      "nome": "Goiabada de marmelo",
      "imgUrl": "/img/pizza6.png",
      "preco": 11.9,
      "descricao": "Feita com goiaba e muita marmelada"
    },
    {
      "id": "7",
      "nome": "Goiabada de marmelo",
      "imgUrl": "/img/fotopizza.jpg",
      "preco": 11.9,
      "descricao": "Feita com goiaba e muita marmelada"
    },
    {
      "id": "2370",
      "nome": "PRODUTO_TESTE->atualizado!!!!",
      "imgUrl": "/img/food.jpg",
      "preco": "3.1415",
      "descricao": "Produto_teste - > Atualização!!!"
    }
  ]

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(produto);
});

module.exports = router;