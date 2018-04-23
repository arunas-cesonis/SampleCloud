import React, { Component } from 'react';
import axios from 'axios';
import { encrypt } from '../js/utils.js';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			serverRes: '',
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
		axios.post('http://localhost:3010/api/login', {
			username: this.state.username,
			password: this.state.password,
		})
		.then(response => {
			this.setState({ 
				serverRes: response.data.id,
			});
			console.log(response.data);
		});
	}

	render(){
		return (
			<div>
				<h1>Login</h1>
				<h1>{this.state.serverRes}</h1>
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
