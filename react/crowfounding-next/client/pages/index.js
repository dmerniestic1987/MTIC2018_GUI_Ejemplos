import React from 'react'
import Link from 'next/link'
import FactoryWeb3Container from '../lib/FactoryWeb3Container'
import { Button, Card} from 'semantic-ui-react'
import Layout from '../components/Layaout'

class ProyectosIndex extends React.Component {
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
        description: <a><strong>Detalles del Proyecto</strong></a>,
        meta: 'Proyecto financiado en Ethers',
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
        <div>Ether Balance: {ethBalance}</div>
        <hr/>
        

        <div style={{margin:'10px', textAlign: 'center'}}>
          <Link href='/proyectos/nuevo'>
            <Button color='purple'
                  size='large'
                  content='Crear Proyecto' 
                  icon='add circle large' 
                  labelPosition='left' 
                  style={{margin:'10px'}}/>
            </Link>
          
          <Button color='purple'
                size='large'
                content='Recargar lista de proyectos' 
                icon='refresh circle large' 
                labelPosition='left'
                onClick={this.getProyectosInversion}
                style={{margin:'10px'}} />

          <Button color='purple'
                size='large'
                content='Consultar su balance Eth' 
                icon='money circle large' 
                labelPosition='left'
                onClick={this.getEthBalance} 
                style={{margin:'10px'}}/>
        </div>
        
        <h1>Proyectos Abiertos</h1>

        {this.dibujarTarjetasProyectos()}

      </div>
      </Layout>
    )
  }
}

export default () => (
  <FactoryWeb3Container
    renderLoading={() => <div>Cargando la página. Aguarde por favor...</div>}
    render={({ web3, accounts, contract }) => (
      <ProyectosIndex accounts={accounts} contract={contract} web3={web3} />
    )}
  />
)
