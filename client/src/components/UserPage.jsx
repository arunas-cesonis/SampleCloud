import React, { Component } from 'react';
import Header from './Header.jsx';
import Content from './Content.jsx';

class UserPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			//TO REVIEW LATER
			currentUser: this.props.username,
			logged: this.props.logged,
		};
	}
	render() {
		console.log('From UserPage component. Logged in as: ',
			this.state.currentUser, ' ', this.state.logged);
		return (
			<div>
				<Header />
				<Content 
					username={this.state.currentUser} 
				/>
			</div>
		);
	}
}

export default UserPage;
