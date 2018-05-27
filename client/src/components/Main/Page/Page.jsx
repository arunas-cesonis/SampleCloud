import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './page.css';
import Home from './Home.jsx';
import Login from './Login.jsx';
import About from './About.jsx';
import Upload from './Upload.jsx';
import Browse from './Browse.jsx';

//Basically this is a main Content or Content Loader
class Page extends Component {
  constructor(props) {
    super(props);
  }

  // CHECK {...props} - This is the way to pass props using Route module.
  render() {
    if(this.props.serverRes.successLogin) {
      return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route 
            path="/login" 
            render={props => <Login {...props} 
              authResponse={this.props.authResponse} 
              />} 
          />
          <Route path="/browse" render={props => <Browse />} />
          <Route
            path="/upload"
            render={props => <Upload {...props} name='test' />}
          />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route 
            path="/login" 
            render={props => 
              <div>
                <Login {...props} 
                  authResponse={this.props.authResponse} 
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
