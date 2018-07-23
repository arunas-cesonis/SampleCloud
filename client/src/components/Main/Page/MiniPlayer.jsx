import React, { Component } from 'react';
import classNames from 'classnames';
import axios from 'axios'
import fd from 'react-file-download';
import './miniplayer.css';
import { Link } from 'react-router-dom';

//Material UI
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dehaze from '@material-ui/icons/Dehaze';

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
      anchorEl: null,
      avatarURL: '',
      isPlaying: false,
      marginLeft: '35px',
      hideAvatar: 'block'
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.showDate = this.showDate.bind(this);
    this.getMousePos = this.getMousePos.bind(this);
    this.getDuration = this.getDuration.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleDownload(e, url, name) {
    e.preventDefault();
    const fileName = name + url.slice(url.lastIndexOf('.'));
    console.log('URL: ', url);
    axios({
      url: url, 
      method: 'GET',
      responseType: 'blob' // It won't work without this
    }).then((res) => {
      fd(res.data, fileName);
    })
    this.handleMenuClose();
  }

  handleMenuClick(e) {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleMenuClose() {
    this.setState({ anchorEl: null });
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
  componentDidMount(){
    if(!this.props.sample.username){
        console.log('sample.username = null');
    } else {
      axios.post('/api/avatar', {
        sample: this.props.sample
      }).then(res => {
        this.setState({ avatarURL: res.data.avatar }); 
      });
    }
    this.props.hideAvatar ? 
      this.setState({ 
        hideAvatar: 'none',
        marginLeft: '15px'
      }) : 
      this.setState({ 
        hideAvatar: 'block', 
        marginLeft: '35px'
      });
  }

  render() {
    const sampleURL = this.props.sample.filePath;
    const anchorEl = this.state.anchorEl;
    const userURL = '/userpage/' + this.props.sample.username;
    //To segment into separate components
    return (
      <div className='miniplayer_cont'>
        <Link to={userURL}>
          <div className='avatar'
            style={{ 
              display: this.state.hideAvatar,
              backgroundImage: 'url('+ this.state.avatarURL +')' 
            }}
          >
            <div className='avatar_name'>{this.props.sample.username}</div>
          </div>
        </Link>
        <div className='miniplayer'>
          <div className='name'>{this.props.sample.friendlyName}</div>
          <div className='category'>{this.props.sample.category}</div>
          <div
            className={classNames('pause_button', { pl: this.state.isPlaying })}
            onClick={this.pauseButton.bind(this)}
            style={{ marginLeft: this.state.marginLeft }}
          ></div>
          <div 
            className={classNames('play_button', { playing: this.state.isPlaying })}
            onClick={this.playButton.bind(this)}
            style={{ marginLeft: this.state.marginLeft }}
          ></div>
          <div className='menu'>
            <IconButton
              style={{ width: '30px', height: '30px' }}
              aria-label='More'
              aria-owns={anchorEl ? 'miniplayer-menu' : null}
              aria-haspopup='true'
              onClick={this.handleMenuClick}
            >
              <Dehaze style={{ width: '16px', color: '#6aabb7' }}/>
            </IconButton>
            <Menu
              id='miniplayer-menu'
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleMenuClose}
            >
              <MenuItem 
                style={{ fontSize: '10px', lineHeight: '10px', padding: '0px 5px' }}
                onClick={(e) => this.handleDownload(e, this.props.sample.filePath, this.props.sample.friendlyName)}>Download</MenuItem>
              <MenuItem
                style={{ fontSize: '10px', lineHeight: '10px', padding: '0px 5px' }}
              >More Info</MenuItem>
              <MenuItem
                style={{ fontSize: '10px', lineHeight: '10px', padding: '0px 5px' }}
              >Something</MenuItem>
            </Menu>
          </div>
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
