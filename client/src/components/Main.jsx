import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserPage from './UserPage.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import { BrowserRouter } from 'react-router-dom'


class Main extends Component {
    constructor(props){
        super(props);
        this.mountRegister = this.mountRegister.bind(this);
        this.regSuccess = this.regSuccess.bind(this);
        this.mountUserPage = this.mountUserPage.bind(this);
        this.mountLogin = this.mountLogin.bind(this);
    }

    mountLogin(newUser){
        let msg = '';
        if(newUser){
            msg = 'Registration has been completed, you may login.';
        }
        ReactDOM.render((
            <Login 
                mountUserPage={this.mountUserPage}
                mountReg={this.mountRegister}
                registered={msg}
            />
        ), document.getElementById('login'));
    }

    mountUserPage(userDetails){
        console.log('trying to mount user page');
        ReactDOM.render((
            <BrowserRouter>
                    <UserPage
                        username={userDetails.username}
                        logged={userDetails.success}
                    />
                </BrowserRouter>
        ), document.getElementById('userpage'));
        ReactDOM.unmountComponentAtNode(document.getElementById('login'));
        ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    }

    regSuccess(){
        this.mountLogin(true);
        ReactDOM.unmountComponentAtNode(document.getElementById('reg'));
    }
    
    mountRegister(e){
        e.preventDefault();
        console.log('Mounting Register.');
        ReactDOM.render((
            <Register 
                regSuccess={this.regSuccess}
            />
        ), document.getElementById('reg'));
        ReactDOM.unmountComponentAtNode(document.getElementById('login'));
    }

    componentDidMount(){
        console.log('Main.jsx Mounted.');
        this.mountLogin(false);
    }

    render() {
        return (
            <div>
                <h1>Main Class</h1>
            </div>
        );
    }

    componentWillUnmount(){
        console.log('Main.jsx UnMounted.');
    }
}

export default Main;