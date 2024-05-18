var express = require('express');
var router = express.Router();

const produto = require('../models/produto');


router.route('/')
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