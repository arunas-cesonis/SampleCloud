import React, { Component } from 'react';
import Upload from './Upload.jsx';
import UserSamples from './UserSamples.jsx';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      updated: ''
    }
    this.updateList = this.updateList.bind(this);
  }

  updateList(){
    console.log('updateList(); called.');
    this.setState({ updated: true }); 
  }

  render() {
    return (
      <div>
        <Upload 
          user={this.props.serverRes}
          updateList={this.updateList}
        />
        <UserSamples 
          user={this.props.serverRes}
        />
      </div>
    );
  } 
}

export default Profile
