import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Index/components/Table';
import { Button } from '../../common/Button';
import Dropdown from '../../common/DropDown';
import { Constant } from '../../../utils/constant';

const IndexPage = (props) => {
  const handleAdd = (e) => {
    e.preventDefault();
    props.handleClickAdd(Constant.PAGE_ADD);
  }
  return (
    <div>
      <Button onClick={handleAdd}
        bgcolor={'#008CBA'}>
        {Constant.LABEL_NEW_PRODUCT}
      </Button>
      <Dropdown data={props.categorys}
        onChange={props.changeItem} />
      <Table products={props.products}
        getCategory={props.getCategory}
        handleEdit={props.editItem}
        handleDelete={props.deleteItem} />
    </div>
  );
};


IndexPage.propTypes = {
  getCategory: PropTypes.func,
  categorys: PropTypes.array,
  products: PropTypes.array,
  changeItem: PropTypes.func,
  handleClickAdd: PropTypes.func,
  editItem: PropTypes.func,
  deleteItem: PropTypes.func
}

IndexPage.defaultProps = {
  getCategory() { },
  categorys: [],
  products: [],
  changeItem() { },
  handleClickAdd() { },
  editItem() { },
  deleteItem() { }
};

export default IndexPage;