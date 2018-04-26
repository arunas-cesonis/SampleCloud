import React, { Component } from 'react';
//Using Link for updating URL, Content.jsx will pick them up al will load the req cont
import { Link } from 'react-router-dom';
import '../css/menu.css';
import classNames from 'classnames';

class Menu extends Component {
	constructor(props){
		super(props);
		this.state = {
			homeActive: true,
			aboutActive: false,
			browseActive: false,
			uploadActive: false,
		}
	}
	// TO Find a better way of achieving this.
	handleButton = (arg, event) => {
		if(arg === 'home'){
			this.setState({
				homeActive: true,
				aboutActive: false,
				browseActive: false,
				uploadActive: false,
			});
		} else if(arg === 'about'){
			this.setState({
				homeActive: false,
				aboutActive: true,
				browseActive: false,
				uploadActive: false,
			});
		} else if(arg === 'browse'){
			this.setState({
				homeActive: false,
				aboutActive: false,
				browseActive: true,
				uploadActive: false,
			});
		} else if(arg === 'upload'){
			this.setState({
				homeActive: false,
				aboutActive: false,
				browseActive: false,
				uploadActive: true,
			});
		}
	}
	
	render() {
		let navHomeClass = classNames({
			'navItem': true,
			'active': this.state.homeActive,
		});
		let navAboutClass = classNames({
			'navItem': true,
			'active': this.state.aboutActive,
		});
		let navBrowseClass = classNames({
			'navItem': true,
			'active': this.state.browseActive,
		});
		let navUploadClass = classNames({
			'navItem': true,
			'active': this.state.uploadActive,
		});
		return (
                	<ul>
				<li><Link className={navHomeClass} 
						onClick={this.handleButton.bind(this, 'home')}
						to='/'
					>Home</Link></li>
				<li><Link className={navAboutClass} 
						onClick={this.handleButton.bind(this, 'about')}
						to='/about'
					>About</Link></li>
				<li><Link className={navBrowseClass} 
						onClick={this.handleButton.bind(this, 'browse')}
						to='/browse'
					>Browse</Link></li>
				<li><Link className={navUploadClass} 
						onClick={this.handleButton.bind(this, 'upload')}
						to='/upload'
					>Upload</Link></li>
			</ul>
		);
	}
}

export default Menu;
