const mongoose = require('mongoose')

const UnidadeSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  responsavel: {
    type: String,
  },
  ul: {
    type: Number
  },
  termo: {
    type: String,
    enumValues: ['pendente', 'ok']
  },
  bens: {
    type: String,
    enumValues: ['pendente', 'ok']
  },
  grupo: {
    type: Number,
    required: true
  },
  comentario: {
    type: [String]

  }
})

const Unidade = mongoose.model('Unidade', UnidadeSchema)

module.exports = Unidade