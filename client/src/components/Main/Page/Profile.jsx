import React, { Component } from 'react';
import Upload from './Upload.jsx';
import UserSamples from './UserSamples.jsx';

class Profile extends Component {
  render() {
    return (
      <div>
        <Upload 
          user={this.props.serverRes}
        />
        <UserSamples 
          user={this.props.serverRes}
        />
      </div>
    );
  } 
}

export default Profile
