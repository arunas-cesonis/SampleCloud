import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './page.css';
import Home from './Home.jsx';
import Login from './Login.jsx';
import About from './About.jsx';
import Browse from './Browse.jsx';
import Register from './Register.jsx';
import Profile from './Profile.jsx';
import UserPage from './UserPage.jsx';
import { withCookies, Cookies } from 'react-cookie';

//Basically this is a main Content or Content Loader
class Page extends Component {
  constructor(props) {
    super(props);
  }

  // CHECK {...props} - This is the way to pass props using Route module.
  render() {
    //if(this.props.user.successLogin) {
    console.log('U: ', this.props.user.username);
      return (
        <Switch>
          <Route exact path="/userhome" render={(props) => 
              <UserPage currentUser={this.props.user.username} />
          }/>
          <Route path="/about" component={About} />
          <Route path='/userpage/:name' component={UserPage} />
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
              <Profile 
                user={this.props.user}
              />
            }
          />
        </Switch>
      );
      /*
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
    */
  }
}

export default withCookies(Page); 
