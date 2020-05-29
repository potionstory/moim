import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';
import Root from './Root';

const store = createStore(rootReducer, composeWithDevTools());

const StoreRoot = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

ReactDOM.render(<StoreRoot />, document.getElementById('root'));
