import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import productReducer from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouterApp } from './router';

const middleware = [];
let composeEnhancers = compose;
if (process.env.NODE_ENV === `development`) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  middleware.push(createLogger({
    collapsed: (getState, action) => action.type === 'DEL_PRODUCT'
  }));
}

let store = createStore(
  productReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store} >
    <Router >
      <RouterApp />
    </Router>
  </Provider>
  , document.getElementById('root'));
