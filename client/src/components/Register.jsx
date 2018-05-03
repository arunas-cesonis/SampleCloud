import React, { Component } from 'react';
import '../css/register.css';
import EmailInput from './EmailInput.jsx';
import PasswordInput from './PasswordInput.jsx';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            emailNotValid: false,
            password: '',
            passwordNotValid: false,
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }
    /*
    update(arg, event){
        console.log(arg);
    }
    */
    /*
    handleRegister(event){
        event.preventDefault();
        const username = this.username.value;
        const password = this.password.value;
        const email = this.password.email;
        let errorMsg = '';

        if(password.length < 6){
            console.log('Password is to short');
            this.setState({ passwordValid: true });
            errorMsg += 'Password must be at least 6 chars long.'
        } else {
            this.setState({ passwordValid: false });
        }
        if(errorMsg.length > 2){
            this.setState({ error: errorMsg });
        }
    }
    /////// THIS WAS INSIDE MY FORM /////////////
    //.... TO REVIEW ref={(ref) => {var = ref}} 
                <p>{this.state.error}</p>
                <input type='text' 
                    ref={(ref) => {this.username = ref}} 
                    placeholder='Username:' /> 
                <input type='password' 
                    className={classNames({ invalid: this.state.passwordValid})}
                    ref={(ref) => {this.password = ref}} 
                    placeholder='Password:' 
                /> 
    */
    handleForm(e){
        e.preventDefault();
        console.log('The form has been submitted.');
    }
    handleEmail(emailInputVal){
        const validatedEmail = emailInputVal;
        if(validatedEmail.match(/([.]net|[.]com)/) && 
            validatedEmail.indexOf("@") > -1 && 
            validatedEmail.match(/^[\S]+$/)){
            this.setState({ email: validatedEmail, emailNotValid: false });
            console.log('This is a valid email address.');
        } else {
            this.setState({ email: validatedEmail, emailNotValid: true });
            console.log('This email address considered to be invalid.');
        }
    }
    handlePassword(passwordInputVal){
        console.log('passwordInputVal: ', passwordInputVal);
        if(passwordInputVal.length > 6){
            this.setState({ password: passwordInputVal, passwordNotValid: false });
        } else {
            this.setState({ password: passwordInputVal, passwordNotValid: true });
        }
    }
	render(){
        const email = this.state.email;
        const emailNotValid = this.state.emailNotValid;
        const password = this.state.password;
        const passwordNotValid = this.state.passwordNotValid;

		return ( 
            <form onSubmit={this.handleForm}>
                <EmailInput
                    emailNotValid={emailNotValid}
                    emailCheck={this.handleEmail}
                    email={email}
                />
                <PasswordInput
                    passwordNotValid={passwordNotValid}
                    passwordCheck={this.handlePassword}
                    password={password}
                />
                <button>Submit</button>
            </form>
		);
	}
}

export default Register;
