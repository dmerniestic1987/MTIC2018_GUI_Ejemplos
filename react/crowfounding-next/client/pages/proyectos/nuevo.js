import React from 'react'
import FactoryWeb3Container from '../../lib/FactoryWeb3Container'
import { Button, Card} from 'semantic-ui-react'
import Layout from '../../components/Layaout'

class NuevoProyecto extends React.Component {
    render(){
        return(
            <div>
                <h1>Crear Proyecto</h1>
                <Button color='purple'
                size='large'
                content='Crear Proyecto' 
                icon='add circle large' 
                labelPosition='left' 
                style={{margin:'10px'}}/>
            </div>
        );
    }
}

export default () => (
    <FactoryWeb3Container
      renderLoading={() => <div>Cargando la página. Aguarde por favor...</div>}
      render={({ web3, accounts, contract }) => (
        <NuevoProyecto accounts={accounts} contract={contract} web3={web3} />
      )}
    />
  )
  