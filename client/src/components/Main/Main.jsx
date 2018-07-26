import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import Header from './Header/Header.jsx';
import Page from './Page/Page.jsx';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';

class Main extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  constructor(props){
    super(props);
    const { cookies } = this.props;
    if(!cookies.get('session')){
      cookies.set('session', { id: Math.random().toString(12).slice(2) }, { path: '/' });
    }
    this.state = {
      alpha: 1,
      userData: {},
      userIn: false
    };
    this.handleAuthResponse = this.handleAuthResponse.bind(this);
    this.handleSliderAlpha = this.handleSliderAlpha.bind(this);
  }

  handleSliderAlpha(alpha) {
    console.log('handleSliderAlpha(): called.');
    this.setState({ alpha: alpha });
  }

  handleAuthResponse(auth){
    axios.get('/s').then(res => {
      const data = res.data;
      const userData = Object.assign({}, this.state.userData);
      userData.username = data.username;
      userData.avatar = data.avatar;
      userData.wallpaper = data.wallpapper;
      userData.email = data.email;
      userData.id = data.id;
      userData.connected = data.connected;
      console.log('Main did mount() get(/s): ', res.data);
      this.setState({ userData, userIn: auth });
    });
  }

  componentDidMount() {
    console.log('a');
    axios.get('/s').then(res => {
      const data = res.data;
      const userData = Object.assign({}, this.state.userData);
      userData.username = data.username;
      userData.avatar = data.avatar;
      userData.wallpaper = data.wallpapper;
      userData.email = data.email;
      userData.id = data.id;
      userData.connected = data.connected;
      console.log('Main did mount() get(/s): ', res.data);
      this.setState({ userData });
    });
  }

  render() {
    console.log('Cookies :', this.props.cookies.getAll());
    return (
      <div className='main_cont'>
        <h1>{this.state.userData.username}</h1>
        <Header 
          serverRes={this.state.userData} 
          userIn={this.state.userIn}
          alpha={this.state.alpha}
        />
        <Page 
          authResponse={this.handleAuthResponse} 
          user={this.state.userData}
          alpha={this.state.alpha}
          handleSliderAlpha={this.handleSliderAlpha}
        />
      </div>
    );
  }
}

export default withCookies(Main);
