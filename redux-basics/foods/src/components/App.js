import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home';
import About from './About';
import User from './User';
import FoodDetail from '../containers/FoodDetail';

const Ul = styled.ul`
  display: flex;
  list-style-type: none;
  font-size: 18px;
`;

const Li = styled.li`
  padding: 0 20px;
`;

const StyledLink = styled(Link)`
  color: palevioletred;
  display: block;
  margin: 0.5em 0;
  font-family: Helvetica, Arial, sans-serif;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
  &.active {
    color: red;
  }
`;

const App = () => {
  return (
    <Router>
      <div>
        <Ul>
          <Li>
            <StyledLink to="/">Home</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/user">User</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/about">About</StyledLink>
          </Li>
        </Ul>
        <Route exact path="/" component={Home} />
        <Route path="/user" component={User} />
        <Route path="/about" component={About} />
        <Route path="/detail/:food" component={FoodDetail} />
      </div>
    </Router>
  );
}

export default App;