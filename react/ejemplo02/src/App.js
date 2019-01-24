import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Reloj from './components/Reloj';
import { tickers } from './tickers.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickers
    }
  }
  render() {
    const tickerList = this.state.tickers.map((ticker) => {
      
      return (
      <div className="col-md-4">
        <div className="card mt-4"> 
          <div className="card-header">
            <h3>{ticker.tickerSymbol} </h3>
            <span className="badge badge-pill badge-danger ml-2">{ticker.tickerName}</span>
          </div>
          <div className="card-body">
            <p>Precio: {ticker.valueUsd} USD</p>
          </div>
        </div>
      </div> ); 
    });

    return (
      <div className="App">
        <Navigation titulo="Manteca"/>
        <header className="App-header">          
          <Reloj/>
        </header>

        <div className="container">
          <div className="row mt-4">
          { tickerList }
          </div>

        </div>
      </div>
    );
  }
}

export default App;
