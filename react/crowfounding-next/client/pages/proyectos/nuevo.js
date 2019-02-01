import React, {Component} from 'react'
import FactoryWeb3Container from '../../lib/FactoryWeb3Container'
import { Form, Message, Input } from 'semantic-ui-react'
import Layout from '../../components/Layaout'


class FormProyecto extends Component {
    state = {total_proyecto: '0', contribucion_minima: '0' }

    handleChange = (name, event) => {
        this.setState(
            {[name]: event.target.value}
        );
     }
     
     crearProyecto = async () => {
        const { web3, accounts, contract } = this.props;
        const total_proyecto = web3.utils.toWei(this.state.total_proyecto, 'ether');
        const contribucion_minima = web3.utils.toWei(this.state.contribucion_minima, 'ether');
        alert('Total en wei: '.concat(total_proyecto)
             .concat(' contrib mínima en wei: ').concat(contribucion_minima)
             .concat( ' Address: ' + accounts[0]));
        try{
            await contract.methods
            .crearProyectoInversion(contribucion_minima, total_proyecto)
            .send({from: accounts[0]});
        }catch(err){
            alert('No se pudo crear el Proyecto. '.concat(err));
        }
      };

    render() {
      const mensaje = 'Con Betex Crowfounding puedes crear un proyecto para '
             .concat('que el resto de la comunidad te ayude a llevarlo a cabo. ')
             .concat('Debes llenar los datos mínimos obligatorios: Total del Proyecto, que es ')
             .concat('lo que te cuesta ejecutar el proyecto en ETH (la criptomoneda ')
             .concat('de Ethereum), y Contribución ')
             .concat('Mínima que es el mínimo aporte que pueden hacer las personas ')
             .concat('interesadas en tu proyecto, también en ETH. <br />');
      return (
          
        <Form>
            <Message
                info
                icon='info circle'
                header='Quieres crear un proyecto de Crowfounding?'
                content={mensaje}
            />
          <Form.Group widths='equal'>      
            <Form.Input fluid 
                        placeholder='Costo total del proyecto' 
                        type='number' 
                        onChange={(event) => this.handleChange('total_proyecto', event)}
                        name='total_proyecto'
                        label='Costo total del proyecto en ETH'
                        labelPosition='right'/>
            
            <Form.Input fluid 
                        placeholder='Contribución mínima' 
                        type='number' 
                        onChange={(event) => this.handleChange('contribucion_minima', event)}
                        name='contribucion_minima'
                        label='Contribución mínima en ETH'
                        labelPosition='right'/>
          </Form.Group>

          <Form.TextArea label='Descripción' placeholder='Cuéntanos acerca del proyecto...' />
          <Form.Button onClick={this.crearProyecto}>Crear proyecto</Form.Button>
        </Form>
      )
    }
}

class NuevoProyecto extends React.Component {
    render(){
        return(
            <Layout>
                <h1>Crear Proyecto</h1>
                <FormProyecto web3={this.props.web3} 
                              accounts={this.props.accounts} 
                              contract={this.props.contract} />
            </Layout>
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
  