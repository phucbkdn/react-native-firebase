export const getProductByCategory = (products, id) => {
  return id === 'all' ? products :
    products.filter(product => product.categoryId === id);
};

export const getCategory = (categorys, id) => {
  const category = categorys.filter(category => category.categoryId === id);
  return category;
};

export const deleteProduct = (products, id) => {
  const result = products.filter(product => product.id !== id);
  return result
}

export const updateProduct = (products, product) => {
  let index;
  for (let i = 0; i <= products.length; i++) {
    if (products[i].id === product.id) {
      index = i;
      break;
    }
  }
  if (index >= 0) {
    products[index] = product;
  }
  return products;
}

export const getId = () => {
  return Math.random().toString(36).substr(2, 9);
}

export const addProduct = (products, product) => {
  return [...products, product];
}