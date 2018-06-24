import React, { Component } from 'react';
import axios from 'axios';
import FileInput from './UploadFileInput.jsx';

const styles = {
  btnWidth: {
    width: '99px',
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
      }
    }
    this.handleAvatarFile = this.handleAvatarFile.bind(this);
    this.handleAvatarUpload = this.handleAvatarUpload.bind(this);
  }

  handleAvatarUpload(e) {
    e.preventDefault();
    const data = new FormData();
    const file = this.state.uploadData.file;
    if(file) {
      data.append('file', file);
      data.append('username', this.props.user.username);
      axios.post('http://localhost:3010/api/profile/avatar', data).then(res => {
        
      }); 
    } else {
        console.log('Error uploading file.');
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
      console.log('Error, this file type is not allowed.');
    } 
  }

  render() {
    if(this.props.showAvatar){
      return (
        <form autoComplete='off'>
          <FileInput
            id='avatar'
            label='Avatar File:'
            upload={this.handleAvatarFile}
            value='value'
            width='200px'
          />
          <div className='pwd_buttons_cont' >
            <div
              className='upload_btn'
              style={ styles.btnWidth }
              onClick={this.handleAvatarUpload}
            >Submit</div>
            <div
              className='upload_btn'
              style={ styles.btnWidth }
              onClick={this.props.avatarClose}
            >Cancel</div>
          </div>
        </form>
      );
    } else {
      return null;
    }
  }
}

export default AvatarUpload;
