import React, { Component } from 'react';
import axios from 'axios';
import UserPage from './UserPage.jsx';
import Register from './Register.jsx';
import LoginInput from './LoginInput.jsx';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			serverUsername: '',
			serverSuccess: false,
			register: false,
            error: '',
		}
		this.updatePassword = this.updatePassword.bind(this);
		this.updateUsername = this.updateUsername.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegisterButton = this.handleRegisterButton.bind(this);
	}

	updatePassword(passwordInputVal) {
		this.setState({password: passwordInputVal});
	}

	updateUsername(usernameInputVal) {
		this.setState({username: usernameInputVal});
	}

	handleRegisterButton(e) {
		e.preventDefault();
		this.setState({
			register: true,
		});
	}

	handleLogin(e) {
		e.preventDefault();
		axios.post('http://localhost:3010/api/login', {
			username: this.state.username,
			password: this.state.password,
		}).then(response => {
			this.setState({ 
				serverUsername: response.data.name,
				serverSuccess: 	response.data.success,
			});
		});
        if(!this.state.serverSuccess){
            this.setState({
                error: 'Username and password combination is incorrect',
            })
        }
	}

	render(){
        const username = this.state.username;
        const password = this.state.password;
        const error = this.state.error;
		if(this.state.serverSuccess){
			return (
				<div>
					<UserPage username={this.state.serverUsername}
						logged={this.state.serverSuccess} /> 
				</div>
			);	
		} else if (this.state.register) { 
			return (
				<Register />
			);
		} else {
			return (
				<div>
                    <fieldset>
                        <form>
                            <h1>Login</h1>
                            <LoginInput 
                                error={error}
                                type={'text'}
                                update={this.updateUsername}	
                                label={'Username:'} 
                                id={'username'}
                                val={username}
                            />
                            <LoginInput
                            type={'password'}
							update={this.updatePassword}	
                            label={'Password:'} 
                            id={'password'}
                            val={password}
                            />
                            <button 
                                type='submit' 
                                onClick={this.handleLogin}
                            >
						    Sign In
						    </button>
					        <button 
                                type='submit' 
                                onClick={this.handleRegisterButton}
                            >
                            Sign Up
                            </button>
					    </form>
                    </fieldset>
				</div>
			);
		}
	}
}

export default Login;



