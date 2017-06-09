import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Component } from 'react';
import Board from './Board';
import GameStore from './GameStore';
import { IStores } from '../index';

interface IInjects {
  gameStore?: GameStore;
}

@inject((stores: IStores): IInjects => ({
  gameStore: stores.gameStore,
}))
@observer
class Game extends Component<IInjects, undefined> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { gameStore } = this.props;
    const currentGame = gameStore.currentGame;
    const history = currentGame.history;
    const current = history[currentGame.stepNumber];
    const winner  = currentGame.winner;

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
        return (
          <li key={move}>
            <button onClick={() => gameStore.jumpToHistory(currentGame, move)}>{desc}</button>
          </li>
        );
    });

    let status;
     if(winner) {
       status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (currentGame.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={() => gameStore.addSymbol(currentGame, event)}
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
