const express = require('express');
const {endereco} = require('../models/endereco');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const enderecoBanco = await endereco.find({});
        res.status(200).json(enderecoBanco);
    } catch (err) {
        next(err);
    }
});

router.get('/:userKey', async (req, res, next) => {
    try {
        const enderecoByUser = await endereco.find({ userKey: req.params.userKey });
        res.status(200).json(enderecoByUser);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const novoEndereco = await endereco.create(req.body);
        res.status(201).json(novoEndereco);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const enderecoAtualizado = await endereco.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(enderecoAtualizado);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await endereco.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;

