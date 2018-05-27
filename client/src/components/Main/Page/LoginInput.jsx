import React, { Component } from 'react';

class LoginInput extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }
  update(e) {
    this.props.update(e.target.value);
  }
  render() {
    const val = this.props.val;
    const type = this.props.type;
    const id = this.props.id;
    const label = this.props.label;
    const error = this.props.error;
    return (
      <div>
        <p className="error_msg">{error}</p>
        <label className="login_label" htmlFor={id}>
          {label}
        </label>
        <br />
        <input
          className="login_input"
          id={id}
          type={type}
          onChange={this.update}
          value={val}
        />
      </div>
    );
  }
}

export default LoginInput;
