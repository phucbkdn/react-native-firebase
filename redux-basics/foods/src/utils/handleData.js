export const getFoodById = (foods, id) => {
  let food = foods.filter(food => food.id === parseFloat(id));
  return food[0];
}