const mongoose = require('mongoose');
const {ProdutosSchema} = require('./produto');

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
            type:String,
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

    id:mongoose.ObjectId,
    user: {
      nome:{
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      userKey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
    },
    products: {
      type: [ProdutosSchema],
      required: true,
    },
    pagamento: {
      type: pagamentoSchema,
      required: true,
    },
    valorTotal: {
      type: Number,
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
