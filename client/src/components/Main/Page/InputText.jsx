import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'; 
import './upload.css';

const styles = theme => ({
  root: {
    fontSize: '16px',
    lineHeight: '16px',
  }
})

class InputText extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update(e) {
      this.props.update(e.target.value);
  }

  render() {
    const val = this.props.value;
    const type = this.props.type;
    const valid = this.props.valid;
    const id = this.props.id;
    const label = this.props.label;
    const classes = this.props.classes;
    const w = { width: this.props.width ? this.props.width : '150px' }

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
            style={w}
            type={type}
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

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default withStyles(styles)(InputText)
