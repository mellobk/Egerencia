import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "../css/menu.scss";

export class Menu extends Component {
  componentDidMount() {
  

  }

  ponerMenu = () => {

    return (
      <Fragment>

<nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

    <ul className="navbar-nav justify-content-center">
      <li className="nav-item active">
        <Link className="nav-link"  to="/">Inicio <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link"  to="/Servicios">Servicios</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link"  to="/Personal"> Nuestro Personal</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link"  to="/PalancaObjetivos">Palancas Y Objetivos</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link"  to="/Ayuda">Ayuda</Link>
      </li>
    </ul>
  

  
</nav>
   
      </Fragment>

      
    );
  };

  render() {
   

    return this.ponerMenu();

    
  }
}

export default Menu;
