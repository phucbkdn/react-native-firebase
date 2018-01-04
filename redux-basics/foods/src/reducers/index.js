import { combineReducers } from 'redux';
import foods from './foods-reducer';
import foodDetail from './food-detail';
import users from './user-reducer';
import user from './user-detail';


const foodsApp = combineReducers({
  foods: foods,
  food: foodDetail,
  users: users,
  user: user
});

export default foodsApp;