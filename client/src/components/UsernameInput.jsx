import React, { Component } from 'react';
import classNames from 'classnames';

class UsernameInput extends Component {
    constructor(props){
        super(props);
        this.handleUsernameCheck = this.handleUsernameCheck.bind(this);
    }
    handleUsernameCheck(e){
        this.props.usernameCheck(e.target.value);
    }
    render(){
        const username = this.props.username;
        const usernameNotValid = this.props.usernameNotValid;
        return(
            <input
                placeholder={'Username:'}
                className={classNames({ invalid: usernameNotValid })} 
                onChange={this.handleUsernameCheck}
                value={username}
            />
        );
    }   
}

export default UsernameInput;
