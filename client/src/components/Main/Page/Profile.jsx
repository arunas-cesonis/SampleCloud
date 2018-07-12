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
          image='http://localhost:3000/img/slide4.jpeg'
        />
        <ProfileMenu />
        <div className='profile_main'>
          <ProfileRouter user={this.props.user} />
        </div>
      </div>
    );
  } 
}

export default Profile
