/*
 *  Action
 */
export const ADD_SYMBOL = "ADD_SYMBOL";
export const JUMP_TO_HISTORY = "JUMP_TO_HISTORY";

export const addSymbol = (index) => ({
  type: ADD_SYMBOL, // necessary
  index
});

export const jumpToHistory = (index) => ({
  type: JUMP_TO_HISTORY,
  index
});
