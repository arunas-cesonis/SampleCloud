import React, { Component } from 'react';
import '../css/header.css';
import Menu from './Menu.jsx';
import Logo from './Logo.jsx';

class Header extends Component {

	render(){
		return (
            <div>
                <Menu />
                <div className='headerCont'>			
                    <Logo />
                </div>
            </div>
        
		);
	}

}

export default Header;
