import React from 'react';
import styles from 'styled-components';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import Dropdown from '../common/DropDown';
import { Button } from '../common/Button';
import { Constant } from '../../utils/constant';

const Modal = styles.div`
  padding-top: 10%;
  width: 50%;
  margin: 0 auto;
`;

const Form = (props) => {

  let product = {
    id: props.product.id,
    name: props.product.name,
    categoryId: props.product.categoryId,
    price: props.product.price
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    product.name = this.name.value;
    product.price = this.price.value;
    props.handleData(Constant.PAGE_INDEX, product);
  }

  const handleCancel = () => {
    props.forwardPage(Constant.PAGE_INDEX);
  }

  const changeItem = (category) => {
    product.categoryId = category;
  }

  return (
    <Modal className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{props.modalname}</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={handlesubmit}>
            <Input label={Constant.LABEL_NAME}
              placeholder={Constant.LABEL_NAME}
              innerRef={name => this.name = name}
              type="text"
              value={props.product.name}
            />
            <div>
              <label>Category</label>
              <Dropdown primary data={props.categorys} onChange={changeItem} categoryId={props.product.categoryId} />
            </div>
            <Input label={Constant.LABEL_PRICE}
              placeholder={Constant.LABEL_PRICE}
              innerRef={price => this.price = price}
              type="number"
              value={props.product.price}
            />
            <Button bgcolor={'#4CAF50'} type="submit" >Submit</Button>
            <Button bgcolor={'#008CBA'} onClick={handleCancel} type="button">Cancel</Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

Form.propTypes = {
  modalname: PropTypes.string,
  categorys: PropTypes.array,
  product: PropTypes.object,
  forwardPage: PropTypes.func,
  handleData: PropTypes.func
}

Form.defaultProps = {
  modalname: "Add Product",
  categorys: [],
  product: {},
  forwardPage() { },
  handleData() { }
};

export default Form;