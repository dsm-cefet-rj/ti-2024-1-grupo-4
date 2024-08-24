const mongoose = require('mongoose');
const {EnderecoSchema} = require('./endereco');

const EntregaSchema = mongoose.Schema(
  {

    id:mongoose.ObjectId,
    endereco : {
        type: EnderecoSchema,
        required: true,
    },
    status: {
        type: String,
        default: 'Avaliando o pedido',
    },
    pedido : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pedido',
        required: true,
    },
    userKey : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: true,
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

const entrega =  mongoose.model('entrega', EntregaSchema);

module.exports = {
  EntregaSchema,
  entrega,
}
