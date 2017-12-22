import React, { Component } from 'react';
import IndexPage from './components/page/Index/Index';
import Data from './utils/Data';
import { getProductByCategory, getCategory, deleteProduct, updateProduct, addProduct } from './utils/HandleData';
import ModalUpdate from './components/page/update/ModalUpdate';
import ModalAdd from './components/page/update/ModalAdd';

class App extends Component {
  constructor(props) {
    super();
    const products = Data.products;
    this.state = {
      productList: products,
      products: products,
      page: 'index'
    }
  }

  /**
   * Function using add Product
   */
  handleClickAdd = (page, product) => {
    let products = this.state.products;
    products = addProduct(products, product);
    this.setState({
      productList: products,
      page: page,
      products: products
    });
  }

  /**
   * Function using update Product
   */
  handleClickUpdate = (page, product) => {
    let products = this.state.productList;
    products = updateProduct(products, product);
    this.setState({
      productList: products,
      page: page,
      products: products
    });
  }

  /**
   * Function using delete Product 
   */
  handleClickDelete = (id) => {
    const products = this.state.productList;
    const resultData = deleteProduct(products, id);
    this.setState({
      products: resultData,
      productList: products
    });
  }

  /**
   * Function change Product list when select category
   */
  handleChangeItem = (id) => {
    const products = this.state.productList;
    const resultData = getProductByCategory(products, id);
    this.setState({
      products: resultData
    });
  }

  /**
  * Function get category name by categoryId
  * @param {String} categoryId 
  * @returns {String} categoryName
  */
  getCategory = (categoryId) => {
    const categorys = Data.category;
    let category = getCategory(categorys, categoryId);
    return category[0].name;
  }

  /**
   * Function get Product when click update
   */
  getProduct = (product) => {
    this.setState({
      product: product,
      page: 'update'
    });
  }

  /**
   * Function get page forward
   */
  forwardPage = (page) => {
    this.setState({
      page: page
    });
  }

  render() {
    const categorys = Data.category;
    let page = this.state.page;
    let pageRendel;
    switch (page) {
      case 'index':
        pageRendel =
          <IndexPage handleClickAdd={this.forwardPage}
            categorys={categorys}
            getCategory={this.getCategory}
            changeItem={this.handleChangeItem}
            products={this.state.products}
            editItem={this.getProduct}
            deleteItem={this.handleClickDelete}
          />
        break;
      case 'update':
        pageRendel = <ModalUpdate categorys={categorys}
          modalId="myModal1"
          product={this.state.product}
          forwardPage={this.handleClickUpdate} />
        break;
      case 'add':
        pageRendel = <ModalAdd categorys={categorys}
          modalId="myModal"
          product={this.state.product}
          forwardPage={this.handleClickAdd} />
        break;  
      default:
        break;
    }
    return (
      <div className="App">
        {pageRendel}
      </div>
    );
  }
}

export default App;
