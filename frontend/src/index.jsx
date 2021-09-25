import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './store/module';
import rootSaga from './store/saga';
import { KakaoInitialize } from './server/kakao.util';
import Root from './Root';

const customHistory = createBrowserHistory({
  forceRefresh: true,
});
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
);

sagaMiddleware.run(rootSaga);

KakaoInitialize();

const StoreRoot = () => (
  <Router history={customHistory}>
    <Provider store={store}>
      <Root />
    </Provider>
  </Router>
);

ReactDOM.render(<StoreRoot />, document.getElementById('root'));
