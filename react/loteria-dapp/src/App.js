import React, { Component } from 'react';
import logo from './logo_loteria.svg';
import './App.css';
import web3 from './web3'
import loteria from './loteria'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      jugadores: [],
      balanceAcumulado: 0,
      ultimoGanador: 'x0',
      huboError: false,
      mensaje: '', 
      valorApostado: '', 
      cuenta: ''      
    }
  }
  async componentDidMount() {
    const jugadores = await loteria.methods.getJugadores().call();
    const balance = await loteria.methods.getBalance().call();
    const ultimoGanador = await loteria.methods.getUltimoGanador().call();
    const cuenta = await web3.eth.getAccounts();
    this.setState({
      jugadores: jugadores,
      balanceAcumulado: balance,
      ultimoGanador: ultimoGanador,
      huboError: false,
      mensaje: '',
      valorApostado: '',
      cuenta: cuenta,
      trxHash: ''
    });
  }

  async seleccionarGanador(){
    try{
      this.setState({ mensaje: 'Esperando que la transacción Success', trxHash: ''});
      const trx = await loteria.methods.elegirGanador().send({ from: this.state.cuenta[0]});
      console.log(trx);
      const ultimoGanador = await loteria.methods.getUltimoGanador().call();
      this.setState({
        ultimoGanador: ultimoGanador, 
        mensaje: 'Transaccion exitosa', 
        trxHash: trx.transactionHash
      });
    } catch(err) {
      this.setState({
        huboError: true
      });
    }
  }

  async handleClickJugar(){
    try {
      this.setState({ mensaje: 'Esperando que la transacción Success', trxHash: ''});
      const trx = await loteria.methods.jugar().send( {
                                            from: this.state.cuenta[0], 
                                            value: web3.utils.toWei(this.state.valorApostado, 'ether')
                                          });
      console.log(trx);
      this.setState({ mensaje: 'Transaccion exitosa', trxHash: trx.transactionHash});
    } catch(err) {
      this.setState({
        huboError: true
      });
      alert(err);
    }

    this.setState({valorApostado: ''});
  }

  handleChange = (name, event) => {
    this.setState(
        {[name]: event.target.value}
    );
  }

  render() {   
    return (
      <div className="App bg-dark">
        <div className="container mt-4">
          <div className="card">
            <div className="card-header">
              Lotería Loca! Rinkeby Ethereum
            </div>
            <div className="card-body">
              <h5 className="card-title">Juego del día: {new Date().toLocaleDateString()} </h5>
                <img src={logo} className="App-logo mt-4 mb-4" alt="logo" /> <br />
                <p className="card-text mt-2">
                  Balance Acumulado: { web3.utils.fromWei(String(this.state.balanceAcumulado), 'ether')  + ' ETH'
                                     } <br />
                  Último Ganador: {this.state.ultimoGanador} <br />
                </p>
            </div>
          </div>
        </div>

        <div className="container mt-4">
          <div className="card">
            <h5 className="card-title">Jugar a la Lotería </h5>
            <h6>{this.state.mensaje} {this.state.trxHash}</h6>
            <form className="card-body">
            <div className="form-group">
              <input  type ="number"
                      onChange={(event) => this.handleChange('valorApostado', event)}
                      value={this.state.valorApostado}
                      className="form-control"
                      placeholder="Precio"
                      step=".00001" />
              ETH
            </div>
            <div className="form-group">
              <input  type ="button"
                      name="jugar"
                      onClick={() => this.handleClickJugar()}
                      className="form-control btn btn-primary"
                      value="Jugar" 
                      />               
            </div>    
            <div className="form-group">
              <input  type ="button"
                      name="elegir ganador"
                      onClick={() => this.seleccionarGanador()}
                      className="form-control btn btn-info"
                      value="Elegir Ganador" 
                      />       
            </div>                
            </form>
          </div>
        </div>        
      </div>
    );
  }
}

export default App;
