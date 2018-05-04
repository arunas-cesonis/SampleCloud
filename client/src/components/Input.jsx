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
        const type = this.props.type;
        const error = this.props.error;
        const id = this.props.id;
        const label = this.props.label;
        return(
            <div>
                <p className='error_msg'>{error}</p>
                <label htmlFor={id}>{label}</label>
                <br />
                <input
                    id={id}
                    type={type}
                    className={classNames({ invalid: notValid })} 
                    onChange={this.handleCheck}
                    value={username}
                />
            </div>
        );
    }   
}

export default Input;
