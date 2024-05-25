const mongoose = require('mongoose');


const EnderecoSchema = mongoose.Schema(
    {
        id:{
            type: String,
            required: true,
        },
        CEP:{
            type: String,
            required: true,
        },
        logradouro:{
            type: String,
            required: true,
        },
        numero:{
            type: Number,
            required: true,
        },
        complemento:{
            type: String,
            required: false,
        },
        userKey:{
            type: String,
            required: true,
        }
    }
);
module.exports = mongoose.model('endereco',EnderecoSchema);