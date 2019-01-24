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
            <nav className="navbar navbar-default navbar-static-top bg-dark">
                <p className="bg-dark text-primary text-lg-left">Criptomonedas: <span className="badge badge-pill badge-light ml-2">{this.props.cantTickers}</span> </p>
                <button className="btn btn-lg btn-primary bg-dark" 
                        onClick={() => {this.handleClick('Inicio')}}>Inicio</button>
                <button className="btn btn-lg btn-primary bg-dark" 
                        onClick={() => {this.handleClick('Fin')}}>Fin</button>
            </nav>
        );
    }
}

export default Navigation;