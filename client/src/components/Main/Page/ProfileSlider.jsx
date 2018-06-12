import React, { Component } from 'react';
import { Parallax } from 'react-parallax';

class ProfileSlider extends Component {
  render() {
    return (
      <div>
        <Parallax
          strength={300}
          bgWidth={'1920px'}
          bgImage={'http://localhost:3000/img/slide4.jpeg'}
        >
          <div className="profile_slider_inner">
            Profile!
          </div>
        </Parallax>
      </div>
    );
  }
}

export default ProfileSlider
