import React from 'react';
import FoodContainer from '../containers/FoodContainer';

const Home = () => {
  return (
    <div>
      <h2>List of foods:</h2>
      <FoodContainer />
      <hr />
      <h2>Food detail:</h2>
    </div>
  );
}

export default Home;