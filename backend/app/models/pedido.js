const mongoose = require('mongoose');
const {ProdutosSchema} = require('./produto');
const {UserSchema} = require('./users');
const {EnderecoSchema} = require('./endereco');


/*

* types:
* String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
Map
UUID
* 
*/
/**
 *   "pagamento": {
        "T_pagamento": "cartao_credito",
        "num_cartao": "5234234536467",
        "nome_cartao": "1sfasddfa@haha",
        "datacartao": "2024-04-17",
        "codcartao": "312"
      },
       "pagamento": {
        "T_pagamento": "pix",
        "num_cartao": "",
        "nome_cartao": "",
        "datacartao": "",
        "codcartao": "",
        "nomePagamento": "shasha",
        "cpfPagamento": "12345678901"
      },

 */
const pagamentoSchema = new mongoose.Schema(
    {
        T_pagamento:{
            type:String,
        },
        num_cartao:{
            type:Number,
        },
        nome_cartao:{
            type:String,
        },
        datacartao:{
            type:Date,
        },
        codcartao:{
            type:Number,
        },
        nomePagamento:{
            type:Number,
        },
        cpfPagamento:{
            type:Number,
        },
        cpfPagamento:{
            type:Number,
        },
    }
);

const PedidoSchema = mongoose.Schema(
  {

    id: {
      type: String, //objectID. tostring
      required: true,
    },
    user: {
      type: UserSchema,
      required: true,
    },
    endereco: {
      type: EnderecoSchema,
      required: true,
    },
    produtos: {
      type: [ProdutosSchema],
      required: true,
    },
    pagamento: {
      type: pagamentoSchema,
      required: true,
    },
    valor_total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
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
      versionKey: false
    }
  }
);

const pedido =  mongoose.model('pedido', PedidoSchema);

module.exports = {
  PedidoSchema,
  pedido,
}
//
/**
 * Poderia ser/ deveria ser dessa forma
 *  produtos: [
            {
                produtos,
                quantity: {
                    type: Number,
                }
            }
        ]
 */
/**
 *const pedido = [
  {
    "id": "e451",
    "user": {
      "id": "2",
      "email": "jean@jeje",
      "senha": "jeje",
      "nome": "jean",
      "admin": false
    },
    "endereco": {
      "instrucao_pedido": "",
      "bairro": "Olaria",
      "CompEnd": "perto de lugar nenhum",
      "numEnd": 321,
      "logradouro": "Rua qualquer",
      "cep": 123
    },
    "products": [
      {
        "id": "3",
        "nome": "Goiabada de marmelo",
        "imgUrl": "/img/food.jpg",
        "preco": 11.9,
        "descricao": "Feita com goiaba e muita marmelada",
        "quantity": 1
      },
      {
        "id": "2",
        "nome": "Bananada de Goiaba",
        "imgUrl": "/img/food.jpg",
        "preco": 17.9,
        "descricao": "Feita com banana e goiaba",
        "quantity": 1
      }
    ],
    "pagamento": {
      "T_pagamento": "pix",
      "num_cartao": "",
      "nome_cartao": "",
      "datacartao": "",
      "codcartao": "",
      "nomePagamento": "hernani",
      "cpfPagamento": "12345678910"
    },
    "valorTotal": 29.799999999999997,
    "status": "Avaliando pedido"
  }
]
 * 
 */


/**
 * import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});
*/