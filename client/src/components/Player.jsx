import React, { Component } from 'react';

class Player extends Component {
    render() {
        const sampleURL = this.props.sampleURL;
        return (
            <div className='br_main br_player'>
                <p>{sampleURL}</p>
            </div>
        );
    }
}

export default Player;