import React, { Component } from 'react';
import axios from 'axios';
import '../css/register.css';
import EmailInput from './EmailInput.jsx';
import PasswordInput from './PasswordInput.jsx';
import UsernameInput from './UsernameInput.jsx';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            emailNotValid: false,
            passwordNotValid: false,
            usernameNotValid: false,
            usernameFree: false,
            emailError: '',
            passswordError: '',
            usernameError: '',
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
    }
    /*
    handleRegister(event){
        // Access REF
        const password = this.password.value;
    }
    //.... TO REVIEW ref={(ref) => {var = ref}} 
                <input type='password' 
                    ref={(ref) => {this.password = ref}} 
                /> 
    */
    handleForm(e){
        e.preventDefault();
        const emailNotValid = this.state.emailNotValid; 
        const passwordNotValid = this.state.passwordNotValid; 
        const usernameNotValid = this.state.usernameNotValid; 
        console.log('From form: ', emailNotValid);
        this.setState({
            emailError: '',
            passwordError: '',
            usernameError: '',
        })
        if(passwordNotValid || this.state.password === ''){
            this.setState({
                passwordError: 'Password must be at least 6 chars long and contain an upper case.',
            })
        }
        if(emailNotValid || this.state.email === ''){
            this.setState({
                emailError: 'Please enter a valid email address.',
            })
        }
        if(usernameNotValid || this.state.username === ''){
            this.setState({
                usernameError: 'You can not use this name. Please choose another one.',
            })
        }
        console.log('The form has been submitted.');
    }
    handleEmail(emailInputVal){
        const validatedEmail = emailInputVal;
        if(validatedEmail.match(/([.]net|[.]com)/) && 
            validatedEmail.indexOf("@") > -1 && 
            validatedEmail.match(/^[\S]+$/)){
            this.setState({ 
                email: validatedEmail, 
                emailNotValid: false,
            });
            console.log('This is a valid email address.');
        } else {
            this.setState({ 
                email: validatedEmail, 
                emailNotValid: true,
            });
            console.log('This email address considered to be invalid.');
        }
    }
    handlePassword(passwordInputVal){
        const validatedPassword = passwordInputVal;
        console.log('passwordInputVal: ', validatedPassword);
        if(validatedPassword.length > 6 && validatedPassword.match(/[A-Z]/)){
            this.setState({ 
                password: validatedPassword, 
                passwordNotValid: false, 
            });
        } else {
            this.setState({ 
                password: validatedPassword, 
                passwordNotValid: true 
            });
        }
    }
    handleUsername(usernameInputVal){
        const usernameFree = this.state.usernameFree;
        this.setState({ username: usernameInputVal });
        axios.post('http://localhost:3010/api/checkUsername', {
            username: usernameInputVal, 
        }).then(response =>{
            this.setState({ usernameFree: response.data.free });
        });
        console.log('Username is free: ', usernameFree);
        if(usernameFree){
            this.setState({ usernameNotValid: false });
        } else {
            this.setState({ usernameNotValid: true });
        }
    }
	render(){
        const email = this.state.email;
        const password = this.state.password;
        const username = this.state.username;
        const emailNotValid = this.state.emailNotValid;
        const passwordNotValid = this.state.passwordNotValid;
        const usernameNotValid = this.state.usernameNotValid;

		return ( 
            <form onSubmit={this.handleForm}>
                <fieldset>
                <legend>Register Form</legend>
                    <p className='error_msg'>{this.state.emailError}</p>
                    <EmailInput
                        emailNotValid={emailNotValid}
                        emailCheck={this.handleEmail}
                        email={email}
                    />
                    <p className='error_msg'>{this.state.passwordError}</p>
                    <PasswordInput
                        passwordNotValid={passwordNotValid}
                        passwordCheck={this.handlePassword}
                        password={password}
                    />
                    <p className='error_msg'>{this.state.usernameError}</p>
                    <UsernameInput
                        usernameNotValid={usernameNotValid}
                        usernameCheck={this.handleUsername}
                        username={username}
                    />
                    <br />
                    <button>Submit</button>
                </fieldset>
                </form>
		);
	}
}

export default Register;
