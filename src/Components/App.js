import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import PalancaObjetivos from '../Pages/PalancasObjetivos'
import Menu from './menu'
import UnderConstruction from './underConstrution'




class App extends Component {

  componentDidMount() {


  }

  render() {


    return (
      <BrowserRouter>

<Menu />
      

<Route>
<Route exact path='/' component={Home} />
<Route exact path='/Servicios' component={UnderConstruction} />
<Route exact path='/Personal' component={UnderConstruction} />
<Route exact path='/PalancaObjetivos' component={PalancaObjetivos} />
<Route exact path='/Ayuda' component={UnderConstruction} />
</Route>
   


      </BrowserRouter>

    )
  }
}
//conectar tareas al reducer y traer las acciones del login actions
export default App