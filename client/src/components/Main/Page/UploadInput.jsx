import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import './upload.css';

const styles = {
  textSize: {
    fontSize: '16px',
    lineHeight: '16px',
    width: '150px'
  }
}

class UploadInput extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update(e) {
      this.props.filename(e.target.value);
  }

  render() {
    const val = this.props.val;
    const valid = this.props.valid;
    const id = this.props.id;
    const label = this.props.label;

    return (
        <FormControl>
          <InputLabel 
            style={ styles.textSize }
            htmlFor={id}
          >{label}
          </InputLabel>
          <Input 
            id={id} 
            value={val} 
            onChange={this.update} 
            style={ styles.textSize }
            error={valid}
          />
        </FormControl>
    );
  }
}

export default UploadInput 
