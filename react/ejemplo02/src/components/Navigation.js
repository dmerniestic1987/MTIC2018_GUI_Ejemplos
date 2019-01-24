import React, { Component } from 'react';

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
          operaciones: []
        }    
      }
    handleClick(buttonName){
        const operaciones = this.state.operaciones.concat([buttonName]);
        this.setState({
          operaciones : operaciones
        });
        alert('Usted hizo click en: ' + buttonName);
    }
      
    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <h1 >{this.props.titulo.toUpperCase()}</h1>
                <button className="btn btn-lg btn-primary bg-dark" 
                        onClick={() => {this.handleClick('Inicio')}}>Inicio</button>
                <button className="btn btn-lg btn-primary bg-dark" 
                        onClick={() => {this.handleClick('Fin')}}>Fin</button>
            </nav>
        );
    }
}

export default Navigation;