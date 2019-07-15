import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default function Navbar () {
  // Definição
  const classes = useStyles()

  // Funções
  function onHome (e) {
    console.log('Home Button Pressed!')
    window.location = '/'
  }

  function onAdd (e) {
    console.log('Add Button Pressed!')
    window.location = '/create'
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={onHome} edge='start' color='inherit' arial-label='Home'>
            <HomeIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Vagas
          </Typography>
          <IconButton onClick={onAdd} edge='end' color='inherit' arial-label='Add'>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}
