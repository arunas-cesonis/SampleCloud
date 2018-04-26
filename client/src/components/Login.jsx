import React, { Component } from 'react';
import axios from 'axios';
import UserPage from './UserPage.jsx';
import Register from './Register.jsx';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			serverUsername: '',
			serverId: '',
			serverSuccess: false,
			register: false,
		}
		this.updatePassword = this.updatePassword.bind(this);
		this.updateUsername = this.updateUsername.bind(this);
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

	handleRegisterButton = event => {
		event.preventDefault();
		this.setState({
			register: true,
		});
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
				serverSuccess: 	response.data.success,
			});
			console.log(response.data);
		});
	}

	render(){
		if(this.state.serverSuccess){
			return (
				<div>
					<UserPage username={this.state.serverUsername}
						logged={this.state.serverSuccess} /> 
				</div>
			);	
		} else if (this.state.register) { 
			console.log('Please register.');	
			return (
				<Register />
			);
		} else {
			return (
				<div>
					<h1>Login</h1>
					<form >
						<input type='text'
							onChange={this.updateUsername}	
							name='username' />
						<input type='password'
							onChange={this.updatePassword}	
							name='password' />
						<button type='submit' onClick={this.handleLogin}>
						Sign In
						</button>
					</form>
					<button type='submit' onClick={this.handleRegisterButton}>
					Register
					</button>
				</div>
			);
		}
	}
}

export default Login;



