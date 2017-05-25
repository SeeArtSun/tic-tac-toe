/*
 *  Store
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import App from './components/App';
import './index.css';

const store = createStore(reducer);
const appElement = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  appElement
);
