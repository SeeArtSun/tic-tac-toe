import { inject, observer } from 'mobx-react';
import GameStore from '../game/GameStore';
import Game from '../game/Game';

export default inject((store: GameStore) => ({
  game: store.currentGame,
}))(observer(Game));
