import React, { Component } from 'react';
import Menu from './Menu.jsx';
import Logo from './Logo.jsx';
import './header.css';

class Header extends Component {
  render() {
    if(this.props.serverRes.successLogin){
      return (
        <div>
          <Menu 
            serverRes={this.props.serverRes.successLogin} 
          />
          <div className='userTitleBar'>welcome: {this.props.serverRes.username}</div>
        </div>
      );
    } else {
      return (
        <div>
          <Menu 
            serverRes={this.props.serverRes.successLogin} 
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
