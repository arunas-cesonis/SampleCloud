import React, { Component } from 'react';
import classNames from 'classnames';

class EmailInput extends Component {
    constructor(props){
        super(props);
        this.handleEmailCheck = this.handleEmailCheck.bind(this);
    }
    handleEmailCheck(e){
        this.props.emailCheck(e.target.value);
    }
    render(){
        const emailNotValid = this.props.emailNotValid;
        const email = this.props.email;
        console.log('email valid?: ', emailNotValid);
        return(
            <input 
                placeholder='Email Address:'
                className={classNames({ invalid: emailNotValid})}
                onChange={this.handleEmailCheck}
                value={email}
            />
        );
    }
}

export default EmailInput
