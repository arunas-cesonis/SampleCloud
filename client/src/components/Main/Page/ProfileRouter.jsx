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
            <UserSettings
              user={this.props.user}
            />}
        />
      </Switch>
    );
    /*
        <Route 
          path="/profile/upload" 
          render={props => 
            <Upload 
              user={this.props.user}
            />}
        />
        <Route
          path="/profile/samples"
          render={props =>
          <UserSamples 
            user={this.props.user}
          />}
        />
        <Route
          path="/profile/settings"
          render={props =>
          <UserSettings 
            user={this.props.user}
          />}
        />
      </Switch>
    );
    */
  } 
}

export default ProfileRouter
