const express = require('express');
const {endereco} = require('../models/endereco');
var authenticate = require('../authenticate');
const router = express.Router();
const cors = require('./cors');

/**
 * @function
 * @description Função de cadastro do endereço de um usuário
 */
router.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.post(cors.corsWithOptions,authenticate.verifyUser, async (req, res, next) => {
    try {
        const novoEndereco = await endereco.create(req.body);
        res.status(201).json(novoEndereco);
    } catch (err) {
        next(err);
    }
});

/**
 * @function
 * @description Função de deleção de todos os endereços associados a um usuário
 */
router.post('/delete-enderecos', cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
    try {
      const userKey = req.user._id;
      console.log(userKey)
      const result = await endereco.deleteMany({ userKey: userKey });
      if (result.deletedCount > 0) {
        res.status(200).json({result, msg: 'Todos os endereços foram deletados'});
      } else {
        res.status(404).json({msg: 'Erro ao deletar endereços'});
      }
    } catch (error) {
      next(error);
    }
});

/**
 * @function
 * @description Função de obtenção de um endereço por usuário
 */
router.route('/:userKey').options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
    try {
        const enderecoByUser = await endereco.find({ userKey: req.params.userKey });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(enderecoByUser);
    } catch (err) {
        next(err);
    }
});

/**
 * @function
 * @description Função de atualização de um endereço
 */
router.route('/:id')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.put(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
    try {
        const enderecoAtualizado = await endereco.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(enderecoAtualizado);
    } catch (err) {
        next(err);
    }
})

/**
 * @function
 * @description Função de deleção de um endereço
 */
.delete(cors.corsWithOptions,authenticate.verifyUser,  async (req, res, next) => {
    try {
        await endereco.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: 'Endereço deletado com sucesso'});
    } catch (err) {
        next(err);
    }
});


module.exports = router;

