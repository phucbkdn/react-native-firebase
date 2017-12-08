import React from 'react';
import { Button } from './Button';
import { Constant } from '../constants/constants';
import '../styles/style.css';

class Counter extends React.Component {
  constructor(props) {
    super();
    this.state = {
      counter: 0
    };
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleIncrement() {
    this.setState((prevState) => ({
      counter: prevState.counter + 1
    }));
  }

  handleDecrement() {
    this.setState((prevState) => ({
      counter: prevState.counter - 1
    }));
  }

  render() {
    return (
      <div className={Constant.CONTAINER}>
        <h1 className={Constant.COUNTER}>
          {this.state.counter}
        </h1>
        <Button
          className={Constant.BTN_DECREMENT}
          btnName={Constant.DECREMENT}
          handleClick={this.handleDecrement}
        />
        <Button
          className={Constant.BTN_INCREMENT}
          btnName={Constant.INCREMENT}
          handleClick={this.handleIncrement}
        />
      </div>
    );
  }
}

export default Counter;