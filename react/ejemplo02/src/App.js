import React, { Component } from 'react';
import logo from './logo.svg';
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
      
      return (<div className="card"> 
                <div className="card-header">
                  {ticker.tickerSymbol}
                </div>
                {ticker.tickerName}
              </div> ); 
    });

    return (
      <div className="App">
        <Navigation titulo="Manteca"/>
        <header className="App-header">
          <Reloj/>
          <img src={logo} className="App-logo" alt="logo" />
            Learn React
        </header>

        { tickerList }

      </div>
    );
  }
}

export default App;
