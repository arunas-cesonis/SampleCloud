import React, { Component } from 'react';
import classNames from 'classnames';
import '../css/register.css';
import EmailInput from './EmailInput.jsx';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            emailValid: false,
            /* OLD STUFF
            email: 'email',
            password: '',
            username: '',
            formValid: false,
            passwordValid: '',
            error: '',
            */
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handleForm = this.handleForm.bind(this);
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
                <p>{this.state.error}</p>
                <input type='text' 
                    ref={(ref) => {this.username = ref}} 
                    placeholder='Username:' /> 
                <input type='password' 
                    className={classNames({ invalid: this.state.passwordValid})}
                    ref={(ref) => {this.password = ref}} 
                    placeholder='Password:' 
                /> 
                <input type='text' 
                    ref={(ref) => {this.email = ref}} 
                    placeholder='Email:' 
                /> 
    */
    handleForm(e){
        e.preventDefault();
        console.log('form has been submitted.');
    }
    handleEmail(emailInputVal){
        const validatedEmail = emailInputVal;
        if(validatedEmail.match(/([.]net|[.]com)/) && validatedEmail.indexOf("@") > -1 && validatedEmail.match(/^[\S]+$/)){
            this.setState({ email: validatedEmail, emailValid: false });
            console.log('This is a valid email address.');
        } else {
            this.setState({ email: validatedEmail, emailValid: true });
            console.log('This email address considered to be invalid.');
        }
    }
	render(){
        const email = this.state.email;
        const emailValid = this.state.emailValid;
		return ( 
            <form onSubmit={this.handleForm}>
                <EmailInput
                    emailValid={emailValid}
                    emailCheck={this.handleEmail}
                    email={email}
                />
                <button>Submit</button>
            </form>
		);
	}
}

export default Register;
