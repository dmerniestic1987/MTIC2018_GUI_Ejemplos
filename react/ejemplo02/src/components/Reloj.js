import React, { Component } from 'react';
import logo from '../logo.svg';
class Reloj extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date : new Date()
        }
    }

    tick() {
        this.setState({
          date: new Date()
        });
    }

    
    componentDidMount() {
        /* Método de ciclo de vida: 
        Se ejecuta después que la salida del componente ha 
        sido renderizado al DOM.  */
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }

    componentWillUnmount() {
        /*
        Se llama a este método cundo el elemento es eliminado del DOM
        */
        clearInterval(this.timerID);
    }

    render () {
        return(
            <div>
                <h2>Son las: {this.state.date.toLocaleTimeString()}.</h2>
                <img src={logo} className="App-logo" alt="logo" />
            </div> 
        );
    }
}

export default Reloj;