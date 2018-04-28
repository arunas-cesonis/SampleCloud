import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/menu.css';
import classNames from 'classnames';

class MenuItem extends Component {
	constructor(props){
		super(props);
		this.state = {
			btnActive: false,
		};
	}
	handleFocus = (event) => {
		this.setState({btnActive: true});
		console.log(event.type);
	}
	render(){
		const itemClass = classNames({
			'navItem': true,
			'active': this.state.btnActive,
		});
		return (
			<li><Link
				to={this.props.to}		
				className='navItem'
				onFocus={this.handleFocus.bind(this)}
			>{this.props.name}</Link></li>
		);
	}
}

export default MenuItem;
