import React, { Component } from 'react';

class TickerForm extends Component {
    handleChange(e) {
        console.log(e.target.value, e.target.name);
    }
    render() {
        return (
            <div className="card mt-4">
                <form className="card-body">
                    <div className="form-group">
                        <input  type ="text"
                                onChange={this.handleChange}
                                name="tickerName"
                                className="form-control"
                                placeholder="Nombre" />
                    </div>
                    <div className="form-group">
                        <input  type ="text"
                                onChange={this.handleChange}
                                name="tickerSymbol"
                                className="form-control"
                                placeholder="Símbolo" />
                    </div>

                    <div className="form-group">
                        <input  type ="number"
                                onChange={this.handleChange}
                                name="tickerPrice"
                                className="form-control"
                                placeholder="Precio" />
                    </div>
                    <div className="form-group">
                        <input  type ="button"
                                name="guardar"
                                className="form-control"
                                placeholder="Precio"
                                value="Guardar" />
                    </div>                    
                </form>
            </div>
        );
    }
}

export default TickerForm;