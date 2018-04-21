import React, { Component } from 'react';
import '../css/header.css';

class Header extends Component {
	constructor(props){
		super(props);
	};

	render(){
		return (
			<div className='headerCont'>			
				<h1>Header Container</h1>
			</div>
	
		);
	}

}

export default Header;
