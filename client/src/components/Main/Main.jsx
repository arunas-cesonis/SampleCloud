import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import Header from './Header/Header.jsx';
// To review later (auth.js);
import { verifyJWT } from './auth.js';
import jwt from 'jsonwebtoken';
import Page from './Page/Page.jsx';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';


const verifyToken = (token) => { 
  jwt.verify(token, 'secret', (err, decodedToken) => {
    if(err || !decodedToken) {
      return err;
    }
    return decodedToken 
  });
}

class Main extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  constructor(props){
    super(props);
    /*
    if(!cookies.get('session')){
      cookies.set('session', { id: Math.random().toString(12).slice(2) }, { path: '/' });
    }
    */
    this.state = {
      alpha: 1,
      userData: {},
      userIn: false
    };
    this.handleAuthResponse = this.handleAuthResponse.bind(this);
    this.handleSliderAlpha = this.handleSliderAlpha.bind(this);
  }

  handleSliderAlpha(alpha) {
    console.log('handleSliderAlpha(): called.');
    this.setState({ alpha: alpha });
  }

  handleAuthResponse(auth, session){
    const token = jwt.verify(session.token, 'secret', (err, decodedToken) => {
      if(err || !decodedToken) {
        return err;
      }
      return decodedToken 
    });
    console.log('authResponse(); ', session);
    console.log('TOKEN: ', token);
    this.setState({ userData: token.data._doc }); 
    /*
    axios.get('/api/session').then(res => {
      this.setState({ userData: res.data });
    });
    */
  }

  componentDidMount() {
    axios.get('/api/session').then(res => {
      const token = jwt.verify(res.data.token, 'secret', (err, decodedToken) => {
        if(err || !decodedToken) {
          return err;
        }
        return decodedToken
      });
      if(res.data.token) {
        const userDetails = token.data._doc;
        userDetails.connected = true;
        console.log('MAIN: ', userDetails); 
        this.setState({ userData: userDetails }); 
      }
    });
  }

  render() {
    return (
      <div className='main_cont'>
        <h1>{this.state.userData.username}</h1>
        <Header 
          serverRes={this.state.userData} 
          userIn={this.state.userIn}
          alpha={this.state.alpha}
        />
        <Page 
          authResponse={this.handleAuthResponse} 
          user={this.state.userData}
          alpha={this.state.alpha}
          handleSliderAlpha={this.handleSliderAlpha}
        />
      </div>
    );
  }
}

export default withCookies(Main);
