import React, { Component } from 'react';
import classNames from 'classnames';
import './upload.css';

class UploadInput extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update(e) {
    if (this.props.type === 'file') {
      this.props.upload(e.target.files[0]);
    } else {
      this.props.filename(e.target.value);
    }
  }

  render() {
    const type = this.props.type;
    const val = this.props.val;
    const valid = this.props.valid;
    const addClass = this.props.addClass;
    const id = this.props.id;
    const label = this.props.label;
    return (
      <div>
        <label className="uploadLabel" htmlFor={id}>
          {label}
        </label>
        <br />
        <input
          id={id}
          type={type}
          name={type}
          onChange={this.update}
          value={val}
          className={classNames({ uploadInput: addClass }, { invalid: valid })}
        />
      </div>
    );
  }
}

export default UploadInput;
