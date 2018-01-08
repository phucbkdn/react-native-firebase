import {
  BLANK,
  ALL,
  NAME_ERROR,
  PRICE_ERROR,
  CATEGORY_ERROR,
} from './constants';
import data from './Data';

export const getProductByCategory = (products, id) => {
  return id === 'all' ? products :
    products.filter(product => product.categoryId === id);
};

export const getCategory = (id) => {
  const categorys = data.category;
  const category = categorys.filter(category => category.categoryId === id);
  return category[0];
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

export const addProduct = (products, product) => {
  return [...products, product];
}

export const checkRequired = (product) => {
  let nameErr = BLANK, priceErr = BLANK, categoryErr = BLANK;

  if (product.name === BLANK) {
    nameErr = NAME_ERROR;
  }

  if (product.price === BLANK) {
    priceErr = PRICE_ERROR;
  }

  if (product.categoryId === ALL) {
    categoryErr = CATEGORY_ERROR;
  }

  const productErr = {
    nameErr: nameErr,
    priceErr: priceErr,
    categoryErr: categoryErr
  };

  return productErr;
}
