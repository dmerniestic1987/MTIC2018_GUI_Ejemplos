import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3'
import loteria from './loteria'

class App extends Component {
  async componentDidMount() {
    const jugadores = await loteria.methods.getJugadores().call();
    console.log(jugadores);
    const balance = await loteria.methods.getBalance().call();
    console.log(balance);
    const ultimoGanador = await loteria.methods.getUltimoGanador().call();
    console.log(ultimoGanador);

    this.setState({
      jugadores: jugadores,
      balanceAcumulado: balance,
      ultimoGanador: ultimoGanador
    });
  }

  render() {
    web3.eth.getAccounts().then(console.log);
    
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <div className="bg-dark">
          HOlanp
        </div>
      </div>
    );
  }
}

export default App;
