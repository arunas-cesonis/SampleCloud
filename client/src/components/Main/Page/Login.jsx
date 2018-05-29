import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import Register from './Register.jsx';
import Input from './LoginInput.jsx';

// THIS Class might need to be rewriten into something like 'Main' or etc.
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      serverUsername: '',
      serverSuccess: false,
      register: false,
      error: '',
      title: 'Login Form'
    };
    this.updatePassword = this.updatePassword.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.mountReg = this.mountReg.bind(this);
    this.regSuccess = this.regSuccess.bind(this);
  }

  updatePassword(passwordInputVal) {
    this.setState({ password: passwordInputVal });
  }

  updateUsername(usernameInputVal) {
    this.setState({ username: usernameInputVal });
  }

  handleForm(e) {
    e.preventDefault();
    axios
      .post('http://localhost:3010/api/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        this.setState({
          serverUsername: response.data.name,
          serverSuccess: response.data.success
        });
        if (!this.state.serverSuccess) {
          this.setState({
            error: 'Username and password combination is incorrect'
          });
        } else {
          //Object needs to be updated and polished.
          this.props.history.push('/');
          this.props.authResponse(
            this.state.serverSuccess, 
            this.state.serverUsername 
          );
        }
      });
  }

  mountReg() {
    console.log('mountReg(); called.');
    this.setState({ register: true });
  }

  regSuccess() {
    console.log('regSuccess(); called.');
    this.setState({ 
      title: 'You have successfully registered.',
      register: false
    });
  }

  componentDidMount() {
    this.setState({ title: 'Login Form' });
    this.props.handleSliderAlpha(0.3);
  }

  render() {
    const username = this.state.username;
    const password = this.state.password;
    const error = this.state.error;
    const title = this.state.title;

    if(this.state.register){
      return (
        <Register 
          regSuccess={this.regSuccess}
        />
      );
    } else {
    return (
      <div className='login_cont'>
        <div className='login_wrapper'>
        <div className='login_title'>{title}</div>
        <div className='login_form'>
          <form>
            <Input
              error={error}
              type={'text'}
              update={this.updateUsername}
              label={'Username:'}
              id={'username'}
              val={username}
            />
            <Input
              type={'password'}
              update={this.updatePassword}
              label={'Password:'}
              id={'password'}
              val={password}
            />
            <br />
            <button type="submit" onClick={this.handleForm}>
              Sign In
            </button>
            <button type="submit" onClick={this.mountReg}>
              Sign Up
            </button>
          </form>
        </div>
        </div>
      </div>
    );
    }
  }
  componentWillUnmount() {
    // Clear some states and etc. To implement later.
    console.log('Login.jsx, UnMounted');
    this.props.handleSliderAlpha(1);
  }
}

export default withRouter(Login);