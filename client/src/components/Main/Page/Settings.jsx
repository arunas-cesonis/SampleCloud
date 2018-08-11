import React, { Component } from 'react';
import PasswordChange from './PasswordChange';
import ParallaxImage from './ParallaxImage';
import Paper from '@material-ui/core/Paper';
import FileUpload from './FileUpload';
import './settings.css';

class Settings extends Component {
  render() {
    return (
      <div className='settings_wrap'>
        <ParallaxImage 
          image='/img/slide4.jpeg'
        />
        <div style={{ height: '10px' }} ></div>
        <div className='settings_cont'>
          <Paper>
            <div className='settings_title'>Settings Page</div>
            <div style={{ height: '10px' }} ></div>
            <PasswordChange
              user={this.props.user}
            />
            <div style={{ height: '10px' }} ></div>
            <FileUpload
              user={this.props.user}
              maxSize='1200000'
              id='avatar'
              postTo='/api/profile/avatar'
              name='Avatar'
              recSize='Width 200px, Height 220px'
            />
            <div style={{ height: '10px' }} ></div>
            <FileUpload
              user={this.props.user}
              maxSize='5200000'
              id='wallpaper'
              postTo='/api/profile/wallpaper'
              name='Wallpaper'
              recSize='Width 1920px'
            />
          </Paper>
        </div>
      </div>
    );
  } 
}

export default Settings
