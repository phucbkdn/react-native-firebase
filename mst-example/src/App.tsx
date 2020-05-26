import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todos from './components/TodoView'
import { Provider, rootStore } from './models'

function App() {
  return (
    <Provider value={rootStore}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Todos />
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
    </Provider>
  );
}

export default App;
// export default inject('store')(observer (App));
