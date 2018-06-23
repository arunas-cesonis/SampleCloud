import React, { Component } from 'react';
import PasswordChange from './PasswordChange.jsx';
import './settings.css';

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPwd: '',
      newPwd: '',
      confirmPwd: '',
      showPwdChange: false
    }
    this.handlePwdBtn = this.handlePwdBtn.bind(this);
    this.handlePwdClose = this.handlePwdClose.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
  }

  handlePwdChange(){
    this.setState({ showPwdChange: false });
  }

  handlePwdClose() {
    this.setState({ showPwdChange: false });
  }

  handlePwdBtn() {
    console.log('handlePwdBtn();'); 
    this.setState({ showPwdChange: true });
  }

  render() {
    const details = this.props.user;
    console.log(this.props.user);
    return (
      <div className='settings_wrap'>
        <div className='settings_cont'>
          <div className='settings_left'>
            <div className='avatar'>Profile Picture</div>
            <div className='avatar_username'>{details.username}</div>
          </div>
          <div className='settings_right'>
            <div className='upload_btn'>Upload Pic</div>
            <div className='upload_btn' onClick={this.handlePwdBtn}>Change Password</div>
            <PasswordChange 
              updated={this.handlePwdChange}
              pwdChange={this.state.showPwdChange}
              pwdClose={this.handlePwdClose}
              user={details}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserSettings
