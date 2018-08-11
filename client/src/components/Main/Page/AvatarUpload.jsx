import React, { Component, Fragment } from 'react';
import axios from 'axios';
import FileInput from './UploadFileInput.jsx';

const styles = {
  btnWidth: {
    width: '110px',
    marginTop: '2px'
  }
}

class AvatarUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      uploadData: {
        file: '',
        fileName: ''
      },
      errorMsg: ''
    }
    this.handleAvatarFile = this.handleAvatarFile.bind(this);
    this.handleAvatarUpload = this.handleAvatarUpload.bind(this);
  }

  handleAvatarUpload(e) {
    e.preventDefault();
    const data = new FormData();
    const file = this.state.uploadData.file;
    if(file && file.size < 1000000) {
      data.append('file', file);
      data.append('username', this.props.user.username);
      data.append('email', this.props.user.email);
      axios.post('/api/profile/avatar', data).then(res => {
        //Notify on success or failure
      }); 
    } else {
      this.setState({ errorMsg: 'Error uploading file. File must be below 1Mb.' });
    }
  }

  handleAvatarFile(file){
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
        <div className='avatar_wrap'>
          <div className='settings_section_title'>Avatar:</div>
          <p
            style={{
              color: 'red',
              fontSize: '10px',
              padding: '4px',
              textAlign: 'center'
            }}
          >{this.state.errorMsg}</p>
          <form autoComplete='off' className='avatar_cont'>
            <FileInput 
              id='avatar'
              label='Avatar File:'
              upload={this.handleAvatarFile}
              value='value'
            />
            <div className='settings_btn_cont' >
              <div
                className='settings_btn'
                style={ styles.btnWidth }
                onClick={this.handleAvatarUpload}
              >Submit</div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default AvatarUpload;
