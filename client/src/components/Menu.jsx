import React, { Component } from 'react';
//Using Link for updating URL, Content.jsx will pick them up al will load the req cont
import { Link } from 'react-router-dom';
import style from '../css/menu.css';

class Menu extends Component {
	
	render() {
		return (
                	<ul>
				<li><Link className='navItem' to='/'>Home</Link></li>
				<li><Link className='navItem' to='/about'>About</Link></li>
				<li><Link className='navItem' to='/browse'>Browse</Link></li>
				<li><Link className='navItem' to='/upload'>Upload</Link></li>
			</ul>
		);
	}
}

export default Menu;
