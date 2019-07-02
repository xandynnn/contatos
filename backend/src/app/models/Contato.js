const mongoose = require('../../database');

const ContatoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        description: 'Nome que descreva o contato'
    },
    canal: {
        type: String,
        enum: ["email", "celular", "fixo"],
        required: true,
        description: 'Tipo de canal de contato, podendo ser email, celular ou fixo'
    },
    valor:{
        type: String,
        required: true,
        description: 'Valor para o canal de contato'
    },
    obs:{
        type: String,
        description: 'Qualquer observação que seja pertinente'
    },
    created:{
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Contato', ContatoSchema);
