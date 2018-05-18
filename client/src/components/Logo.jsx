import React, { Component } from 'react';
import '../css/logo.css';
import { Carousel } from 'react-bootstrap';

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      index: 0
    };
    this.showText = this.showText.bind(this);
  }
  showText() {
    // NOT SURE ABOUT THIS.... will think about it later
    const i = this.state.index;
    if (i > 1) {
      this.setState({ index: 0 });
    } else {
      this.setState({ index: i + 1 });
    }
    console.log('onSlideEnd. index = ', i);
  }
  render() {
    return (
      <div>
        <Carousel
          onSlideEnd={this.showText}
          controls={false}
          interval={3000}
          indicators={false}
        >
          <Carousel.Item>
            <img className="logo" src="/img/slide2.jpeg" />
            <Carousel.Caption bsClass="overlayCont">
              <div className="overlay">
                <h1>
                  WELCOME<br />To<br />SampleCloud.Live
                </h1>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="logo" src="/img/slide3.jpeg" />
            <Carousel.Caption bsClass="overlayCont">
              <div className="overlayGreen">
                <h1>SampleCloud.Live</h1>
                <br />
                <p>Some text here, blah blah lorem sipsun minorel.</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="logo" src="/img/slide1.jpeg" />
            <Carousel.Caption bsClass="overlayCont">
              <div className="overlay">
                <h1>Some text goes in here, lurin lerin pepson gypso testu.</h1>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Logo;
