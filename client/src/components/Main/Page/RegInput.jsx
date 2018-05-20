import React, { Component } from 'react';
import classNames from 'classnames';
import '../css/register.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.displayLabel = this.displayLabel.bind(this);
  }
  handleCheck(e) {
    this.props.check(e.target.value);
  }
  displayLabel(error, label) {
    if (!error) {
      return label;
    } else {
      return error;
    }
  }
  render() {
    const val = this.props.val;
    const notValid = this.props.notValid;
    const type = this.props.type;
    const error = this.props.error;
    const id = this.props.id;
    const label = this.props.label;
    return (
      <div>
        <label
          className={classNames('regLabel', { error: error })}
          htmlFor={id}
        >
          {this.displayLabel(error, label)}
        </label>
        <br />
        <input
          id={id}
          type={type}
          className={classNames('registerInput', { invalid: notValid })}
          onChange={this.handleCheck}
          value={val}
        />
      </div>
    );
  }
}

export default Input;
