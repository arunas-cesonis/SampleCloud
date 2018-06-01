import React, { Component } from 'react';
import Header from './Header/Header.jsx';
import Page from './Page/Page.jsx';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      alpha: 1,
      afterReg: false,
      serverRes: {
        username: '',
        successLogin: false,
        email: '',
        admin: '',
        dateCreated: ''
      }
    };
    this.handleAuthResponse = this.handleAuthResponse.bind(this);
    this.handleSliderAlpha = this.handleSliderAlpha.bind(this);
  }

  handleSliderAlpha(alpha) {
    console.log('handleSliderAlpha(): called.');
    this.setState({ alpha: alpha });
  }

  handleAuthResponse(auth, user){
    const serverRes = Object.assign({}, this.state.serverRes);
    serverRes.successLogin = auth;
    serverRes.username = user.username;
    serverRes.email = user.email;
    serverRes.admin = user.admin;
    serverRes.dateCreated = user.dateCreated;
    console.log('handleAuthResponse(): ', serverRes);
    this.setState({ serverRes });
  }

  render() {
    return (
      <div className='main_cont'>
        <Header 
          serverRes={this.state.serverRes} 
          alpha={this.state.alpha}
        />
        <Page 
          authResponse={this.handleAuthResponse} 
          serverRes={this.state.serverRes}
          alpha={this.state.alpha}
          handleSliderAlpha={this.handleSliderAlpha}
        />
      </div>
    );
  }
}

export default Main;
