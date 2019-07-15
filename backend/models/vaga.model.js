const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vagaSchema = new Schema({
  empresa: { type: String, required: true, maxlength: 140 },
  descricao: { type: String, maxlength: 140 },
  dataInscricao: { type: Date, required: true },
  dataAdmissao: { type: Date },
  status: { type: String, required: true }
}, {
  timestamps: true
})

const Vaga = mongoose.model('Vaga', vagaSchema)

module.exports = Vaga
