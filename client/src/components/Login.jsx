import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import UserPage from './UserPage.jsx';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			serverUsername: '',
			serverId: '',
			serverLogged: false,
			register: false,
		}
	}

	updatePassword = event => {
		this.setState({password: event.target.value});
	}

	updateUsername = event => {
		this.setState({username: event.target.value});
	}

	handleRegister = event => {
		event.preventDefault();
	}

	handleLogin = event => {
		event.preventDefault();
		axios.post('http://localhost:3010/api/login', {
			username: this.state.username,
			password: this.state.password,
		})
		.then(response => {
			this.setState({ 
				serverUsername: response.data.name,
				serverLogged: 	response.data.logged,
			});
			console.log(response.data);
		});
	}

	render(){
		if(this.state.serverLogged){
			return (
				<div>
					<Header username={this.state.serverUsername} />
					<UserPage username={this.state.serverUsername} /> 
				</div>
			);	
		} else if (this.state.register) { 
			console.log('Please register.');	
			return (
				<form onSubmit={this.handleRegister}>
				</form>
			);
		} else {
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
}

export default Login;
