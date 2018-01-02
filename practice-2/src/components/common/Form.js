import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input, { LabelError, WrapInput } from '../common/Input';
import Dropdown from '../common/DropDown';
import { Button } from '../common/Button';
import { checkRequired } from '../../utils/HandleData';
import {
  PAGE_INDEX, LABEL_NAME, LABEL_PRICE, BUTTON_SUBMIT,
  BUTTON_CANCEL, BLANK, LABEL_CATEGORY
} from '../../utils/constant';

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
      priceErr: BLANK
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
      this.props.handleData(PAGE_INDEX, this.props.product);
    }

  }

  handleCancel = () => {
    this.props.forwardPage(PAGE_INDEX);
  }

  changeItem = (category) => {
    this.props.product.categoryId = category;
  }

  handleInput = (e) => {
    this.props.product[e.target.name] = e.target.value;
  }

  render() {
    return (
      <Modal className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{this.props.modalname}</h2>
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
                <Dropdown
                  primary
                  data={this.props.categorys}
                  onChange={this.changeItem}
                  categoryId={this.props.product.categoryId}
                />
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
              <Button
                bgcolor={'#008CBA'}
                onClick={this.handleCancel}
                type={'button'}
              >
                {BUTTON_CANCEL}
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
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