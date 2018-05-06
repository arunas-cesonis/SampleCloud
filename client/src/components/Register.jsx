import React, { Component } from 'react';
import axios from 'axios';
import Input from './RegInput.jsx';
import Login from './Login.jsx';

function test(a){
    console.log(a);
}

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
            regSuccess: false,
            redirectLogin: false,
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleRegOk = this.handleRegOk.bind(this);
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
        test('lalal');
        const email = this.state.email;
        const password = this.state.password;
        const username = this.state.username;
        const emailNotValid = this.state.emailNotValid; 
        const passwordNotValid = this.state.passwordNotValid; 
        const usernameNotValid = this.state.usernameNotValid; 
        this.setState({
            emailError: '',
            passwordError: '',
            usernameError: '',
        })
        if(passwordNotValid || this.state.password === ''){
            this.setState({
                passwordNotValid: true,
                passwordError: 'Password must be at least 6 chars long and contain an upper case.',
            })
        }
        if(emailNotValid || this.state.email === ''){
            this.setState({
                emailNotValid: true,
                emailError: 'Please enter a valid email address.',
            })
        }
        if(usernameNotValid || this.state.username === ''){
            this.setState({
                usernameNotValid: true,
                usernameError: 'You can not use this name. Please choose another one.',
            })
        }
        if(!usernameNotValid && !passwordNotValid && !emailNotValid && username.lenght > 2){
            console.log('The form has been submitted.');
            /// POST TO server.js.
            console.log('Push to DB.');
            axios.post('/api/reg/received', {
                username: username,
                email: email,
                password: password,
            }).then(response => {
                console.log('res: ', response.data);
            });
            this.setState({ 
                regSuccess: true, 
                username: '',
                password: '',
                email: '',
            });
        } else {
            console.log('Failed!');
        }
    }
    handleEmail(emailInputVal){
        const validatedEmail = emailInputVal;
        if(validatedEmail.match(/([.]net|[.]com)|[.]co[.]uk|[.]live|[.]lt|[.]io/) && 
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
        if(passwordInputVal.length > 6 && passwordInputVal.match(/[A-Z]/)){
            this.setState({ 
                password: passwordInputVal, 
                passwordNotValid: false, 
            });
        } else {
            this.setState({ 
                password: passwordInputVal, 
                passwordNotValid: true 
            });
        }
    }
    handleUsername(usernameInputVal){
        const usernameFree = this.state.usernameFree;
        this.setState({ username: usernameInputVal });
        axios.post('http://localhost:3010/api/checkUsername', {
            username: usernameInputVal, 
        }).then(response => {
            this.setState({ usernameFree: response.data.free });
        });
        if(usernameFree){
            this.setState({ usernameNotValid: false });
        } else {
            this.setState({ usernameNotValid: true });
        }
    }
    handleRegOk(e){
        e.preventDefault();
        this.setState({ 
            redirectLogin: true, 
            regSuccess: false,
        });
    }
    validationHelper(valid, itemState){
        /// TO IMPLEMENT LATER
    }
	render(){
        const email = this.state.email;
        const password = this.state.password;
        const username = this.state.username;
        const emailNotValid = this.state.emailNotValid;
        const passwordNotValid = this.state.passwordNotValid;
        const usernameNotValid = this.state.usernameNotValid;
        const regSuccess = this.state.regSuccess;
        const redirectLogin = this.state.redirectLogin;
        if(regSuccess){
            return (
                <div>
                    <h1>Form has been submitted.</h1>
                    <button onClick={this.handleRegOk}>OK</button>
                </div>
            );
        } else if(redirectLogin){
            return (
                <Login />
            );
        }
		return ( 
            <form onSubmit={this.handleForm}>
                <fieldset>
                <legend>Register Form</legend>
                    <h1>Part 2</h1>
                    <Input
                        label={'Username:'}
                        id={'username'}
                        error={this.state.usernameError}
                        type={'text'}
                        notValid={usernameNotValid}
                        check={this.handleUsername} 
                        val={username}
                    />
                    <Input
                        label={'Email:'}
                        id={'email'}
                        error={this.state.emailError}
                        type={'text'}
                        notValid={emailNotValid}
                        check={this.handleEmail} 
                        val={email}
                    />
                    <Input
                        label={'Password:'}
                        id={'password'}
                        error={this.state.passwordError}
                        type={'password'}
                        notValid={passwordNotValid}
                        check={this.handlePassword} 
                        val={password}
                    />
                    <br />
                    <button>Submit</button>
                </fieldset>
                </form>
		);
	}
    componentDidMount(){
        console.log('Register.jsx has been mounted.');
    }
}

export default Register;
