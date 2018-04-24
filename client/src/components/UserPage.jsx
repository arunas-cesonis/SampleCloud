import React, { Component } from 'react';
import Main from './Main.jsx';

class UserPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			currentUser: this.props.username,
		};
	}
	render() {
		console.log('From UserPage component. Logged in as: ', this.state.currentUser);
		return (
			<div>
				<Main />
			</div>
		);
	}
}

export default UserPage;
