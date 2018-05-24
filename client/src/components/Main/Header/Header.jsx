import React, { Component } from 'react';
import Menu from './Menu.jsx';
import Logo from './Logo.jsx';

class Header extends Component {
  render() {
    return (
      <div>
        <Menu 
          serverRes={this.props.serverRes} 
        />
        <Logo />
      </div>
    );
  }
}

export default Header;
