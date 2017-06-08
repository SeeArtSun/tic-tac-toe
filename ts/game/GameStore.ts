import { action, observable } from 'mobx';

interface IGame {
  history: { squares: string[] }[];
  stepNumber: number;
  winner: string;
  xIsNext: boolean;
}

class GameStore {
  @observable public currentGame: IGame = {
    history: [{
      squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true,
    winner: null,
  };

  @action
  public addSymbol = (game: IGame, action: any) => {
    const history = game.history.slice(0, game.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = game.winner;

    if (winner || squares[action.index]) {
      return;
    }

    squares[action.index] = game.xIsNext ? 'X' : 'O';

    this.currentGame.history = history.concat([{ squares: squares }]);
    this.currentGame.stepNumber = history.length;
    this.currentGame.xIsNext = !game.xIsNext;
    this.currentGame.winner = this.calculateWinner(squares);
  }

  @action
  public jumpToHistory = (game: IGame, action: any) => {
    const stepNumber = action.index;
    const xIsNext = stepNumber%2 === 0 ? true : false;
    const winner = this.calculateWinner(game.history[stepNumber].squares);

    this.currentGame.history = game.history;
    this.currentGame.stepNumber = stepNumber;
    this.currentGame.xIsNext = xIsNext;
    this.currentGame.winner = winner;
  }

  private calculateWinner(squares: string[]): string {
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
}

export default GameStore;
