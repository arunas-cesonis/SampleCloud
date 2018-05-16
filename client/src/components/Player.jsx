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
            progress: 0,
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
        const total = Math.ceil(this.refs.player.duration);
        const played = Math.ceil(this.refs.player.currentTime);
        let pos = 0;

        //Progress Bar
        pos = (played * 100) / total;

        let timeLeft = total - played;
        let timer = setInterval(() => {
            if(this.state.stopTimer){
                clearInterval(timer);
                timeLeft = 0;
                pos = 100;
            } else {
                timeLeft--;
                pos = Math.ceil(((total - timeLeft) * 100) / total); 
                if(timeLeft <= 0){
                    timeLeft = 0;
                    clearInterval(timer);
                }
            }
            this.setState({ 
                timeLeft: timeLeft, 
                progress: pos,
            });
            console.log('time left: ', timeLeft);
            console.log('% played: ', pos);
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
                <div className='br_progress_cont'>
                    <div 
                        className='br_progress'
                        style={{width: this.state.progress+'%'}}
                    ></div>
                </div>
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
