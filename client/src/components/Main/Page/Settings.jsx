import React, { Component } from 'react';
import PasswordChange from './PasswordChange';
import WallpaperUpload from './WallpaperUpload';
import AvatarUpload from './AvatarUpload';
import ParallaxImage from './ParallaxImage';
import Paper from '@material-ui/core/Paper';
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
            <div className='line'></div>
            <div style={{ height: '10px' }} ></div>
            <AvatarUpload
            />
            <div className='line'></div>
            <div style={{ height: '10px' }} ></div>
            <WallpaperUpload
            />
          </Paper>
        </div>
      </div>
    );
  } 
}

export default Settings
