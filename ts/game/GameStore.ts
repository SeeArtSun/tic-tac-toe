import { observable } from 'mobx';

interface IGame {
  history: { squares: string[] }[];
  stepNumber: number;
  winner: string;
  xIsNext: boolean;
}

class GameStore {
  @observable public Game: IGame = {
    history: [{
      squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true,
    winner: null,
  };
}

export default GameStore;
