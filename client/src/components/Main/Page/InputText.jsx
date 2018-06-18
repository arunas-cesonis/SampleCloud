import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import './upload.css';

const styles = theme => ({
  root: {
    fontSize: '16px',
    lineHeight: '16px',
  }
})

class UploadInput extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update(e) {
      this.props.update(e.target.value);
  }

  render() {
    const val = this.props.value;
    const valid = this.props.valid;
    const id = this.props.id;
    const label = this.props.label;
    const classes = this.props.classes;

    return (
      <FormControl>
          <InputLabel 
            classes={{
              root: classes.root 
            }}
            htmlFor={id}
          >{label}
          </InputLabel>
          <Input 
            classes={{
              root: classes.root 
            }}
            id={id} 
            value={val} 
            onChange={this.update} 
            error={valid}
          />
        </FormControl>
    );
  }
}

export default withStyles(styles)(UploadInput)
