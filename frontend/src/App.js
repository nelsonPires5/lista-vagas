import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import VagasLista from './components/Vagas-Lista'
import Vaga from './components/Vaga'
import EditVaga from './components/Edit-Vaga'

function App () {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path='/' exact component={VagasLista} />
      <Route path='/create' exact component={Vaga} />
      <Route path='/edit/:id' exact component={EditVaga} />
    </Router>
  )
}

export default App
