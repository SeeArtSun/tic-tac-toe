/*
 *  /reducers/Game.js
 */

/*
 * import Action
 */
import {ADD_SYMBOL, JUMP_TO_HISTORY} from '../actions';

/*
 * initialState 구현
 * react tic-tac-toe의 최 상위 Component인 Game의 state를 참고합니다.
 */
const initialState = {
  history: [{
    squares: Array(9).fill(null),
  }],
  stepNumber: 0,
  xIsNext: true,
  winner: null,
};

/*
 * Reducer 구현
 * Action에서 정의한 Action의 type 별로 Action을 구현할겁니다.
 */
const reducer = (state = initialState, action) => {
  switch(action.type) {
    // 수 두기
    case ADD_SYMBOL:
      let history = state.history.slice(0, state.stepNumber + 1);
      let current = history[history.length - 1];
      let squares = current.squares.slice();
      let winner = state.winner;

      // for ignore the click
      // case1: already won the game / case2: already clicked
      if(winner || squares[action.index]) {
       return state;
      }

      squares[action.index] = state.xIsNext ? 'X' : 'O';

      return {
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
        winner: calculateWinner(squares),
      };
    // history로 이동
    case JUMP_TO_HISTORY:
      return;
    default:
      return state;
  }
}

// tic-tac-toe winner 선정을 위해 데려왔습니다.
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

export default reducer;
