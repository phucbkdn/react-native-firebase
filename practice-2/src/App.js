import React, { Component } from 'react';
import IndexPage from './components/page/Index/Index';
import Data from './utils/Data';
import { getProductByCategory, getCategory, deleteProduct, updateProduct, addProduct } from './utils/HandleData';
import ModalUpdate from './components/page/update/ModalUpdate';
import ModalAdd from './components/page/add/ModalAdd';
import { Constant } from './utils/constant';

class App extends Component {
  constructor() {
    super();
    const products = Data.products;
    this.state = {
      productList: products,
      products: products,
      page: Constant.PAGE_INDEX
    }
  }

  componentWillMount() {
    let state = JSON.parse(sessionStorage.getItem(Constant.KEY_SESSION));
    if (state) {
      this.setState({
        page: state.page,
        product: state.product
      });
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
      productList: resultData
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
      page: Constant.PAGE_UPDATE
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
    sessionStorage.setItem(Constant.KEY_SESSION, JSON.stringify(state));
  }

  render() {
    const categorys = Data.category;
    let page = this.state.page;
    let pageRendel;
    switch (page) {
      case Constant.PAGE_INDEX:
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
      case Constant.PAGE_UPDATE:
        pageRendel = <ModalUpdate categorys={categorys}
          product={this.state.product}
          forwardPage={this.forwardPage}
          handleData={this.handleClickUpdate} />
        break;
      case Constant.PAGE_ADD:
        pageRendel = <ModalAdd categorys={categorys}
          product={this.state.product}
          forwardPage={this.forwardPage}
          handleData={this.handleClickAdd} />
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
