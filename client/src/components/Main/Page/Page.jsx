import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './page.css';
import Home from './Home.jsx';
import Login from './Login.jsx';
import About from './About.jsx';
import Browse from './Browse.jsx';
import Register from './Register.jsx';
import Profile from './Profile.jsx';
import ProfileBar from './ProfileBar.jsx';

//TMP
import Upload from './Upload.jsx';


//Basically this is a main Content or Content Loader
class Page extends Component {
  // CHECK {...props} - This is the way to pass props using Route module.
  render() {
    if(this.props.serverRes.successLogin) {
      return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route 
            path="/login" 
            render={props => 
              <Login 
                authResponse={this.props.authResponse} 
              />} 
          />
          <Route 
            path="/browse" 
            render={props => 
                <Browse />} 
          />
          <Route
            path="/profile"
            render={props => 
              <div>
                <ProfileBar 
                  serverRed={this.props.serverRed}
                />
                <Profile 
                  serverRes={this.props.serverRes}
                />
              </div>
            }
          />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route 
            exact path="/" 
            component={Home} 
          />
          <Route 
            path="/register"
            render={props =>
                <Register
                />}
          />
          <Route 
            path="/login" 
            render={props => 
              <div>
                <Login 
                  authResponse={this.props.authResponse} 
                  handleSliderAlpha={this.props.handleSliderAlpha}
                />
                <Home />
              </div>
            } 
          />
        </Switch>
      );
    }
  }
}

export default Page 
