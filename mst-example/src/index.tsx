import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'mobx-react'
// debugging tool
import  { onPatch } from 'mobx-state-tree'
//import makeInspectable from 'mobx-devtools-mst'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import appStore from './models/index'

onPatch(appStore, patch => {
  console.log(patch)
})

// makeInspectable(appStore)

ReactDOM.render(
  <React.StrictMode>
    <App store={appStore} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
