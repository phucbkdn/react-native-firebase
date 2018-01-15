import { Route } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/home/components/HomePage';
import InsertPage from './pages/insert/containers/InsertContainer';
import UpdatePage from './pages/update/containers/updateContainer';
export const RouterApp = () => {
  return (
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/add" component={InsertPage} />
      <Route path="/edit/:id" component={UpdatePage} />
    </div>
  );
}