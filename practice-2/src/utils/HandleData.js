export const getProductByCategory = (products, id) => {
  return id === 'all' ? products : products.filter(product => product.categoryId === id);
};

export const getCategory = (categorys, id) => {
  const category = categorys.filter(category => category.categoryId === id);
  return category;
};

export const deleteProduct = (products, id) => {
  const result = products.filter(product => product.id !== id);
  return result
}