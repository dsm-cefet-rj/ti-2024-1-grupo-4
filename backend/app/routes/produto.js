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
    produto.findByIdAndRemove(req.params.id)
      .then(
        (result) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(result);
        },(err) => next(err)
      ).catch(
        (err) => next(err)
      );
  }
  )
  .put((req, res, next) => { 


    //se a alteração nao for no objeto inteiro, atomica, tem que por na forma de set: All top level update keys which are not atomic operation names are treated as set operations:
    //[options.new=false] «Boolean» if true, return the modified document rather than the original
    
    produto.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then(
        (produto_alterado) => {
          console.log("console dentro do put de produto no backend");
          console.log(req);
          console.log(req.body);
        
            if (!produto_alterado) {
              res.status(404).json({ error: 'Produto não encontrado' });
            } else {
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(produto_alterado);
              //res.status(200).json(produto_alterado);
            }
          
        },
        (err) => next(err)
      )
      .catch(
        (err) => next(err)
      );
      
  }
  )
 

module.exports = router;

/**
 * ° criar as exceptions dentro do backend
 * 
 * 
 */