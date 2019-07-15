const router = require('express').Router()

// Modelo do item
const Vaga = require('../models/vaga.model')

// @route   GET api/vagas
// @desc    Devolver todas as vagas
// @access  Público
router.route('/').get((req, res) => {
  Vaga
    .find()
    .then(vagas => res.json(vagas))
    .catch(err => res.status(400).json('Error: ' + err))
})

// @route   GET api/vagas/find/id
// @desc    Devolver vaga específica
// @access  Público
router.route('/find/:id').get((req, res) => {
  Vaga
    .findById(req.params.id)
    .then(vaga => res.json(vaga))
    .catch(err => res.status(400).json('Error: ' + err))
})

// @route   POST api/vagas/add
// @desc    Adicionar nova vaga
// @access  Público
router.route('/add').post((req, res) => {
  const empresa = req.body.empresa
  const descricao = req.body.descricao
  const dataInscricao = Date.parse(req.body.dataInscricao)
  const dataAdmissao = Date.parse(req.body.dataAdmissao)
  const status = req.body.status

  const novaVaga = new Vaga({
    empresa,
    descricao,
    dataInscricao,
    dataAdmissao,
    status
  })

  novaVaga
    .save()
    .then(() => res.json('Vaga Adicionada!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

// @route   DELETE api/vagas/:id
// @desc    Deletar vaga específica
// @access  Público
router.route('/:id').delete((req, res) => {
  Vaga
    .findByIdAndDelete(req.params.id)
    .then(() => res.json('Vaga Deletada!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

// @route   POST api/vagas/update/:id
// @desc    Atualizar vaga específica
// @access  Público
router.route('/update/:id').post((req, res) => {
  Vaga
    .findById(req.params.id)
    .then(vaga => {
      vaga.empresa = req.body.empresa
      vaga.descricao = req.body.descricao
      vaga.dataInscricao = req.body.dataInscricao
      vaga.dataAdmissao = req.body.dataAdmissao
      vaga.status = req.body.status

      vaga
        .save()
        .then(() => res.json('Vaga atualizada!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
})

// Exportação
module.exports = router
