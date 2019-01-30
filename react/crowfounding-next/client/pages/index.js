import React from 'react'
import Link from 'next/link'
import Web3Container from '../lib/FactoryWeb3Container'
import { Button, Card} from 'semantic-ui-react'
import Layout from '../components/Layaout'

class Mantecoso extends React.Component {
  state = {
    proyectos: undefined,
    ethBalance: undefined
  };

  async componentDidMount() {
    await this.getProyectosInversion();
    await this.getEthBalance();
  }

  getProyectosInversion = async () => {
    const { contract } = this.props
    const response = await contract.methods.obtenerContratosPI().call();
    this.setState({ proyectos: response })
  };

  getEthBalance = async () => {
    const { web3, accounts } = this.props
    const balanceInWei = await web3.eth.getBalance(accounts[0])
    this.setState({ ethBalance: balanceInWei / 1e18 })
  };

  dibujarTarjetasProyectos(){
    const { proyectos = [] } = this.state;
    const listProyectos = proyectos.map((proyecto, index) => {
      return { 
        header: 'Proyecto ID: '.concat(proyecto),
        description: <a><strong>Ver Proyecto</strong></a>,
        meta: 'Proyecto Financiado en Ether',
        fluid: true
      }
    });
    return <Card.Group centered items={listProyectos} />
  }
  render () {
    const { ethBalance = 'N/A' } = this.state

    return (
      <Layout>
      <div>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
        />
        <div>Ether Balance: {ethBalance}</div>
        <hr/>
        <h1>Proyectos Abiertos</h1>
        <Button primary content='Crear Proyecto' icon='add circle large' labelPosition='left' />
        {this.dibujarTarjetasProyectos()}
        
        <button onClick={this.getProyectosInversion}>Lista de Proyectos</button>
        <button onClick={this.getEthBalance}>Get ether balance</button>

        <div>
          <Link href='/accounts'>
            <a>My Accounts</a>
          </Link>
        </div>
        <div>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </div>
      </div>
      </Layout>
    )
  }
}

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Mantecoso Page...</div>}
    render={({ web3, accounts, contract }) => (
      <Mantecoso accounts={accounts} contract={contract} web3={web3} />
    )}
  />
)
