import React from 'react'
import getWeb3 from './getWeb3'
import getContract from './getContract'
import contractDefinition from './contracts/FactoryProyectoInversion.json'

export default class FactoryWeb3Container extends React.Component {
  state = { web3: null, accounts: null, contract: null };

  async componentDidMount () {
    try {
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const contract = await getContract(web3, contractDefinition)
      this.setState({ web3, accounts, contract })
    } catch (error) {
      alert(
        'No se pudo cargar una instancia de web3, o las cuentas o el contrato.'
        .concat('Revise la consola para más detalle'));
      console.log(error)
    }
  }

  render () {
    const { web3, accounts, contract } = this.state
    return web3 && accounts
      ? this.props.render({ web3, accounts, contract })
      : this.props.renderLoading()
  }
}
