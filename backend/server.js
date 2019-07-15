const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

// Inicialização
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// BD Conexão
const URI = 'mongodb+srv://pires123:pires123@cluster0-luvj7.mongodb.net/test?retryWrites=true&w=majority'
mongoose
  .connect(URI, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => { console.log('MongoDB connection established successfully') })

// Roteamento
const vagaRouter = require('./routes/vagas')
app.use('/api/vagas', vagaRouter)

// Se estiver em produção
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Ativando
app.listen(PORT, () => {
  console.log('Server Initialiazed!')
  console.log(`Running on Port ${PORT}`)
})
