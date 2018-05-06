import React, { Component } from 'react';
import axios from 'axios';
import UserPage from './UserPage.jsx';
import Register from './Register.jsx';
import Input from './LoginInput.jsx';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

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
        this.mountUserPage = this.mountUserPage.bind(this);
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
                this.mountUserPage();
            }
		});
	}
    mountRegister(){
        ReactDOM.render(<Register />, document.getElementById('reg'));
        ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    }
    mountUserPage(){
                console.log('trying to mount user page');
        ReactDOM.render((
            <BrowserRouter>
                <UserPage
                        username={this.state.serverUsername}
                        logged={this.state.serverSuccess} 
                />
            </BrowserRouter>
        ), document.getElementById('userpage'));
        //Main class should be linked with the 'root' html element
        ReactDOM.unmountComponentAtNode(document.getElementById('root'));

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
                            onClick={this.mountRegister.bind(this)}
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



