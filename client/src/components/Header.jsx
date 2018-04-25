import React, { Component } from 'react';
import '../css/header.css';
import Menu from './Menu.jsx';

class Header extends Component {

	render(){
		return (
			<div className='headerCont'>			
				<h1>Logo</h1>
				<Menu />
			</div>
	
		);
	}

}

export default Header;
