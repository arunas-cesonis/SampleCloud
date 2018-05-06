import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import { BrowserRouter } from 'react-router-dom';
import UserPage from './UserPage.jsx';

class Main extends Component {
    constructor(props){
        super(props);
        this.mountRegister = this.mountRegister.bind(this);
        this.regSuccess = this.regSuccess.bind(this);
        this.mountUserPage = this.mountUserPage.bind(this);
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
    }
    regSuccess(){
        ReactDOM.render((
            <Login 
                mountUserPage={this.mountUserPage}
                mountReg={this.mountRegister}
                registered={'Registration has been completed, you may login.'}
            />
        ), document.getElementById('login'));
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
        console.log('Mounting Main.');
        ReactDOM.render((
            <Login 
                mountUserPage={this.mountUserPage}
                mountReg={this.mountRegister}
            />
        ), document.getElementById('login'));
    }
    render(){
        return (
            <div>
                <h1>Main Class</h1>
            </div>
        );
    }
}

export default Main;
