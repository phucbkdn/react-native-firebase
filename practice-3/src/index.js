import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import productReducer from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import {RouterApp} from './router';
const middleware = [thunk];
middleware.push(createLogger());
let store = createStore(
  productReducer,
  applyMiddleware(...middleware)
);
ReactDOM.render(
  <Provider store={store} >
    <Router>
      <RouterApp />
    </Router>
  </Provider>
  , document.getElementById('root'));
