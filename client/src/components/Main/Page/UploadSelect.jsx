import React, { Component } from 'react';

class UploadSelect extends Component {
  constructor(props){
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(e) {
    this.props.update(e.target.value); 
  }
  render() {
    return (
      <select onChange={this.handleSelect}>
        <option value=''>Category</option>
        {this.props.categories.map((item, i) =>
          <option value={item} key={i}>{item}</option>
        )}
      </select>
    );
  }
}

export default UploadSelect;
