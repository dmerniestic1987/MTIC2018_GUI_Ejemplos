import React, { Component } from 'react';

class Reloj extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date : new Date()
        }
    }

    tick() {
        this.setState({
          date: new Date()
        });
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }
    
    render () {
        return(
            <div>
                <h2>Son las: {this.state.date.toLocaleTimeString()}.</h2>
            </div> 
        );
    }
}

export default Reloj;