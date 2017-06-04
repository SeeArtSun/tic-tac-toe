/*
 *  /components/Game.js
 */
import React from 'react';
import Board from './Board'
import '../index.css';

class Game extends React.Component {
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    const winner = this.props.winner;

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
        return (
          <li key={move}>
            <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
          </li>
        );
    });

    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={this.props.addSymbol}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game
