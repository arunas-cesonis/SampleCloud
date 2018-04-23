import React, { Component } from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';

class UserPage extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div>
				<Header />
				<Main />
			</div>
		);
	}
}

export default UserPage;
