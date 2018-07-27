import React, { Component } from 'react';
import ProfileRouter from './ProfileRouter.jsx';
import ProfileMenu from './ProfileMenu.jsx';
import ParallaxImage from './ParallaxImage.jsx';
import './profile.css';

class Profile extends Component {
  render() {
    return (
      <div>
        <ParallaxImage 
          image='/img/slide4.jpeg'
        />
        <div className='profile_main'>
          <ProfileRouter user={this.props.user} />
        </div>
      </div>
    );
  } 
}

export default Profile
