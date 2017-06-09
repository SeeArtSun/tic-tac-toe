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
  public addSymbol = (index: number) => {
    const { currentGame } = this;

    const history = currentGame.history.slice(0, currentGame.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = currentGame.winner;

    if (winner || squares[index]) {
      return;
    }

    squares[index] = currentGame.xIsNext ? 'X' : 'O';

    this.currentGame.history = history.concat([{ squares: squares }]);
    this.currentGame.stepNumber = history.length;
    this.currentGame.xIsNext = !currentGame.xIsNext;
    this.currentGame.winner = this.calculateWinner(squares);

  }

  @action
  public jumpToHistory = (index: number) => {
    const stepNumber = index;
    const xIsNext = stepNumber%2 === 0 ? true : false;
    const winner = this.calculateWinner(this.currentGame.history[stepNumber].squares);

    this.currentGame.history = this.currentGame.history;
    this.currentGame.stepNumber = stepNumber;
    this.currentGame.xIsNext = xIsNext;
    this.currentGame.winner = winner;
  }

  public calculateWinner(squares: string[]): string {
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
