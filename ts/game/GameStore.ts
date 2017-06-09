import { action, computed, observable } from 'mobx';

interface IGame {
  history: { squares: string[] }[];
  stepNumber: number;
  winner: string;
  xIsNext: boolean;
}

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

    if (this.winner || squares[index]) {
      return;
    }

    squares[index] = currentGame.xIsNext ? 'X' : 'O';

    this.currentGame.history = [...history, { squares: squares }];
    this.currentGame.stepNumber = history.length;
    this.currentGame.xIsNext = !currentGame.xIsNext;
  }

  @action
  public jumpToHistory = (index: number) => {
    const stepNumber = index;
    const xIsNext = stepNumber%2 === 0 ? true : false;

    this.currentGame.history = this.currentGame.history;
    this.currentGame.stepNumber = stepNumber;
    this.currentGame.xIsNext = xIsNext;
  }

  @computed
  public get currentStep() {
    const { history, stepNumber } = this.currentGame;

    return history[stepNumber];
  }

  @computed
  public get winner(): string {
    const squares = this.currentStep.squares.slice();

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
