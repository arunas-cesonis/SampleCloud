import React, { Component, Fragment } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Input from './InputText.jsx';

class PasswordChange extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPwd: '',
      newPwd: '',
      confirmPwd: '',
      invalidCurrent: false,
      invalidNew: false,
      invalidConfirm: false,
      errorMsg: '',
      errorMatch: '',
      success: false
    }
    this.handleCurrentPwd = this.handleCurrentPwd.bind(this);
    this.handleConfirmPwd = this.handleConfirmPwd.bind(this);
    this.handleNewPwd = this.handleNewPwd.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.checkNewPwd = this.checkNewPwd.bind(this);
    this.postToServer = this.postToServer.bind(this);
    this.passwordUpdated = this.passwordUpdated.bind(this);
  }

  handlePwdChange(){
    const user = this.props.user;
    const { success, currentPwd } = this.state;
    if(!success) {
      axios.post('/api/verify', {
        password: currentPwd
      }).then(res => {
        if(res.data.encrypted === user.password) {
          console.log('You got it right, man!');
          this.setState({ 
            errorMsg: '',
            invalidCurrent: false 
          });
          this.checkNewPwd();
        } else {
          this.setState({
            errorMsg: 'Password is incorrect.\n',
            invalidCurrent: true
          });
        } 
      });
    }
  }
  
  checkNewPwd(){
    const { newPwd, confirmPwd } = this.state;
    const user = this.props.user;
    if(confirmPwd === newPwd && newPwd.length > 0 ) { // while testing // && newPwd.match(/[A-Z]/)){
      console.log('good to go!');
      this.setState({
        errorMatch: '',
        invalidNew: false,
        invalidConfirm: false
      })
      this.postToServer(newPwd, user);
    } else {
      this.setState({
        errorMatch: 'Password is to week or did not match.\n',
        invalidNew: true,
        invalidConfirm: true
      })
    }
  }

  postToServer = (pwd, user) => {
    axios.post('/api/profile/pwd', {
      user: user, 
      newPwd: pwd
    }).then(res => {
      if(res.data.updated){
        this.passwordUpdated();
      } else {
        this.setState({ errorMsg: 'Could not update your password. Please try again later.' })
      }
    });
  }

  passwordUpdated() {
    this.setState({
      currentPwd: '',
      newPwd: '',
      confirmPwd: '',
      notifyMsg: 'Password has been successfully updated. This page will refresh shortly.',
      success: true
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  handleCurrentPwd(inputVal){
    this.setState({ 
      currentPwd: inputVal, 
    });
  }

  handleNewPwd(inputVal){
    this.setState({ newPwd: inputVal });
  }
 
  handleConfirmPwd(inputVal){
    this.setState({ confirmPwd: inputVal });
  }

  render() {
    return (
      <Fragment>
        <div className='password_wrap'>
          <div className='settings_section_title'>Change Your Password:</div>
          <div className='line'></div>
          <div className='password_cont'>
            <p 
              style={{ 
                color: 'red', 
                fontSize: '10px', 
                padding: '4px', 
                textAlign: 'center'
              }} 
            >{this.state.errorMsg}{this.state.errorMatch}</p>
            <p 
              style={{ 
                color: '#6aabb7', 
                fontSize: '10px', 
                padding: '4px',
                textAlign: 'center'
              }} 
            >{this.state.notifyMsg}</p>
            <Input
              id='currentPwd'
              value={this.state.value}
              label='Current Password'
              type='password'
              width='200px'
              update={this.handleCurrentPwd}
              valid={this.state.invalidCurrent}
            />
            <Input
              id='newPwd'
              label='New Password'
              type='password'
              width='200px'
              update={this.handleNewPwd}
              valid={this.state.invalidNew}
            />
            <Input
              id='confirmPwd'
              label='Confirm Password'
              type='password'
              width='200px'
              update={this.handleConfirmPwd}
              valid={this.state.invalidConfirm}
            />
          </div>
          <div className='settings_btn_cont'>
            <div 
              className={classNames('settings_btn', { disabled: this.state.success })} 
              onClick={this.handlePwdChange}
            >Submit</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PasswordChange
