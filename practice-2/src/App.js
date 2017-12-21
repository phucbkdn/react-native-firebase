import React, { Component } from 'react';
import IndexPage from './components/page/Index/Index';
import Data from './components/common/Data';
import ModalUpdate from './components/page/update/Modal';
import { getProductByCategory, getCategory, deleteProduct } from './utils/HandleData';

class App extends Component {
  constructor(props) {
    super();
    const products = Data.products;
    this.state = {
      products: products
    }
  }

  handleClickAdd = (product) => {

  }

  handleClickUpdate = (product) => {

  }

  /**
   * Function using delete Product 
   */
  handleClickDelete = (id) => {
    const products = Data.products;
    const resultData = deleteProduct(products, id);
    this.setState({
      products: resultData
    });
  }

  /**
   * Function change Product list when select category
   */
  handleChangeItem = (id) => {
    const products = Data.products;
    const resultData = getProductByCategory(products, id);
    this.setState({
      products: resultData
    });
  }

  getCategory = (categoryId) => {
    const categorys = Data.category;
    let category = getCategory(categorys, categoryId);
    return category[0].name;
  }

  render() {
    const categorys = Data.category;
    return (
      <div className="App">
        <IndexPage handleClickAdd={this.handleClickAdd}
          categorys={categorys}
          getCategory={this.getCategory}
          changeItem={this.handleChangeItem}
          products={this.state.products}
          editItem={this.handleClickUpdate}
          deleteItem={this.handleClickDelete} />
        <ModalUpdate categorys={categorys} />
      </div>
    );
  }
}

export default App;
