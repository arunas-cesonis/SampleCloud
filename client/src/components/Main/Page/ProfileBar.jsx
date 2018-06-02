import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileBar extends Component {
  render() {
    return(
      <div>
        <Link to="/profile/upload">Upload</Link>
        <Link to="/profile/samples">Samples</Link>
        <Link to="/profile/settings">Settings</Link>
      </div>
    );
  }
}

export default ProfileBar;
