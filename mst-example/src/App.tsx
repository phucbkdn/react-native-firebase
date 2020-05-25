import React from 'react';
import logo from './logo.svg';
import './App.css';
import { observer } from 'mobx-react'
import Todos, { AppProps } from './components/TodoView'

function App({ store }: AppProps) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Todos store={store} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default observer(App);
// export default inject('store')(observer (App));
