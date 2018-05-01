import React, { Component } from 'react';
import classNames from 'classnames';
import '../css/register.css';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: 'email',
            password: '',
            username: '',
            formValid: false,
            passwordValid: '',
            error: '',
        };
    }
    /*
    update(arg, event){
        console.log(arg);
    }
    */
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
	render(){
		return (
            <form onSubmit={this.handleRegister.bind(this)}>
                <p>{this.state.error}</p>
                <input type='text' ref={(ref) => {this.username = ref}} placeholder='Username:' /> 
                <input type='password' 
                    className={classNames({ invalid: this.state.passwordValid})}
                    ref={(ref) => {this.password = ref}} 
                    placeholder='Password:' 
                /> 
                <input type='text' 
                    ref={(ref) => {this.email = ref}} 
                    placeholder='Email:' 
                /> 
                <button>Submit</button>
            </form>
		);
	}
}

export default Register;
