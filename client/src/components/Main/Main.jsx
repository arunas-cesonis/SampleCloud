import React, { Component } from 'react';
import Header from './Header/Header.jsx';
import Page from './Page/Page.jsx';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      serverRes: {
        username: '',
        successLogin: false,
      }
    };
    this.handleAuthResponse = this.handleAuthResponse.bind(this);
  }

  handleAuthResponse(auth, username){
    let serverRes = Object.assign({}, this.state.serverRes);
    serverRes.successLogin = auth;
    console.log(serverRes);
    this.setState({ serverRes });
  }

  render() {
    return (
      <div className='main_cont'>
        <Header serverRes={this.state.serverRes.successLogin} />
        <Page 
          authResponse={this.handleAuthResponse} 
          serverRes={this.state.serverRes}
        />
      </div>
    );
  }
}

export default Main;
