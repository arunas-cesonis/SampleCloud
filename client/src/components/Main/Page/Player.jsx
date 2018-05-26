import React, { Component } from 'react';
import classNames from 'classnames';

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
      ///Just testing!
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

  handleTimeUpdate(){
    console.log('On time update');
    const total = Math.ceil(this.player.duration);
    const played = Math.ceil(this.player.currentTime);
    let pos = 0;
    let timeLeft = total - played;
    this.setState({ 
      stopTimer: false, 
      resetTimer: false
    });
    timeLeft--;
    if (timeLeft <= 0) {
      timeLeft = 0;
    }
    pos = Math.ceil((total - timeLeft) * 100 / total);
    this.setState({
      timeLeft: timeLeft,
      progress: pos
    });
  }

  handleSeek(){
    console.log('SEEEEEEKING!');
  }

  handleEnded() {
    console.log('ended/paused');
  }

  showDate() {
    //gets called everytime onTimeUpdate - To look into this later
    const dateAdded = this.props.dateAdded;
    if(dateAdded){
      console.log('showDate(): typeOf dateAdded:', typeof dateAdded);
      const dateArr = dateAdded.split(" ").splice(2, 3).join('-');
      console.log('Date Arr: ', dateArr);
      return 'Added: ' + dateArr;
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
          <button onClick={this.handlePlay}>Play</button>
          <button onClick={this.handlePause}>Pause</button>
          <p>Time left: {this.state.timeLeft}</p>
          */
  render() {
    const sampleURL = this.props.sampleURL;
    console.log('Props Sample URL: ', sampleURL);
    return (
      <div className="br_player">
        <div className="player_title">
          <div className='player_user'>{this.props.username}</div>
          <div className='player_date'>{this.showDate()}</div>
        </div>
        <p>{this.props.sample}</p>
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
