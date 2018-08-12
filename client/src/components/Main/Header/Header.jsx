import React, { Component } from 'react';
import Menu from './Menu.jsx';
import Logo from './Logo.jsx';
import './header.css';

class Header extends Component {
  render() {
    const { serverRes } = this.props;
    console.log('Server Res: ', serverRes);
    if(serverRes.connected) {
      return (
        <div>
          <Menu 
            serverRes={this.props.serverRes} 
          />
          <div className='userTitleBar'>welcome: {this.props.serverRes.username}</div>
        </div>
      );
    } else {
      return (
        <div>
          <Menu 
            serverRes={this.props.serverRes} 
            signOut={this.props.signOut}
          />
          <Logo 
            alpha={this.props.alpha}
          />
        </div>
      );
    }
  }
}

export default Header;
