import { connect } from 'react-redux';

import { addSymbol } from '../actions';
import Game from '../components/Game';

const mapStateToProps = (state) => ({
  history: state.history,
  stepNumber: state.stepNumber,
  xIsNext: state.xIsNext,
  winner: state.winner,
});

const mapDispatchToProps = (dispatch) => ({
  addSymbol(index) {
    dispatch(addSymbol(index));
  }
  // ,
  // jumpTo()
});


  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     xIsNext: (step % 2) ? false : true,
  //   });
  // }

export default connect(mapStateToProps, mapDispatchToProps)(Game);
