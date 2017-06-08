/*
 *  Action
 */
export const ADD_SYMBOL = "ADD_SYMBOL";
export const JUMP_TO_HISTORY = "JUMP_TO_HISTORY";

export const addSymbol = (index: number) => ({
  type: ADD_SYMBOL, // necessary
  index
});

export const jumpToHistory = (index: number) => ({
  type: JUMP_TO_HISTORY,
  index
});
