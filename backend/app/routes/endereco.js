const express = require('express');
const {endereco} = require('../models/endereco');
var authenticate = require('../authenticate');
const router = express.Router();
const cors = require('./cors');


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
.delete(cors.corsWithOptions,authenticate.verifyUser,  async (req, res, next) => {
    try {
        await endereco.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});


module.exports = router;

