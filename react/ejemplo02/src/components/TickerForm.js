import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

class TickerForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            tickerName: '',
            tickerSymbol: '',
            valueUsd: 0
        }
        this.handleClickGuardar = this.handleClickGuardar.bind(this);
    }
    
    handleChange = (name, event) => {
        this.setState(
            {[name]: event.target.value}
        );
     }

    handleClickGuardar(e) {
        confirmAlert({
            title: 'Guardar Cripto',
            message: 'Confirma el alta de una nueva criptomoneda.',
            buttons: [
              {
                label: 'Confirmar',
                onClick: () => {
                    this.props.onClick(this.state);
                    this.setState({
                        id: 0,
                        tickerName: '',
                        tickerSymbol: '',
                        valueUsd: 0
                    });
                }
              },
              {
                label: 'Cancelar',
                onClick: () => {
                    this.setState({
                        id: 0,
                        tickerName: '',
                        tickerSymbol: '',
                        valueUsd: 0
                    });
                }
              }
            ]
          })
    }
    render() {
        return (
            <div className="card mt-4">
                <form className="card-body">
                    <div className="form-group">
                        <input  type ="text"
                                onChange={(event) => this.handleChange('tickerName', event)}
                                value={this.state.tickerName}
                                className="form-control"
                                placeholder="Nombre" />
                    </div>
                    <div className="form-group">
                        <input  type ="text"
                                onChange={(event) => this.handleChange('tickerSymbol', event)}
                                value={this.state.tickerSymbol}
                                className="form-control"
                                placeholder="Símbolo" />
                    </div>

                    <div className="form-group">
                        <input  type ="number"
                                onChange={(event) => this.handleChange('valueUsd', event)}
                                value={this.state.valueUsd}
                                className="form-control"
                                placeholder="Precio" />
                    </div>
                    <div className="form-group">
                        <input  type ="button"
                                name="guardar"
                                onClick={this.handleClickGuardar}
                                className="form-control btn btn-primary"
                                placeholder="Precio"
                                value="Guardar" />
                    </div>                    
                </form>
            </div>
        );
    }
}

export default TickerForm;