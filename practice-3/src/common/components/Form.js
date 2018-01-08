import React from 'react';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input, { LabelError, WrapInput } from './Input';
import DropdownContainer from '../containers/DropdowContainer';
import Button from './Button';
import { checkRequired } from '../../utils/HandleData';
import {
  LABEL_NAME, LABEL_PRICE, BUTTON_SUBMIT,
  BUTTON_CANCEL, BLANK, LABEL_CATEGORY
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
      nameErr: BLANK,
      categoryErr: BLANK,
      priceErr: BLANK,
      redirect: false
    };
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const productErr = checkRequired(this.props.product);

    this.setState({
      nameErr: productErr.nameErr,
      priceErr: productErr.priceErr,
      categoryErr: productErr.categoryErr
    });

    if (productErr.nameErr === BLANK && productErr.categoryErr === BLANK
      && productErr.priceErr === BLANK) {
      this.props.handleData(this.props.product);
      this.setState({
        redirect: true
      });
    }
  }

  changeItem = (category) => {
    this.props.product.categoryId = category;
  }

  handleInput = (e) => {
    this.props.product[e.target.name] = e.target.value;
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <Modal className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{this.props.modalName}</h2>
          </div>
          <div className="modal-body">
            <form onSubmit={this.handleSubmit}>
              <Input
                label={LABEL_NAME}
                placeholder={LABEL_NAME}
                textName={'name'}
                handleChange={this.handleInput}
                type={'text'}
                labelError={this.state.nameErr}
                value={this.props.product.name}
              />
              <WrapInput>
                <label>{LABEL_CATEGORY}</label>
                <DropdownContainer onchange={this.changeItem} />
                <LabelError>{this.state.categoryErr}</LabelError>
              </WrapInput>
              <Input
                label={LABEL_PRICE}
                placeholder={LABEL_PRICE}
                textName={'price'}
                handleChange={this.handleInput}
                type={'number'}
                value={this.props.product.price}
                labelError={this.state.priceErr}
              />
              <Button
                bgcolor={'#4CAF50'}
                type={'submit'}
              >
                {BUTTON_SUBMIT}
              </Button>
              <Link to="/" >
                <Button
                  bgcolor={'#008CBA'}
                  type={'button'}
                >
                  {BUTTON_CANCEL}
                </Button>
              </Link>
            </form>
          </div>
        </div>
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