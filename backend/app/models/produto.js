const mongoose = require('mongoose');



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

const ProdutoSchema = mongoose.Schema(
  {
    
    id:{
        type:String, //objectID. tostring
        required:true,
    }
   ,
    nome:{
        type:String,
        required:true,
    },
    imgUrl:{
        type:String,
        required:true,
    },
    preco:{
        type:Number,
        required:true,
    },
    descricao:{
        type:String,
        required:true,
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

const produto = mongoose.model('produto', ProdutoSchema);

module.exports = {
  ProdutoSchema,
  produto,
}
//

/**
 *const produto = [
    {
      "id": "1",
      "nome": "Marmelada de banana Novo",
      "imgUrl": "/img/pizza1.png",
      "preco": "16.9",
      "descricao": "Feita com banana e muita marmelada Novo"
    },
    {
      "id": "2",
      "nome": "Bananada de Goiaba",
      "imgUrl": "/img/pizza2.png",
      "preco": 17.9,
      "descricao": "Feita com banana e goiaba"
    },
    {
      "id": "3",
      "nome": "Goiabada de marmelo",
      "imgUrl": "/img/pizza3.png",
      "preco": 11.9,
      "descricao": "Feita com goiaba e muita marmelada"
    },
    {
      "id": "4",
      "nome": "Sitio do pica-pau amarelo",
      "imgUrl": "/img/pizza4.png",
      "preco": 1.9,
      "descricao": "Feita com Lorem Ipsum"
    },
    {
      "id": "5",
      "nome": "Goiabada de marmelo",
      "imgUrl": "/img/pizza5.png",
      "preco": 11.9,
      "descricao": "Feita com goiaba e muita marmelada"
    },
    {
      "id": "6",
      "nome": "Goiabada de marmelo",
      "imgUrl": "/img/pizza6.png",
      "preco": 11.9,
      "descricao": "Feita com goiaba e muita marmelada"
    },
    {
      "id": "7",
      "nome": "Goiabada de marmelo",
      "imgUrl": "/img/fotopizza.jpg",
      "preco": 11.9,
      "descricao": "Feita com goiaba e muita marmelada"
    },
    {
      "id": "2370",
      "nome": "PRODUTO_TESTE->atualizado!!!!",
      "imgUrl": "/img/food.jpg",
      "preco": "3.1415",
      "descricao": "Produto_teste - > Atualização!!!"
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