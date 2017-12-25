import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input, { LabelError, WrapInput } from '../common/Input';
import Dropdown from '../common/DropDown';
import { Button } from '../common/Button';
import {
  PAGE_INDEX, LABEL_NAME, LABEL_PRICE, BUTTON_SUBMIT,
  BUTTON_CANCEL, BLANK, ALL, NAME_ERROR, PRICE_ERROR,
  CATEGORY_ERROR
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
      NameErr: BLANK,
      CategoryErr: BLANK,
      PriceErr: BLANK
    };
  };

  product = {
    id: this.props.product.id,
    name: this.props.product.name,
    categoryId: this.props.product.categoryId,
    price: this.props.product.price
  };

  handlesubmit = (e) => {
    e.preventDefault();
    let NameErr = BLANK, PriceErr = BLANK, CategoryErr = BLANK;
    this.product.name = this.name.value;
    this.product.price = this.price.value;

    if (this.product.name === BLANK) {
      NameErr = NAME_ERROR;
    }

    if (this.product.price === BLANK) {
      PriceErr = PRICE_ERROR;
    }

    if (this.product.categoryId === ALL) {
      CategoryErr = CATEGORY_ERROR;
    }

    this.setState({
      NameErr: NameErr,
      PriceErr: PriceErr,
      CategoryErr: CategoryErr
    });

    if (NameErr === BLANK && CategoryErr === BLANK && PriceErr === BLANK) {
      this.props.handleData(PAGE_INDEX, this.product);
    }

  }

  handleCancel = () => {
    this.props.forwardPage(PAGE_INDEX);
  }

  changeItem = (category) => {
    this.product.categoryId = category;
  }

  render() {
    return (
      <Modal className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{this.props.modalname}</h2>
          </div>
          <div className="modal-body">
            <form onSubmit={this.handlesubmit}>
              <Input label={LABEL_NAME}
                placeholder={LABEL_NAME}
                innerRef={name => this.name = name}
                type={'text'}
                labelError={this.state.NameErr}
                value={this.props.product.name} />
              <WrapInput>
                <label>Category</label>
                <Dropdown primary
                  data={this.props.categorys}
                  onChange={this.changeItem}
                  categoryId={this.props.product.categoryId} />
                <LabelError>{this.state.CategoryErr}</LabelError>
              </WrapInput>
              <Input label={LABEL_PRICE}
                placeholder={LABEL_PRICE}
                innerRef={price => this.price = price}
                type={'number'}
                value={this.props.product.price}
                labelError={this.state.PriceErr} />
              <Button bgcolor={'#4CAF50'}
                type={'submit'} >
                {BUTTON_SUBMIT}
              </Button>
              <Button bgcolor={'#008CBA'}
                onClick={this.handleCancel}
                type={'button'} >
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