import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Reloj from './components/Reloj';
import TickeForm from './components/TickerForm';
import { tickers } from './tickers.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickers: tickers
    }
  }

  handleClick(ticker) {
    ticker.id = tickers.length;
    const newTickers = this.state.tickers.slice().concat(ticker);
    console.log(newTickers);
    this.setState({tickers: newTickers});
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
        <Navigation cantTickers={this.state.tickers.length}/>
        <header className="App-header">          
          <Reloj/>
        </header>

        
        <div className="container">
          <TickeForm onClick={(ticker) => this.handleClick(ticker)}/>
          <div className="row mt-4">
            { tickerList }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
