import React, { Component } from 'react';

const checkURL = url => {
  if (url) {
    return true;
  } else {
    return false;
  }
};

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stopTimer: false,
      resetTimer: false,
      timeLeft: 0,
      progress: 0
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.getMousePos = this.getMousePos.bind(this);
  }

  handlePause() {
    const sample = this.props.sampleURL;
    if (checkURL(sample)) {
      this.player.pause();
      ///Just testing!
      //this.player.currentTime = 10;
    }
  }

  handlePlay(fromPoint) {
    const sample = this.props.sampleURL;
    if (checkURL(sample)) {
      if(fromPoint > 0){
        console.log('Is not null');
        this.player.currentTime = fromPoint;
        this.setState({ resetTimer: true });
      }
      console.log('From Point is not null: ', fromPoint);
      this.player.play();
    }
  }

  getMousePos(e) {
    const sample = this.props.sampleURL;
    const total = Math.ceil(this.player.duration);
    const elMaxX = 200;
    const mouseX = e.nativeEvent.offsetX; 
    const playFrom = ((mouseX * total) / elMaxX);
    if(checkURL(sample)){
      this.setState({ stopTimer: true });
      this.handlePlay(playFrom);
    }
  }

  calcTime() {
    this.setState({ 
      stopTimer: false, 
      resetTimer: false
    });
    const total = Math.ceil(this.player.duration);
    const played = Math.ceil(this.player.currentTime);
    let pos = 0;

    //Progress Bar
    let timeLeft = total - played;
    let timer = setInterval(() => {
      if (this.state.stopTimer) {
        clearInterval(timer);
      } else {
        timeLeft--;
        if (timeLeft <= 0) {
          timeLeft = 0;
          clearInterval(timer);
        }
      }
      pos = Math.ceil((total - timeLeft) * 100 / total);
      this.setState({
        timeLeft: timeLeft,
        progress: pos
      });
    }, 1000);
  }

  handleSeek(){
    console.log('SEEEEEEKING!');
  }
  handleEnded() {
    console.log('ended');
    this.setState({
      stopTimer: true
    });
  }

  render() {
    const sampleURL = this.props.sampleURL;
    return (
      <div className="br_player">
        <p>{sampleURL}</p>
        <button onClick={this.handlePlay}>Play</button>
        <button onClick={this.handlePause}>Pause</button>
        <p>Time left: {this.state.timeLeft}</p>
        <div 
          className="br_progress_cont"
          onClick={this.getMousePos}
        >
          <div
            className="br_progress"
            style={{ width: this.state.progress + '%' }}
          />
        </div>
        <audio
          onPlay={this.calcTime.bind(this)}
          onEnded={this.handleEnded.bind(this)}
          onPause={this.handleEnded.bind(this)}
          onSeeking={this.calcTime.bind(this)}
          ref={ref => (this.player = ref)}
          autoPlay={false}
          src={sampleURL}
        />
      </div>
    );
  }
}

export default Player;
