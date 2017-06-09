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
}

@action
public addSymbol = (index: number) => {
  const { currentGame } = this;

  let history = currentGame.history.slice(0, currentGame.stepNumber + 1);
  let current = history[history.length - 1];
  let squares = current.squares.slice();
  let winner = currentGame.winner;

  // for ignore the click
  // case1: already won the game / case2: already clicked
  if (winner || squares[index]) {
    return;
  }

  squares[index] = currentGame.xIsNext ? 'X' : 'O';

  this.currentGame.history = history.concat([{ squares: squares }]);
  this.currentGame.stepNumber = history.length;
  this.currentGame.xIsNext = !state.xIsNext;
  this.currentGame.winner = this.calculateWinner(squares);
}

@action
public jumpToHistory = (index: number) => {
  let stepNumber = index;
  let xIsNext = stepNumber % 2 === 0 ? true : false;
  winner = calculateWinner(this.currentGame.history[stepNumber].squares);

  this.currentGame.history = this.currentGame.history,
  this.currentGame.stepNumber = stepNumber
  this.currentGame.xIsNext = xIsNext;
  this.currentGame.winner = winner;
}

function calculateWinner(squares: string[]): string {
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

export default GameStore;
