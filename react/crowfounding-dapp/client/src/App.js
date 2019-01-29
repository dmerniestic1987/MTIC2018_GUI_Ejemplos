import React, { Component } from "react";
import FactoryProyectoInversion from "./contracts/FactoryProyectoInversion.json";
import getWeb3 from "./utils/getWeb3";
import "./App.css";
import FormDialogCrearProyecto from './components/FormDialogCrearProyecto';
import logo from './logo_192x192.png';

class App extends Component {
  state = { web3: null, 
            accounts: null, 
            factoryContract: null,
            contratosDeployados: [], 
            contratoCreado:{
              address: "",
              owner: "",
              hashTrx: "",
            }};

            

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FactoryProyectoInversion.networks[networkId];
      const instance = new web3.eth.Contract(
        FactoryProyectoInversion.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
      this.setState({ web3
                   , accounts
                   , factoryContract: instance }, this.getContratos);
    } catch (error) {
      alert('No se pudo cargar Web3. Revise el Log en consola');
      console.error(error);
    }
  };

  getContratos = async () => {
    const factoryContract = this.state.factoryContract;
    const direccionesContratos = await factoryContract.methods.obtenerContratosPI().call();
    this.setState({contratosDeployados: direccionesContratos});
  };

  listenContratoCreadoEvent() {
    const factoryContract = this.state.factoryContract;
    factoryContract.events.ContratoCreadoEvent((error, event) => { console.log("1: " + event); })
    .on('data', (event) => {
      this.setState({
                      contratoCreado: {
                        address: event.returnValues._contract_address,
                        owner: event.returnValues._owner,
                        hashTrx: event.transactionHash 
                      }
                    });
      console.log("data: " + event);
      this.getContratos();
    })
    .on('changed', (event) => {
      alert("ContratoCreadoEvent Changed! Se saca de la blockchain");
      console.log("changed: " + event);
    })
    .on('error', (err) => {
      alert("ContratoCreadoEvent Error ")
      console.log("error: " + err);
    });
      
  }

  render() {
    
    if (!this.state.web3) {
      return <div>Cargando Web3, cuentas, and contratos...</div>;
    }
    //Nos ponemos a esuchar los Eventos cuando se crea un contrato
    this.listenContratoCreadoEvent();
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Betex Croufouding
        </header>
        <div className="App-body">
          <FormDialogCrearProyecto 
                                  web3 = {this.state.web3}
                                  accounts = {this.state.accounts}
                                  factoryContract = {this.state.factoryContract} />
                                  
        </div>  
      </div>
      
    );
  }
}

export default App;
