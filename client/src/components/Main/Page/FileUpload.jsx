import React, { Component, Fragment } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import FileInput from './UploadFileInput.jsx';

class FileUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      uploadData: {
        file: '',
        fileName: ''
      },
      errorMsg: '',
      notifyMsg: '',
      success: false
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(e) {
    e.preventDefault();
    const data = new FormData();
    const file = this.state.uploadData.file;
    if(file && file.size < this.props.maxSize) {
      data.append('file', file);
      data.append('username', this.props.user.username);
      data.append('email', this.props.user.email);
      axios.post(this.props.postTo, data).then(res => {
        if(res.data.done) {
          this.setState({
            notifyMsg: this.props.name + ' has been successfully uploaded.',
            success: true
          });
        } else {
          this.setState({ errorMsg: 'Error uploading file.' });
        }
      }); 
    } else {
      this.setState({ errorMsg: 'Error uploading file. File must be below 1Mb.' });
    }
  }

  handleFile(file){
    const uploadData = Object.assign({}, this.state.uploadData);
    const types = ['image/jpg', 'image/jpeg', 'image/png'];

    uploadData.file = file;
    console.log('Type: ', uploadData.file.type);
    if(types.indexOf(uploadData.file.type) > -1){
      this.setState({ uploadData: uploadData });
    } else {
      this.setState({ errorMsg: 'Error, this file type is not allowed.' });
    } 
  }

  render() {
    return (
      <Fragment>
        <div className='fileupload_wrap'>
          <div className='settings_section_title'>{this.props.name}:</div>
          <div className='line'></div>
          <p className='settings_dialog_box'>Recomended size: {this.props.recSize}. Accepted file types/extensions jpg, png, jpeg. </p>
          <p
            style={{
              color: '#6aabb7',
              fontSize: '10px',
              padding: '4px',
              textAlign: 'center'
            }}
          >{this.state.notifyMsg}</p>
          <p
            style={{
              color: 'red',
              fontSize: '10px',
              padding: '4px',
              textAlign: 'center'
            }}
          >{this.state.errorMsg}</p>
          <form autoComplete='off' className='fileupload_cont'>
            <FileInput 
              id={this.props.id}
              label='Avatar File:'
              upload={this.handleFile}
              value='value'
            />
            <div className='settings_btn_cont' >
              <div
                className={classNames('settings_btn', { disabled: this.state.success })}
                onClick={this.handleFileUpload}
              >Submit</div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default FileUpload;
