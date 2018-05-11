import React, { Component } from 'react';
import axios from 'axios';
import Input from './LoginInput.jsx';

// THIS Class might need to be rewriten into something like 'Main' or etc.
class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			serverUsername: '',
			serverSuccess: false,
            error: '',
            title: '',
		}
		this.updatePassword = this.updatePassword.bind(this);
		this.updateUsername = this.updateUsername.bind(this);
        this.handleForm = this.handleForm.bind(this);
	}

	updatePassword(passwordInputVal) {
		this.setState({password: passwordInputVal});
	}

	updateUsername(usernameInputVal) {
		this.setState({username: usernameInputVal});
	}

	handleForm(e) {
		e.preventDefault();
		axios.post('http://localhost:3010/api/login', {
			username: this.state.username,
			password: this.state.password,
		}).then(response => {
			this.setState({ 
				serverUsername: response.data.name,
				serverSuccess: 	response.data.success,
			});
            if(!this.state.serverSuccess){
                this.setState({
                    error: 'Username and password combination is incorrect',
                })
            } else {
                //Object needs to be updated and polished.
                this.props.mountUserPage({
                    username: this.state.serverUsername, 
                    success: this.state.serverSuccess
                });
            }
		});
	}

    componentDidMount(){
        const reg = this.props.registered;
        if(reg){
            this.setState({ title: reg });
        } else {
            this.setState({ title: 'Login Form' });
        }
        console.log('Login.jsx, mounted');
    }

    componentWillUnmount(){
        // Clear some states and etc. To implement later.
        console.log('Login.jsx, UnMounted');
    }

	render(){
        const username = this.state.username;
        const password = this.state.password;
        const error = this.state.error;
        const title = this.state.title;

        return (
            <div>
                <fieldset>
                    <form>
                        <p>{title}</p>
                        <Input 
                            error={error}
                            type={'text'}
                            update={this.updateUsername}	
                            label={'Username:'} 
                            id={'username'}
                            val={username}
                        />
                        <Input
                            type={'password'}
                            update={this.updatePassword}	
                            label={'Password:'} 
                            id={'password'}
                            val={password}
                        />
                        <br />
                        <button 
                            type='submit' 
                            onClick={this.handleForm}
                        >
                        Sign In
                        </button>
                        <button 
                            type='submit' 
                            onClick={this.props.mountReg}
                        >
                        Sign Up
                        </button>
                    </form>
                </fieldset>
            </div>
        );
    }
}

export default Login;



