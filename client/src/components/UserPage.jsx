import React, { Component } from 'react';
import Main from './Main.jsx';

class UserPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			currentUser: this.props.username,
			//I might need to keep this going to maintain the session
			logged: this.props.logged,
		};
	}
	render() {
		console.log('From UserPage component. Logged in as: ', this.state.currentUser, ' ', this.state.logged);
		return (
			<div>
				<Main />
			</div>
		);
	}
}

export default UserPage;
