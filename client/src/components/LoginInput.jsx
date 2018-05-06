import React, { Component } from 'react';

class LoginInput extends Component {
    constructor(props){
        super(props);
        this.update = this.update.bind(this);
    }
    update(e){
        this.props.update(e.target.value);
    }
    render(){
        const val = this.props.val;
        const type = this.props.type;
        const id = this.props.id;
        const label = this.props.label;
        return (
            <div>
                <label htmlFor={id}>{label}</label>
                <br />
                <input
                    id={id}
                    type={type}
                    onChange={this.update}
                    value={val}
                />
            </div>
        );
    }
}

export default LoginInput;