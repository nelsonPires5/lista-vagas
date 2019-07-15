import React, { Component } from 'react'
import axios from 'axios'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'

import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import CloseIcon from '@material-ui/icons/Close'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
const PORT = process.env.PORT

const Vaga = props => (
  <Grid item>
    <Card style={{ marginLeft: 10, minWidth: 150 }}>
      <CardActionArea onClick={() => props.more(props.vagaAtual._id)}>
        <CardContent>
          <Typography variant='h6' component='h4'>Empresa </Typography>
          <Typography variant='body1' color='textSecondary'>{props.vagaAtual.empresa}</Typography>
          <Typography variant='h6' component='h4'>Inscrição </Typography>
          <Typography variant='body1' color='textSecondary'>{props.vagaAtual.dataInscricao.substring(0, 10)}</Typography>
          <Typography variant='h6' component='h4'>Status </Typography>
          <Typography variant='body1' color='textSecondary'>{props.vagaAtual.status}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          onClick={() => props.edit(props.vagaAtual._id)}
          aria-label='Edit'
          style={{ marginRight: 15 }}
        >
          <CreateIcon />
        </IconButton>
        <IconButton
          onClick={() => props.remove(props.vagaAtual._id)}
          aria-label='Remove'
          style={{ marginLeft: 15 }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  </Grid>
)

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

const Detalhe = withStyles(styles)(props => (
  <Dialog
    onClose={props.onClose}
    aria-labelledby='customized-dialog-title'
    open={props.stateOpen}
  >
    <DialogTitle id='customized-dialog-title' className={props.classes.root} onClose={props.onClose}>
      Vaga
      {props.onClose ? (
        <IconButton
          aria-label='Close'
          className={props.classes.closeButton}
          onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
    <DialogContent dividers>
      <Typography variant='h6' component='h4'>Empresa </Typography>
      <Typography variant='body1' color='textSecondary'>{props.vaga.empresa}</Typography>
      <Typography variant='h6' component='h4'>Descrição </Typography>
      <Typography variant='body1' color='textSecondary'>{props.vaga.descricao}</Typography>
      <Typography variant='h6' component='h4'>Data Inscrição </Typography>
      <Typography variant='body1' color='textSecondary'>{props.vaga.dataInscricao.substring(0, 10)}</Typography>
      <Typography variant='h6' component='h4'>Data Admissão </Typography>
      <Typography variant='body1' color='textSecondary'>{props.vaga.dataAdmissao.substring(0, 10)}</Typography>
      <Typography variant='h6' component='h4'>Status </Typography>
      <Typography variant='body1' color='textSecondary'>{props.vaga.status}</Typography>
    </DialogContent>
  </Dialog>
))

export default class VagasLista extends Component {
  // Inicialização
  constructor (props) {
    super(props)

    // Binds
    this.onRemove = this.onRemove.bind(this)
    this.onMore = this.onMore.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)

    this.state = {
      vagas: [],
      openDetalhe: false,
      data: {
        dataAdmissao: '',
        dataInscricao: ''
      }
    }
  }

  // Métodos
  componentDidMount () {
    axios
      .get('http://localhost:' + PORT + '/api/vagas/')
      .then(res => {
        this.setState({ vagas: res.data })
      })
      .catch((err) => {
        console.log('Error: ' + err)
      })
  }

  vagasList () {
    return this.state.vagas.map(vaga => {
      return (
        <Vaga
          vagaAtual={vaga}
          key={vaga._id}
          edit={this.onEdit}
          more={this.onMore}
          remove={this.onRemove}
        />
      )
    })
  }

  handleOpen () {
    this.setState({ openDetalhe: true })
  };

  handleClose () {
    this.setState({ openDetalhe: false, data: { dataAdmissao: '', dataInscricao: '' } })
  };

  onMore (id) {
    console.log('Clicando em Saber mais')
    this.handleOpen()
    axios
      .get('http://localhost:' + PORT + '/api/vagas/find/' + id)
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log('Error: ' + err))
  }

  onEdit (id) {
    console.log('Clicando no botão Editar')
    window.location = '/edit/' + id
  }

  onRemove (id) {
    console.log('Clicando no botão Remover')
    axios
      .delete('http://localhost:' + PORT + '/api/vagas/' + id)
      .then(res => console.log(res.data))
      .catch(err => console.log('Error: ' + err))

    this.setState({
      vagas: this.state.vagas.filter(el => el._id !== id)
    })
  }

  render () {
    return (
      <div>
        <CssBaseline />
        <Grid container spacing={3}>
          {this.vagasList()}
        </Grid>
        <Detalhe
          vaga={this.state.data}
          onClose={this.handleClose}
          stateOpen={this.state.openDetalhe}
        />
      </div>
    )
  }
}
