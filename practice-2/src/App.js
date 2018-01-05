import React, { Component } from 'react';
import IndexPage from './components/page/Index/Index';
import Data from './utils/Data';
import { getProductByCategory, getCategory, deleteProduct, updateProduct, addProduct } from './utils/HandleData';
import ModalUpdate from './components/page/update/ModalUpdate';
import ModalAdd from './components/page/add/ModalAdd';
import { PAGE_INDEX, KEY_SESSION, PAGE_UPDATE, PAGE_ADD } from './utils/constant';

class App extends Component {
  constructor() {
    super();
    let state = JSON.parse(sessionStorage.getItem(KEY_SESSION));
    let page = PAGE_INDEX, product = [];
    if (state) {
      page = state.page;
      product = state.product
    }

    this.state = {
      page: page,
      product: product
    }

  }

  componentDidMount() {
    const products = Data.products;
    this.setState({
      productList: products
    });
  }

  /**
   * Function using add Product
   */
  handleClickAdd = (page, product) => {
    let products = this.state.productList;
    products = addProduct(products, product);
    this.setState({
      productList: products,
      page: page
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
      page: page
    });
  }

  /**
   * Function using delete Product 
   */
  handleClickDelete = (id) => {
    const productList = this.state.productList;
    const resultProductsList = deleteProduct(productList, id);
    this.setState({
      productList: resultProductsList
    });
  }

  /**
   * Function change Product list when select category
   */
  handleChangeItem = (id) => {
    const resultData = getProductByCategory(id);
    this.setState({
      productList: resultData
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
      page: PAGE_UPDATE
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

  /**
   * Function using save page when refresh page
   */
  savePage = () => {
    let state = {
      product: this.state.product,
      page: this.state.page
    }
    sessionStorage.setItem(KEY_SESSION, JSON.stringify(state));
  }

  render() {
    const categorys = Data.category;
    let page = this.state.page;
    let pageRendel;
    switch (page) {
      case PAGE_INDEX:
        pageRendel =
          <IndexPage handleClickAdd={this.forwardPage}
            categorys={categorys}
            getCategory={this.getCategory}
            changeItem={this.handleChangeItem}
            products={this.state.productList}
            editItem={this.getProduct}
            deleteItem={this.handleClickDelete}
          />
        break;
      case PAGE_UPDATE:
        pageRendel =
          <ModalUpdate categorys={categorys}
            product={this.state.product}
            forwardPage={this.forwardPage}
            handleData={this.handleClickUpdate}
          />
        break;
      case PAGE_ADD:
        pageRendel =
          <ModalAdd categorys={categorys}
            product={this.state.product}
            forwardPage={this.forwardPage}
            handleData={this.handleClickAdd}
          />
        break;
      default:
        break;
    }
    return (
      <div className="App">
        {pageRendel}
        {this.savePage()}
      </div>
    );
  }
}

export default App;