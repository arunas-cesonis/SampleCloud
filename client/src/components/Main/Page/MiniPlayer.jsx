import React, { Component } from 'react';
import classNames from 'classnames';
import './miniplayer.css';

const checkURL = url => {
  if (url) {
    return true;
  } else {
    return false;
  }
};

const formatTime = (timeLeft) => {
  let m = Math.floor(timeLeft / 60);
  let s = timeLeft % 60;
  if(m < 10) m = '0' + m;
  if(s < 10) s = '0' + s;
  const result = m + ':' + s;
  return result;
}

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: '',
      progress: 0,
      isPlaying: false
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.showDate = this.showDate.bind(this);
    this.getMousePos = this.getMousePos.bind(this);
    this.getDuration = this.getDuration.bind(this);
  }

  getDuration(){
    const rawDuration = Math.ceil(this.player.duration);
    const duration = formatTime(rawDuration);
    this.setState({ timeLeft: duration });
  }

  handlePause() {
    const sample = this.props.sample.filePath;
    if (checkURL(sample)) {
      this.player.pause();
    }
  }

  handlePlay(t) {
    const sample = this.props.sample.filePath;
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
    const dateAdded = this.props.sample.dateAdded;
    return (dateAdded) ? 'Added: ' + dateAdded.replace('T', ' ').slice(0, 16) : 'n/a';
  }

  getMousePos(e) {
    const sample = this.props.sample.filePath;
    const total = Math.floor(this.player.duration);
    const elMaxX = 235;
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

  /*
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
  */
  render() {
    const sampleURL = this.props.sample.filePath;
    console.log('Props Sample URL: ', sampleURL);
    //To segment into separate components
    return (
      <div className='miniplayer_cont'>
        <div className='avatar'
          style={{ backgroundImage: 'url(http://localhost:3000/img/default_avatar.png)' }}
        >
          <div className='avatar_name'>{this.props.sample.username}</div>
        </div>
        <div className='miniplayer'>
          <div className='name'>{this.props.sample.friendlyName}</div>
          <div className='category'>{this.props.sample.category}</div>
          <div
            className={classNames('pause_button', { pl: this.state.isPlaying })}
            onClick={this.pauseButton.bind(this)}
          ></div>
          <div 
            className={classNames('play_button', { playing: this.state.isPlaying })}
            onClick={this.playButton.bind(this)}
          ></div>
          <div className='time'>{this.state.timeLeft}</div>
          <div 
            onClick={this.getMousePos}
            className='progress_cont'>
            <div 
              className='progress_bar'
              style={{ width: this.state.progress + '%' }}
            ></div>
          </div>
        </div>
        <audio
          onEnded={this.handleEnded.bind(this)}
          onCanPlay={this.getDuration}
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
