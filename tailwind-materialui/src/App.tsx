import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ResponsiveDesign } from './tailwin-example/responsive-design'
function App() {
  return (
    <div className="App">
      <div className="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
        <div className="flex-shrink-0">
          <img className="h-12 w-12" src={logo} alt="logo" />
        </div>
        <div className="ml-6 pt-1">
          <h4 className="text-xl text-gray-900 leading-tight">ChatChat</h4>
          <p className="text-base text-gray-600 leading-normal">You have a new message!</p>
        </div>
      </div>
      <ResponsiveDesign />
    </div>
  );
}

export default App;
