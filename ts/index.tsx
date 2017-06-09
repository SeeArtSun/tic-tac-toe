import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './game/App';
import GameStore from './game/GameStore';

interface IStores {
  gameStore: GameStore,
}

const stores: IStores = {
  gameStore: new GameStore(),
}

const appElement = document.getElementById('app');

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  appElement
);

export { IStores }
