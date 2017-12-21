import React, { Component } from 'react';
import IndexPage from './components/page/Index/Index';
import Data from './utils/Data';
import { getProductByCategory, getCategory, deleteProduct } from './utils/HandleData';

class App extends Component {
  constructor(props) {
    super();
    const products = Data.products;
    this.state = {
      products: products,
      page: 'index'
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

  getProduct = (product) => {
    this.setState({
      product: product
    });
  }

  render() {
    const categorys = Data.category;
    const page= this.setState.page;
    return (

      <div className="App">
        <IndexPage handleClickAdd={this.handleClickAdd}
          categorys={categorys}
          getCategory={this.getCategory}
          changeItem={this.handleChangeItem}
          products={this.state.products}
          editItem={this.getProduct}
          deleteItem={this.handleClickDelete} 
          product={this.state.product}/>
      </div>
    );
  }
}

export default App;
