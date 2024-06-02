const mongoose = require('mongoose');


const EnderecoSchema = mongoose.Schema(
    {
        id:{
            type: String,
        },
        CEP:{
            type: Number,
        },
        logradouro:{
            type: String,
        },
        numero:{
            type: Number,
        },
        complemento:{
            type: String,
            required: false,
        },
        userKey:{
            type: String,
        }
    }
);
const enderecoModel = mongoose.model('endereco',EnderecoSchema);
module.exports = {
    EnderecoSchema,
    enderecoModel
}

/*
required: true,
Ver como dar cast para orbrigar a vir como String
*/