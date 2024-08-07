const mongoose = require('mongoose');


const EnderecoSchema = mongoose.Schema(
    {
        id:{
            type: String,
        },
        cep:{
            type: Number,
        },
        logradouro:{
            type: String,
        },
        numeroEndereco:{
            type: Number,
        },
        complemento:{
            type: String,
            required: false,
        },
        bairro:{
            type:String,
        },
        complemento:{
            type:String,
        },
        instrucaoPedido:{
            type:String,
        },
        userKey:{
            type: String,
        }
    }
);
const endereco = mongoose.model('endereco',EnderecoSchema);
module.exports = {
    EnderecoSchema,
    endereco
};

/*
required: true,
Ver como dar cast para orbrigar a vir como String
*/