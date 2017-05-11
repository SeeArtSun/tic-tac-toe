/*
 *  Action
 */
export const ADD_SYMBOL = "ADD_SYMBOL";
export const JUMP_TO_HISTORY = "JUMP_TO_HISTORY";
export const CALCULATE_WINNER = "CALCULATE_WINNER";

export const addSymbol = (index) => ({
  type: ADD_SYMBOL, // necessary
  index
});

export const jumpToHistory = (history) => ({
  type: JUMP_TO_HISTORY,
  history
});
