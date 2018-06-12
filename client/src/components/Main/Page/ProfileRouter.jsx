import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Upload from './Upload.jsx';
import UserSamples from './UserSamples.jsx';
import UserSettings from './UserSettings.jsx';

class ProfileRouter extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact path="/profile"
          render={props =>
            <UserSamples
              user={this.props.serverRes}
            />}
        />
        <Route 
          path="/profile/upload" 
          render={props => 
            <Upload 
              user={this.props.serverRes}
            />}
        />
        <Route
          path="/profile/samples"
          render={props =>
          <UserSamples 
            user={this.props.serverRes}
          />}
        />
        <Route
          path="/profile/settings"
          render={props =>
          <UserSettings 
            user={this.props.serverRes}
          />}
        />
      </Switch>
    );
  } 
}

export default ProfileRouter
