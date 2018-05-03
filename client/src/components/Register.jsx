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
            passswordError: '',
            emailError: '',
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
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
        const passwordNotValid = this.state.passwordNotValid; 
        const emailNotValid = this.state.emailNotValid; 
        console.log('From form: ', emailNotValid);
        if(passwordNotValid){
            this.setState({
                passwordError: 'Password must be at least 6 chars long and contain an upper case.',
            })
        }
        if(emailNotValid){
            this.setState({
                emailError: 'Please enter a valid email address.',
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
	render(){
        const email = this.state.email;
        const emailNotValid = this.state.emailNotValid;
        const password = this.state.password;
        const passwordNotValid = this.state.passwordNotValid;

		return ( 
            <fieldset>
                <legend>Register Form</legend>
                <form onSubmit={this.handleForm}>
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
                    <button>Submit</button>
                </form>
            </fieldset>
		);
	}
}

export default Register;
