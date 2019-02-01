import React from 'react'
import getWeb3 from './getWeb3'
import contractDefinition from './contracts/ProyectoInversion.json'

export default class ProyectoWeb3Container extends React.Component {
  
  state = { web3: null
          , accounts: null
          , contract: null};

  async componentDidMount () {
    try {
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const address = this.props.address;
      alert('address que llega: ' + address)
      const contract = new web3.eth.Contract(
        contractDefinition.abi,
        address
      )
      this.setState({ web3, accounts, contract, address })
    } catch (error) {
      alert(
        'No se pudo cargar una instancia de web3, o las cuentas o el contrato.'
        .concat('Revise la consola para más detalle'));
      console.log(error)
    }
  }

  render () {
    const { web3, accounts, contract, address } = this.state
    return web3 && accounts
      ? this.props.render({ web3, accounts, contract, address })
      : this.props.renderLoading()
  }
}
