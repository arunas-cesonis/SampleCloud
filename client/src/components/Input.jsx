import React, { Component } from 'react';
import classNames from 'classnames';

class Input extends Component {
    constructor(props){
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
    }
    handleCheck(e){
        this.props.check(e.target.value);
    }
    render(){
        const username = this.props.username;
        const notValid = this.props.notValid;
        const placeholder = this.props.label;
        const type = this.props.type;
        return(
            <input
                type={type}
                placeholder={placeholder}
                className={classNames({ invalid: notValid })} 
                onChange={this.handleCheck}
                value={username}
            />
        );
    }   
}

export default Input;
