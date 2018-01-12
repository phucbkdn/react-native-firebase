import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input, { WrapInput } from './Input';
import Label from './Label';
import DropdownContainer from '../containers/DropdowContainer';
import Button from './Button';
import { checkRequired } from '../../utils/HandleData';
import {
  LABEL_NAME, LABEL_PRICE, BUTTON_SUBMIT,
  BUTTON_CANCEL, LABEL_CATEGORY
} from '../../utils/constants';

const Modal = styled.div`
  padding-top: 10%;
  width: 700px;
  margin: 0 auto;
`;

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productErr: {},
      id: this.props.product.id,
      name: this.props.product.name,
      categoryId: this.props.product.categoryId,
      price: this.props.product.price,
    };
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let product = {
      id: this.state.id,
      name: this.state.name,
      categoryId: this.state.categoryId,
      price: this.state.price
    }
    const checkResult = checkRequired(product);

    this.setState({
      productErr: checkResult.productErr
    });

    if (checkResult.status) {
      this.props.handleData(product);
      this.props.history.push('/')
    }
  }

  changeItem = (category) => {
    this.setState({
      categoryId: category
    });
  }

  handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Modal>
        <h2>{this.props.modalName}</h2>
        <form onSubmit={this.handleSubmit}>
          <Input
            label={LABEL_NAME}
            placeholder={LABEL_NAME}
            textName={'name'}
            handleChange={this.handleInput}
            type={'text'}
            labelError={this.state.productErr.nameErr}
            value={this.props.product.name}
          />
          <WrapInput>
            <Label name={LABEL_CATEGORY} />
            <DropdownContainer
              categoryId={this.props.product.categoryId}
              onchange={this.changeItem}
            />
            <Label name={this.state.productErr.categoryErr} err />
          </WrapInput>
          <Input
            label={LABEL_PRICE}
            placeholder={LABEL_PRICE}
            textName={'price'}
            handleChange={this.handleInput}
            type={'number'}
            value={this.props.product.price}
            labelError={this.state.productErr.priceErr}
          />
          <Button
            bgcolor={'#4CAF50'}
            type={'submit'}
            btnName={BUTTON_SUBMIT}
          />
          <Button
            btnName={BUTTON_CANCEL}
            btnClick={() => this.props.history.go(-1)}
          />
        </form>
      </Modal>
    );
  }
};

Form.propTypes = {
  modalName: PropTypes.string,
  product: PropTypes.object,
  handleData: PropTypes.func
}

Form.defaultProps = {
  modalName: "Add Product",
  product: {},
  handleData: () => { }
};

export default Form;
