import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Input from './InputText.jsx';

const styles = {
  btnWidth: {
    width: '99px'
  }
}

const postToServer = (pwd, user) => {
  axios.post('http://localhost:3000/api/profile/pwd', {
    user: user, 
    newPwd: pwd
  }).then(res => {
  });
}

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
      errorMatch: ''
    }
    this.handleCurrentPwd = this.handleCurrentPwd.bind(this);
    this.handleConfirmPwd = this.handleConfirmPwd.bind(this);
    this.handleNewPwd = this.handleNewPwd.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.checkNewPwd = this.checkNewPwd.bind(this);
  }

  handlePwdChange(){
    const user = this.props.user;
    const { currentPwd } = this.state;
    console.log(
      'Current: ', this.state.currentPwd, '\n',
      'New: ', this.state.currentPwd, '\n',
      'Confirm: ', this.state.currentPwd, '\n',
    );
    if(user.password === currentPwd){
      this.setState({ 
        errorMsg: '',
        invalidCurrent: false 
      })
      this.checkNewPwd();
    } else {
      this.setState({
        errorMsg: 'Password is incorrect.\n',
        invalidCurrent: true
      })
    }
  }
  
  checkNewPwd(){
    const { newPwd, confirmPwd } = this.state;
    const user = this.props.user;
    if(confirmPwd === newPwd && newPwd.length > 5 && newPwd.match(/[A-Z]/)){
      console.log('good to go!');
      this.setState({
        errorMatch: '',
        invalidNew: false,
        invalidConfirm: false
      })
      postToServer(newPwd, user);
    } else {
      this.setState({
        errorMatch: 'Password is to week or did not match.\n',
        invalidNew: true,
        invalidConfirm: true
      })
    }
  }

  handleCurrentPwd(inputVal){
    this.setState({ currentPwd: inputVal });
    console.log('I: ', inputVal); 
  }

  handleNewPwd(inputVal){
    this.setState({ newPwd: inputVal });
  }
 
  handleConfirmPwd(inputVal){
    this.setState({ confirmPwd: inputVal });
  }

  render() {
    if(this.props.pwdChange){
      return (
        <Fragment>
          <div className='pwd_cont'>
            <p 
              style={{ 
                color: 'red', 
                fontSize: '10px', 
                padding: '4px' 
              }} 
            >{this.state.errorMsg}{this.state.errorMatch}</p>
            <Input
              id='currentPwd'
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
          <div className='pwd_buttons_cont'>
            <div 
              className='upload_btn' 
              style={ styles.btnWidth }
              onClick={this.handlePwdChange}
            >Submit</div>
            <div 
              className='upload_btn' 
              style={ styles.btnWidth } 
              onClick={this.props.pwdClose}
            >Cancel</div>
          </div>
        </Fragment>
      );
    } else {
      return null;
    }
  }
}

export default PasswordChange
