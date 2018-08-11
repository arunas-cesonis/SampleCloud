import React, { Component, Fragment } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import FileInput from './UploadFileInput.jsx';

class WallpaperUpload extends Component {
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
    this.handleWallpaperFile = this.handleWallpaperFile.bind(this);
    this.handleWallpaperUpload = this.handleWallpaperUpload.bind(this);
  }

  handleWallpaperUpload(e) {
    e.preventDefault();
    const data = new FormData();
    const file = this.state.uploadData.file;
    if(file && file.size < 5200000 && !this.state.success) {
      data.append('file', file);
      data.append('username', this.props.user.username);
      data.append('email', this.props.user.email);
      axios.post('/api/profile/wallpaper', data).then(res => {
        if(res.data.done) {
          this.setState({ 
            notifyMsg: 'Wallpaper has been successfully uploaded.',
            success: true
          });
        } else {
          this.setState({ errorMsg: 'File upload has failed!' });
        }
      }); 
    } else {
      this.setState({ errorMsg: 'Error uploading file. File must be below 5Mb.' });
    }
  }

  handleWallpaperFile(file){
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
        <div className='wallpaper_wrap'>
          <div className='settings_section_title'>Wallpaper:</div>
          <div className='line'></div>
          <p className='settings_dialog_box'>Recomended size: Width 1920px. Accepted file types/extensions jpg, png, jpeg. </p>
          <p
            style={{
              color: 'red',
              fontSize: '10px',
              padding: '4px',
              textAlign: 'center'
            }}
          >{this.state.errorMsg}</p>
          <p
            style={{
              color: '#6aabb7',
              fontSize: '10px',
              padding: '4px',
              textAlign: 'center'
            }}
          >{this.state.notifyMsg}</p>
          <form autoComplete='off' className='wallpaper_cont'>
            <FileInput 
              id='Wallpaper'
              label='Wallpaper File:'
              upload={this.handleWallpaperFile}
              value='value'
              width='200px'
            />
            <div className='settings_btn_cont' >
              <div
                className={classNames('settings_btn', { disabled: this.state.success })}
                onClick={this.handleWallpaperUpload}
              >Submit</div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default WallpaperUpload;
