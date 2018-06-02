import React, { Component } from 'react';
import classNames from 'classnames';
import './player.css';

const checkURL = url => {
  if (url) {
    return true;
  } else {
    return false;
  }
};

const formatTime = (timeLeft) => {
  if(isNaN(timeLeft)){
    return '00:00';
  }
  let m = Math.floor(timeLeft / 60);
  let s = timeLeft % 60;
  if(m < 10) m = '0' + m;
  if(s < 10) s = '0' + s;
  const result = m + ':' + s;
  console.log('formatTime(); ', result, '\ntimeLeft: ', timeLeft);
  return result;
}

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: '00:00',
      progress: 0,
      isPlaying: false
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.showDate = this.showDate.bind(this);
    this.getMousePos = this.getMousePos.bind(this);
  }

  handlePause() {
    const sample = this.props.sampleURL;
    if (checkURL(sample)) {
      this.player.pause();
    }
  }

  handlePlay(t) {
    const sample = this.props.sampleURL;
    if (checkURL(sample)) {
      if(t > 0){
        this.player.currentTime = t;
      }
      this.player.play();
    }
  }

  handleTimeUpdate(){
    const total = Math.ceil(this.player.duration);
    const played = Math.ceil(this.player.currentTime);
    let pos = 0;
    let timeLeft = total - played;
    timeLeft--;
    if (timeLeft <= 0) {
      timeLeft = 0;
    }
    const mmss = formatTime(timeLeft); 
    pos = Math.floor((total - timeLeft) * 100 / total);
    this.setState({
      timeLeft: mmss, 
      progress: pos
    });
  }

  handleSeek(){
    console.log('SEEEEEEKING!');
  }

  handleEnded() {
    console.log('ended/paused');
    this.setState({ isPlaying: false });
  }

  showDate() {
    const dateAdded = this.props.dateAdded;
    return (dateAdded) ? 'Added: ' + dateAdded.replace('T', ' ').slice(0, 16) : 'n/a';
  }

  getMousePos(e) {
    const sample = this.props.sampleURL;
    const total = Math.floor(this.player.duration);
    const elMaxX = 200;
    const mouseX = e.nativeEvent.offsetX; 
    const t = ((mouseX * total) / elMaxX);
    if(checkURL(sample)){
      this.setState({ 
        isPlaying: true
      });
      this.handlePlay(t);
    }
  }

  pauseButton() {
    console.log('pauseButton();');
    this.setState({ isPlaying: false });
    this.handlePause();
  }

  playButton() {
    console.log('playButton();');
    this.setState({ isPlaying: true });
    this.handlePlay();
  }

  render() {
    const sampleURL = this.props.sampleURL;
    console.log('Props Sample URL: ', sampleURL);
    //To segment into separate components
    return (
      <div className="br_player">
        <div className="player_title">
          <div className='player_user'>{this.props.username}</div>
          <div className='player_sample'>{this.props.sample}</div>
          <div className='player_date'>{this.showDate()}</div>
        </div>
        <div className='player_controls'>
          <div className='play_button_cont'>
            <div
              className={classNames('pause_button', { playing: this.state.isPlaying })}
              onClick={this.pauseButton.bind(this)}
            ></div>
            <div 
              className={classNames('play_button', { playing: this.state.isPlaying })}
              onClick={this.playButton.bind(this)}
            ></div>
          </div>
          <div 
            className="br_progress_cont"
            onClick={this.getMousePos}
          >
            <div
              className="br_progress"
              style={{ width: this.state.progress + '%' }}
            />
          </div>
          <div className='timeleft'>{this.state.timeLeft}</div>
        </div>
        <audio
          onEnded={this.handleEnded.bind(this)}
          onPause={this.handleEnded.bind(this)}
          onSeeking={this.handleSeek.bind(this)}
          onTimeUpdate={this.handleTimeUpdate.bind(this)}
          ref={ref => (this.player = ref)}
          autoPlay={false}
          src={sampleURL}
        />
      </div>
    );
  }
}

export default Player;
