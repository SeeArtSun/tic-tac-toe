import * as React from 'react';
import Board from './Board';

interface IProps {
  history: { squares: string[] }[];
  stepNumber: number;
  winner: string;
  xIsNext: boolean;
  jumpToHistory: (move: number) => void;
  addSymbol: () => void;
}

class Game extends React.Component<IProps, undefined> {
  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    const winner  = this.props.winner;

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
        return (
          <li className={this.props.stepNumber === move ? "highlight" : ""} key={move}>
            <button onClick={() => this.props.jumpToHistory(move)}>{desc}</button>
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
          <ol className="game-info-moves">{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
