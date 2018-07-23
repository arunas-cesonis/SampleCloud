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
      register: false,
      error: '',
      fade: 0.6,
      title: 'Login Form'
    };
    this.updatePassword = this.updatePassword.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.mountReg = this.mountReg.bind(this);
    this.regSuccess = this.regSuccess.bind(this);
  }

  updatePassword(passwordInputVal) {
    this.setState({ fade: 1, password: passwordInputVal });
  }

  updateUsername(usernameInputVal) {
    this.setState({ username: usernameInputVal });
  }

  handleForm(e) {
    e.preventDefault();
    console.log('handleForm(); called.');
    axios
      .post('/api/login', {
        //BYPASS Login
        /* 
        username: 'paul', 
        password: 'a' 
        */
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        const data = Object.assign({}, res.data);
        console.log('User Account: ', res.data);
        console.log('USER ID: ', res.data._id);

        if (data._id) {
          //Object needs to be updated and polished.
          this.props.history.push('/');
          this.props.authResponse(
            true, 
            data
          );
        } else {
          this.setState({
            error: 'Username and password combination is incorrect'
          });
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
    this.props.handleSliderAlpha(0.3);
    this.setState({ title: 'Login Form' });
  }

  handleFade(){
    this.setState({ fade: 1 });
    console.log('FOOCUS:');
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
      <div className='login_cont' >
        <div className='login_wrapper'
          style={{ opacity: this.state.fade }}
              onClick={this.handleFade.bind(this)}
        >
        <div className='login_title'>{title}</div>
        <div className='login_form'>
          <form onKeyPress={(e) => { if(e.key === 'Enter') this.handleForm(e) }}>
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
            <div 
              className="login_button" 
              onClick={this.handleForm}
            >Sign In</div>
            <div 
              className="login_button" 
              onClick={this.mountReg}
            >Sign Up</div>
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
