import {
  BLANK,
  ALL,
  NAME_ERROR,
  PRICE_ERROR,
  CATEGORY_ERROR,
} from './constants';
import data from './data';

export const getProductByCategory = (products, id) => {
  return id === 'all' ? products :
    products.filter(product => product.categoryId === id);
};

export const getCategory = (id) => {
  const categorys = data.category;
  const category = categorys.filter(category => category.categoryId === id);
  return category[0];
};

export const checkRequired = (product) => {
  let nameErr = BLANK, priceErr = BLANK, categoryErr = BLANK;
  let status = false;

  if (product.name === BLANK) {
    nameErr = NAME_ERROR;
  }

  if (!product.price) {
    priceErr = PRICE_ERROR;
  }

  if (product.categoryId === ALL) {
    categoryErr = CATEGORY_ERROR;
  }

  if (nameErr === BLANK && categoryErr === BLANK
    && priceErr === BLANK) {
    status = true;
  }

  const productErr = {
    nameErr: nameErr,
    priceErr: priceErr,
    categoryErr: categoryErr
  };

  return { productErr, status };
}
