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
router.route('/')
  .get(function (req, res, next) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(produto);
  })
  .post(
    (req, res, next) => {
      produto.push(req.body);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      //no slice nao tem o return explicito, entao ele retorna pelo httpPost, que é o proprio body
      res.json(req.body);
    }
  )
router.route('/:id')
  .delete((req, res, next) => {
    produto = produto.filter(
      (value, index, arr) => {
        return value.id != req.params.id;
      }
    );

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.params.id);
  }
  )
  .put((req, res, next) => {
    // .map(produto=>produto.id) = arrow function de um objeto produto de produto(o array e produtos),
    // onde retorna para o map o id desse objeto, lendo-se:
    //dentro de um array de ids de produtos, há um produto igual ao id do parametro da requisition -> poem em index

    let index = produto.map(produto => produto.id).indexOf(req.params.id);
    //slice = Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
    /**
     *     splice(start: number, deleteCount?: number): T[];
    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     * @param items Elements to insert into the array in place of the deleted elements.
     * @returns An array containing the elements that were deleted.
     */
    produto.splice(index,1,req.body);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    //retorna body segundo o splice e produto
    res.json(req.body);
  }
  )

module.exports = router;

/**
 * ° criar as exceptions dentro do backend
 * 
 * 
 */