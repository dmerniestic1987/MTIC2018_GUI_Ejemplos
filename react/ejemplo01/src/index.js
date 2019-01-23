import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
      return (
        <button
          className="square"
          onClick={() => this.props.onClick()}
        >
          {this.props.value}
        </button>
      );
    }
  }
class Board extends React.Component {
    constructor(props){
        {/* 
            Creamos un constructor para almacenar el estado de los 
            casillero y así pode determinar al ganador
         */}
        super(props);
        this.state = {
            squares: Array(9).fill(null), 
            xIsNext: true,
        }

        {/* 
            Siempre que definimos una clase de javascript, tenemos
            que empezar el constructor llamando a super. Es similar
            a Java
        */}
    }
    handleClick(i) {
        {/* Creamos una copia y después la modificamos para manterner 
            los datos inmutables ya que de esta forma hacemos componentes
            puros de React y podemos determinar de una manera más sencilla
            los cambios de estado
         */}
        const squaresX = this.state.squares.slice();
        squaresX[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState( {squares: squaresX, 
                        xIsNext: !this.state.xIsNext} )
    }       
    renderSquare(i) {
        {/* Acá le asignamos el valor i a la propiedad value.
            onClick también es una propiedad que se puede acceder
            desde Square */}
        return <Square value={this.state.squares[i]}
                       onClick={() => this.handleClick(i)}/>;
    }

    

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                
                <div className="status">{status}</div>
                <div className="board-row">
                    {/* Acá pasamos los argumentos de la funciones */}
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>  
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

//================
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }