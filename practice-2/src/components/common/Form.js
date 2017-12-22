import React from 'react';
import styles from 'styled-components';
import Input from '../common/Input';
import Dropdown from '../common/DropDown';
import { Button } from '../common/Button';

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
    props.forwardPage('index', product);
  }

  const handleCancel = () => {
    props.forwardPage('index', product);
  }

  const changeItem = (category) => {
    product.categoryId = category;
  }

  return (
    <Modal className="modal" id={props.modalId}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{props.modalname}</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={handlesubmit}>
            <Input label="Name"
              placeholder="Name"
              innerRef={name => this.name = name}
              value={props.product.name}
            />
            <div>
              <label>Category</label>
              <Dropdown primary data={props.categorys} onChange={changeItem} categoryId={props.product.categoryId}/>
            </div>
            <Input label="Price"
              placeholder="Price"
              innerRef={price => this.price = price}
              value={props.product.price}
            />
            <Button bgcolor={'#4CAF50'} type="submit" >Submit</Button>
            <Button bgcolor={'#008CBA'} onClick={handleCancel}>Cancel</Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Form;