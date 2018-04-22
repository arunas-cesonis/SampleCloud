import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import '../css/header.css';

class Header extends Component {
	constructor(props){
		super(props);
	};

	render(){
		return (
			<div className='headerCont'>			
				<h1>Header</h1>
				<ul>
					<li><Link to ='/'>Home</Link></li>
					<li><Link to ='/about'>about</Link></li>
				</ul>
			</div>
	
		);
	}

}

export default Header;
