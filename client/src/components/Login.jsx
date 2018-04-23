import React, { Component } from 'react';
import axios from 'axios';
import { encrypt } from '../js/utils.js';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
		}
	}

	updatePassword = event => {
		this.setState({password: event.target.value});
	}

	updateUsername = event => {
		this.setState({username: event.target.value});
	}

	handleLogin = event => {
		event.preventDefault();
		console.log('handle called.');
		console.log('u: ', this.state.username);
		console.log('p: ', this.state.password);
		let encryptedPWD = encrypt(this.state.password);	
		console.log(encryptedPWD);
		let testURL = 'http://localhost:3010/login?user=paulius&pwd=' + encryptedPWD;
		console.log('submitted, now redirecting');
		console.log(testURL);
		window.location = testURL;
	}

	render(){
		return (
			<div>
				<h1>Login</h1>
				<input type='text'
					onChange={this.updateUsername.bind(this)}	
					name='username' />
				<input type='password'
					onChange={this.updatePassword.bind(this)}	
					name='password' />
				<button type='submit' onClick={this.handleLogin}>
				Login
				</button>
			</div>
		);
	}
}

export default Login;
