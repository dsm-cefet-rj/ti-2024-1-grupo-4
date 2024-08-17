const mongoose = require('mongoose');


const EnderecoSchema = mongoose.Schema(
    {
        id:mongoose.ObjectId,
        CEP:{
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
        userKey:{
            type: String,
        }
    },
    {
        toJSON: {
          virtuals: true,
          transform(doc, ret) {
            delete ret.password
            ret.id = ret._id
            delete ret._id
          },
          timestamps: true,
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