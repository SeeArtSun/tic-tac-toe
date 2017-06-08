/*
 *  Store
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import Game from './containers/Game';
import GameStore from './game/GameStore';
import App from './game/App';

const stores = {
  gameStore: new GameStore(),
}

const appElement = document.getElementById('app');

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  appElement
);
