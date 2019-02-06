import React from 'react'
import getWeb3 from './getWeb3'
import contractDefinition from './contracts/ProyectoInversion.json'

export default class ProyectoWeb3Container extends React.Component {
  state = { web3: null, accounts: null, contractDefinition: null };

  async componentDidMount () {
    try {
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      this.setState({ web3, accounts, contractDefinition })
    } catch (error) {
      alert(
        'No se pudo cargar una instancia de web3, o las cuentas o el contrato.'
        .concat('Revise la consola para más detalle'));
      console.log(error)
    }
  }

  render () {
    const { web3, accounts, contractDefinition } = this.state
    return web3 && accounts
      ? this.props.render({ web3, accounts, contractDefinition })
      : this.props.renderLoading()
  }
}
