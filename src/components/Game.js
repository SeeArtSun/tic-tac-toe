import React, { Component } from 'react';
import { addSymbol, startAgain } from '../actions/index';
import { connect } from 'react-redux';
import Square from './Square';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    const winner  = this.props.winner;

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
        return (
          <li key={move}>
            <a href="javascript:void(0)" onClick={() => this.props.jumpToHistory(move)}>{desc}</a>
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

export default Game;
