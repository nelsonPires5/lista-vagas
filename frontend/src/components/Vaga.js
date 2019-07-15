import React, { Component } from 'react'
import axios from 'axios'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
const PORT = process.env.PORT || 5000

export default class Vaga extends Component {
  constructor (props) {
    super(props)

    this.onChangeEmpresa = this.onChangeEmpresa.bind(this)
    this.onChangeDescricao = this.onChangeDescricao.bind(this)
    this.onChangeDataInscricao = this.onChangeDataInscricao.bind(this)
    this.onChangeDataAdmissao = this.onChangeDataAdmissao.bind(this)
    this.onChangeStatus = this.onChangeStatus.bind(this)

    this.state = {
      empresa: '',
      descricao: '',
      dataInscricao: '',
      dataAdmissao: '',
      status: ''
    }
  }

  onChangeEmpresa (e) {
    this.setState({
      empresa: e.target.value
    })
  }

  onChangeDescricao (e) {
    this.setState({
      descricao: e.target.value
    })
  }

  onChangeDataInscricao (e) {
    this.setState({
      dataInscricao: e.target.value
    })
  }

  onChangeDataAdmissao (e) {
    this.setState({
      dataAdmissao: e.target.value
    })
  }

  onChangeStatus (e) {
    this.setState({
      status: e.target.value
    })
  }

  onAdd (e) {
    e.preventDefault()
    if (e.currentTarget.form.checkValidity()) {
      console.log('Verdade')
      const vaga = {
        empresa: this.state.empresa,
        descricao: this.state.descricao,
        dataInscricao: this.state.dataInscricao,
        dataAdmissao: this.state.dataAdmissao,
        status: this.state.status
      }
      console.log(vaga)

      axios
        .post('http://localhost:' + PORT + '/api/vagas/add', vaga)
        .then(res => console.log(res.data))

      this.setState({
        empresa: '',
        descricao: '',
        dataInscricao: '',
        dataAdmissao: '',
        status: ''
      })
    } else {
      console.log('Falso')
      e.currentTarget.form.reportValidity()
    }
  }

  render () {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div>
          <Typography
            component='h1'
            variant='h5'
            style={{ alignSelf: 'center' }}
          >
          Adicionando Vaga
          </Typography>
          <form>
            <TextField
              variant='outlined'
              margin='normal'
              value={this.state.empresa}
              onChange={this.onChangeEmpresa}
              required
              fullWidth
              id='empresa'
              label='Empresa'
              name='empresa'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              value={this.state.descricao}
              onChange={this.onChangeDescricao}
              fullWidth
              name='descricao'
              label='Descrição da Vaga'
              id='descricao'
              multiline
              rowsMax='5'
              inputProps={{ maxLength: 140 }}
            />
            <TextField
              required
              value={this.state.dataInscricao}
              onChange={this.onChangeDataInscricao}
              id='dataInscricao'
              label='Data Inscrição'
              type='date'
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              required
              id='dataAdmissao'
              label='Data Admissão'
              type='date'
              value={this.state.dataAdmissao}
              onChange={this.onChangeDataAdmissao}
              InputLabelProps={{
                shrink: true
              }}
              style={{ marginLeft: 30 }}
            />
            <TextField
              variant='outlined'
              margin='normal'
              value={this.state.status}
              onChange={this.onChangeStatus}
              fullWidth
              name='status'
              label='Status'
              id='status'
              required
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              onClick={e => this.onAdd(e)}
            >
            Adicionar
            </Button>
          </form>
        </div>
      </Container>
    )
  }
}
