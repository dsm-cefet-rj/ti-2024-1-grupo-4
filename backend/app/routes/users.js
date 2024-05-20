var express = require('express');
var router = express.Router();

const user = 
  [
    
      {
        "id": "1",
        "nome": "emanu",
        "email": "emanu@nunu",
        "senha": "nununu",
        "admin": true
      },
    
      {
        "id": "2",
        "nome": "shasha",
        "email": "shasha@shasha",
        "senha": "shasha",
        "admin": true
      },
  ]


/* GET users listing. */
///users?email=${email}&senha=${senha}
router.route('/')
  .get(
    //criar um if aqui para o emailExistServer
    function (req, res, next) {
      const { email, senha } = req.query;

      const temp =  user.find(
        (u) => u.email === email 
      )

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(temp);
    }
  )
  .post(
    (req, res, next) => {
      user.push(req.body);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      //no slice nao tem o return explicito, entao ele retorna pelo httpPost, que é o proprio body
      res.json(req.body);
    }
  )
  
router.route('/:id')
  .delete((req, res, next) => {
    user = user.filter(
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

    let index = user.map(user => user.id).indexOf(req.params.id);
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
    produto.splice(index, 1, req.body);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    //retorna body segundo o splice e produto
    res.json(req.body);
  }
  )


module.exports = router;
