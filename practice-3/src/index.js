import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import productReducer from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import {RouterApp} from './router';
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
middleware.push(createLogger());
let store = createStore(
  productReducer,
  composeEnhancers(
  applyMiddleware(...middleware))
);
ReactDOM.render(
  <Provider store={store} >
    <Router >
      <RouterApp />
    </Router>
  </Provider>
  , document.getElementById('root'));
