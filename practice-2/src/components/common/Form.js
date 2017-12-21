import React from 'react';
import styles from 'styled-components';
import Input from '../common/Input';
import Dropdown from '../common/DropDown';
import { Button } from '../common/Button';

const Modal = styles.div `
  padding-top: 10%;
  width: 80%;
  margin: 0 auto;
`;

const Form = (props) => {
  const handlesubmit = (e) => {
    e.preventDefault(); 
    console.log(props.product.name);
  }
  
  const handleCancel = (e) => {

  }

  const changeItem = (e) => {

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
                   value={"props.product.name" } 
                   />
            <div>
              <label>Category</label>
              <Dropdown primary data={props.categorys} onChange={changeItem}/>
            </div>
            <Input label="Price" 
                   placeholder="Price"
                   innerRef={price => this.price = price}
                   value={props.product.price } 
                   />
            <Button  bgcolor={'#4CAF50'} type="submit" >Submit</Button>
            <Button data-dismiss="modal" bgcolor={'#008CBA'}>Cancel</Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Form;