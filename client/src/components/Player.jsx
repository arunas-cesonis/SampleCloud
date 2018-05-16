import React, { Component } from 'react';

const checkURL = (url) => {
    if(url){
        return true;
    } else {
        return false;
    }
}

class Player extends Component {
    constructor(props){
        super(props);
        this.state = {
            stopTimer: false,
            timeLeft: 0,
        }
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
    }

    handlePause(){
        const sample = this.props.sampleURL;
        if(checkURL(sample)){
            this.refs.player.pause();
        }
    }

    handlePlay(){
        const sample = this.props.sampleURL;
        if(checkURL(sample)){
            this.refs.player.play();
        }
    }

    calcTime(){
        this.setState({ stopTimer: false});
        const total = this.refs.player.duration;
        const played = this.refs.player.currentTime;
        let timeLeft = total - played;
        let timer = setInterval(() => {
            if(this.state.stopTimer){
                console.log('state.stopTimer is TRUE.');
                clearInterval(timer);
            } else {
                timeLeft--;
                if(timeLeft <= 0){
                    timeLeft = 0;
                    clearInterval(timer);
                }
            }
            this.setState({ timeLeft: timeLeft });
            console.log('time left: ', timeLeft);
        }, 1000);
    }

    handleEnded(){
        console.log('ended');
        this.setState({ stopTimer: true});
    }

    render() {
        const sampleURL = this.props.sampleURL;
        return (
            <div className='br_player'>
                <p>{sampleURL}</p>
                <button 
                    onClick={this.handlePlay}
                >Play 
                </button>
                <button 
                    onClick={this.handlePause}
                >Pause 
                </button>
                <p>Time left: {this.state.timeLeft}</p>
                <audio
                    onPlay={this.calcTime.bind(this)}
                    onEnded={this.handleEnded.bind(this)}
                    onPause={this.handleEnded.bind(this)}
                    ref='player'
                    autoPlay={false}
                    src={sampleURL}
                />
            </div>
        );
    }
}

export default Player;
