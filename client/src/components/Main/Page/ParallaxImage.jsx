import React, { Component } from 'react';
import { Parallax } from 'react-parallax';

class ParallaxImage extends Component {
  render() {
    return (
      <Parallax
        strength={300}
        bgWidth={'1920px'}
        bgImage={this.props.image}
        style={{ height: '300px' }}
      >
        <div className="profile_slider_inner">
          {this.props.someText}
        </div>
      </Parallax>
    );
  }
}

export default ParallaxImage 
