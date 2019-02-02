import React, {Component} from 'react'
import ProyectoWeb3Container from '../../lib/ProyectoWeb3Container'
import {withRouter} from 'next/router'
import Layout from '../../components/Layaout'

const Proyecto = withRouter((props) => (
    <Layout>
       <ProyectoShow address = {props.router.query.address} 
                     accounts = {props.accounts}
                     web3 = {props.web3}
                     contractDefinition = {props.contractDefinition}/>
    </Layout>
))

class ProyectoShow extends Component{
  state={
    web3: null,
    contractDefinition: null,
    address: null,
    accounts: null, 
    contractInstance: null,
    totalRequerido: undefined,
    contribucionMinima: undefined, 
    cantidadInversores: undefined
  }

  async componentDidMount () {
    try {
      await this.getTotalRequerido();
      await this.getContribucionMinima();
      await this.getCantidadInversores();

    } catch (error) {
      alert(
        'No se pudo cargar una instancia de web3, o las cuentas o el contrato. '
        .concat(error.message + '. ')
        .concat('Revise la consola para más detalle'));
      console.log(error)
    }
  }

  getContractInstance() {
    const web3 = this.props.web3;
    const contractDefinition = this.props.contractDefinition;
    const contractInstance = new web3.eth.Contract(
      contractDefinition.abi,
      this.props.address
    ) 
    return contractInstance;   
  }

  getTotalRequerido = async() => {    
    const instance = this.getContractInstance();
    const web3 = this.props.web3;
    const totalRequeridoWei = await instance.methods.totalRequerido().call();
    const totalRequeridoEther = web3.utils.fromWei(totalRequeridoWei, 'ether');
    this.setState({totalRequerido: totalRequeridoEther});

          /*
    uint public cantidadInversores;
      */

  }

  getContribucionMinima = async() =>{
    const instance = this.getContractInstance();
    const web3 = this.props.web3;
    const contribucionMinimaWei = await instance.methods.contribucionMinima().call();
    const contribucionMinimaEther = web3.utils.fromWei(contribucionMinimaWei, 'ether');
    this.setState({contribucionMinima: contribucionMinimaEther});
  }

  async getCantidadInversores(){
    const instance = this.getContractInstance();
    const cantidadInversores = await instance.methods.cantidadInversores().call();
    this.setState({cantidadInversores: cantidadInversores});
  }

  render(){
    const addressContract = this.props.address;
    const { totalRequerido = 'N/A'
          , contribucionMinima = 'N/A'
          , cantidadInversores = 'N/A' } = this.state;

    return (
      <div>
        <h1>{addressContract}</h1>
        Total Requerido: {totalRequerido} ETH <br />
        Contribución Mínima: {contribucionMinima} ETH <br />
        Cantidad de Inversores: {cantidadInversores}
      </div>
    )
  }
}

export default (props) => (
    <ProyectoWeb3Container
      renderLoading={() => <div>Cargando la página. Aguarde por favor...</div>}
      render={({ web3, accounts, contractDefinition }) => (
        <Proyecto accounts={accounts} contractDefinition={contractDefinition} web3={web3} />
      )}
    />
  )
  