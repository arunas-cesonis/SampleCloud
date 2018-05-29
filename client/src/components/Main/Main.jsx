import React, { Component } from 'react';
import Header from './Header/Header.jsx';
import Page from './Page/Page.jsx';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      alpha: 1,
      serverRes: {
        username: '',
        successLogin: false,
      }
    };
    this.handleAuthResponse = this.handleAuthResponse.bind(this);
    this.handleSliderAlpha = this.handleSliderAlpha.bind(this);
  }

  handleSliderAlpha(alpha) {
    console.log('handleSliderAlpha(): called.');
    this.setState({ alpha: alpha });
  }

  handleAuthResponse(auth, username){
    const serverRes = Object.assign({}, this.state.serverRes);
    serverRes.successLogin = auth;
    serverRes.username = username;
    console.log(serverRes);
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
