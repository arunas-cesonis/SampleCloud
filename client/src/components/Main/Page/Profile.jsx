import React, { Component } from 'react';
import ProfileRouter from './ProfileRouter.jsx';
import ProfileMenu from './ProfileMenu.jsx';
import ProfileSlider from './ProfileSlider.jsx';
import './profile.css';

class Profile extends Component {
  render() {
    return (
      <div>
        <ProfileSlider />
        <ProfileMenu />
        <div className='profile_main'>
          <ProfileRouter serverRes={this.props.serverRes} />
        </div>
      </div>
    );
  } 
}

export default Profile
