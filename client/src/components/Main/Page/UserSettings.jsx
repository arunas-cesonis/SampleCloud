import React, { Component } from 'react';
import PasswordChange from './PasswordChange.jsx';
import Avatar from './AvatarUpload.jsx';
import './settings.css';

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPwd: '',
      newPwd: '',
      confirmPwd: '',
      showAvatar: false,
      showPwdChange: false
    }
    this.handlePwdBtn = this.handlePwdBtn.bind(this);
    this.handlePwdClose = this.handlePwdClose.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.handleAvatarBtn = this.handleAvatarBtn.bind(this);
    this.handleAvatarClose = this.handleAvatarClose.bind(this);
  }

  handlePwdChange(){
    this.setState({ showPwdChange: false });
  }

  handlePwdClose() {
    this.setState({ showPwdChange: false });
  }

  handleAvatarClose(){
    this.setState({ showAvatar: false });
  }

  handleAvatarBtn() {
    this.setState({ 
      showPwdChange: false, 
      showAvatar: true 
    });
  }

  handlePwdBtn() {
    console.log('handlePwdBtn();'); 
    this.setState({ 
      showPwdChange: true, 
      showAvatar: false
    });
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
            <div className='upload_btn' onClick={this.handleAvatarBtn}>Upload Pic</div>
            <Avatar
              showAvatar={this.state.showAvatar}
              avatarClose={this.handleAvatarClose}
              user={details}
            />
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
