import React, { Component } from 'react';
import Menu from './Menu.jsx';
import Logo from './Logo.jsx';

class Header extends Component {

	render(){
		return (
            <div>
                <Menu />
                <Logo />
            </div>
        
		);
	}

}

export default Header;
