const mongoose = require('mongoose');

const EnderecoSchema = new mongoose.Schema(
    {
        CEP: {
            type: String,
            required: true,
        },
        logradouro: {
            type: String,
            required: true,
        },
        numeroEndereco: {
            type: Number,
            required: true,
        },
        complemento: {
            type: String,
            required: false,
        },
        userKey: {
            type: mongoose.Schema.Types.ObjectId, // Reference to User model
            ref: 'user', // Name of the User model
            required: true,
        }
    },
    {
        timestamps: true, // Mongoose will automatically manage createdAt and updatedAt fields
        toJSON: {
            virtuals: true,
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

const endereco =  mongoose.model('endereco', EnderecoSchema);

module.exports = {
    EnderecoSchema,
    endereco
  };

/*
required: true,
Ver como dar cast para orbrigar a vir como String
*/