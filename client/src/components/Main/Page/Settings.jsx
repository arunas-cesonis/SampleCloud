import React, { Component } from 'react';
import ParallaxImage from './ParallaxImage.jsx';
import './profile.css';

class Settings extends Component {
  render() {
    return (
      <div>
        <ParallaxImage 
          image='/img/slide4.jpeg'
        />
        <div className='profile_main'>
        </div>
      </div>
    );
  } 
}

export default Settings
