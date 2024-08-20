const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

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


const UserSchema = mongoose.Schema(
  {
    id:mongoose.ObjectId,
    nome:{
        type:String,
    },
    admin:{
        type:Boolean,
        default: false
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

UserSchema.plugin(passportLocalMongoose);

const user = mongoose.model('users', UserSchema);

module.exports = {
  UserSchema,
  user
};

/**
 "users": [
    {
      "id": "1",
      "nome": "emanu",
      "email": "emanu@nunu",
      "senha": "nununu",
      "admin": true
    },
    {
      "id": "2",
      "email": "jean@jeje",
      "senha": "jeje",
      "nome": "jean",
      "admin": false
    },
    {
      "id": "0556",
      "nome": "Jean",
      "email": "jean@junior2",
      "senha": "teste3teste",
      "admin": false
    },
    {
      "id": "f7d5",
      "nome": "dwqdw",
      "email": "emanumnsa@gmail.com",
      "senha": "dwqwd",
      "admin": false
    },
    {
      "id": "892d",
      "nome": "jefsenjkfsne",
      "email": "jean@jeja",
      "senha": "gsdrgedrg",
      "admin": false
    },
    {
      "id": "eb3b",
      "nome": "gergre",
      "email": "fsdgvsd@gerer",
      "senha": "llllll",
      "admin": false
    },
    {
      "id": "dd7a",
      "nome": "gergre",
      "email": "fsdgvsd@gererk",
      "senha": "llllll",
      "admin": false
    },
    {
      "id": "e378",
      "nome": "gregr",
      "email": "dqwdqwdwq@geegre",
      "senha": "llllll",
      "admin": false
    },
    {
      "id": "21a1",
      "nome": "hrhhtrh",
      "email": "hrhtr@thtrhtr",
      "senha": "opopop",
      "admin": false
    },
    {
      "id": "60de",
      "nome": "gegerr",
      "email": "vsdvds@gergre",
      "senha": "eeeeee",
      "admin": false
    },
    {
      "id": "9a16",
      "nome": "emanu",
      "email": "oii@oii",
      "senha": "oioioi",
      "admin": false
    },
    {
      "id": "1ccd",
      "nome": "ggegr",
      "email": "gnfgfgf@fger",
      "senha": "yyyyyy",
      "admin": false
    },
    {
      "id": "842a",
      "nome": "hrthtr",
      "email": "fghfr@hgrthgr",
      "senha": "yyyyyy",
      "admin": false
    },
    {
      "id": "6494",
      "nome": "emanuu",
      "email": "porfavorvai@pfvrrr",
      "senha": "123456",
      "admin": false
    },
    {
      "id": "40e8",
      "nome": "hernani",
      "email": "hernani@hehe",
      "senha": "hehehe",
      "admin": false
    },
    {
      "id": "ae6b",
      "nome": "shasha",
      "email": "shasha@shasha",
      "senha": "shasha",
      "admin": true
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