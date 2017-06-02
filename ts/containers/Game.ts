import { connect } from 'react-redux';
import { addSymbol, jumpToHistory } from '../actions';
import Game from '../components/Game';

interface IState {
  history: { squares: string[] }[];
  stepNumber: number;
  winner: string;
  xIsNext: boolean;
}

const mapStateToProps = (state: IState) => ({
  history: state.history,
  stepNumber: state.stepNumber,
  xIsNext: state.xIsNext,
  winner: state.winner,
});

const mapDispatchToProps = (dispatch: any) => ({
  addSymbol(index: number) {
    dispatch(addSymbol(index));
  },
  jumpToHistory(index: number) {
    dispatch(jumpToHistory(index));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
