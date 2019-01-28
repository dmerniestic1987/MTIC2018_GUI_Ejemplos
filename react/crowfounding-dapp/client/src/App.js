import React, { Component } from "react";
import FactoryProyectoInversion from "./contracts/FactoryProyectoInversion.json";
import getWeb3 from "./utils/getWeb3";
import SimpleBottomNavigation from './components/SimpleBottomNavigation';
import "./App.css";
import FormDialogCrearProyecto from './components/FormDialogCrearProyecto';
import logo from './logo_192x192.png';
class App extends Component {
  state = { web3: null, 
            accounts: null, 
            factoryContract: null,
            contratosDeployados: []};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contrato instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FactoryProyectoInversion.networks[networkId];
      const instance = new web3.eth.Contract(
        FactoryProyectoInversion.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3
                   , accounts
                   , factoryContract: instance }, this.getContratos);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getContratos = async () => {
    const factoryContract = this.state.factoryContract;

    // Get the value from the contract to prove it worked.
    const contratosDeployados = await factoryContract.methods.obtenerContratosPI().call();
    this.setState({contratosDeployados: contratosDeployados});
    // Update state with the result.
  };

  render() {
    if (!this.state.web3) {
      return <div>Cargando Web3, cuentas, and contratos...</div>;
    }
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Betex Croufouding
        </header>
        <FormDialogCrearProyecto web3 = {this.state.web3}
                                 accounts = {this.state.accounts}
                                 factoryContract = {this.state.factoryContract}
        />

        
        <SimpleBottomNavigation />
      </div>
    );
  }
}

export default App;
