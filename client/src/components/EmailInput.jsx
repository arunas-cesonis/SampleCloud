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
        const emailValid = this.props.emailValid;
        const email = this.props.email;
        console.log('email valid?: ', emailValid);
        return(
            <input 
                className={classNames({ invalid: emailValid})}
                onChange={this.handleEmailCheck}
                value={email}
            />
        );
    }
}

export default EmailInput
