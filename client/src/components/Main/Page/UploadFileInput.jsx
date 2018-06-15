import React, { Component } from 'react';

class UploadFileInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'Browse...'
    };
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(e){
    this.props.upload(e.target.files[0]);
    console.log(e.target.files[0].name);
    this.setState({ name: e.target.files[0].name });
  }

  render() {
    const val = this.props.val;
    const id = this.props.id;
    const label = this.props.label;
    const name = this.state.name;

    return (
      <div>
        <label htmlFor={id} class='upload_file_btn'>
          <div className='upload_icon'></div><div className='upload_file_name'>{name}</div>
        </label>
        <input
          type='file'
          id={id}
          onChange={this.handleFile}
          value={val}
        />
      </div>
    );
  }
}

export default UploadFileInput
