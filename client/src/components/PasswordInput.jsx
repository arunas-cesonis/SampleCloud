import React, { Component } from 'react';
import classNames from 'classnames';

class PasswordInput extends Component {
    constructor(props){
        super(props);
        this.handlePasswordCheck = this.handlePasswordCheck.bind(this);
    }
    handlePasswordCheck(e){
        this.props.passwordCheck(e.target.value);
    }
    render(){
        const password = this.props.password;
        const passwordNotValid = this.props.passwordNotValid;
        return(
            <input
                placeholder='Password:'
                type='password'
                className={classNames({ invalid: passwordNotValid })}
                onChange={this.handlePasswordCheck}
                value={password}
            />
        );
    }
}

export default PasswordInput;
