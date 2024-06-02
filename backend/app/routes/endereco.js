/*
var express = require('express');
var router = express.Router();

const endereco = required('./models/endereco')

router.route('/')
    .post((req, res, next) => {
        try{
            const novoEnd = new endereco(req.body);
            const end = await novoEnd.save();
            res.status(201).json(end);
        } catch(error){
            next(error);
        }
    });

router.route('/:userKey')
    .get(async(req, res, next) =>{
        try{
            const enderecos = await endereco.find({userKey: req.params.userKey});
            res.status(200).json(enderecos);
        } catch(error){
            next(error);
        }
    })
    */