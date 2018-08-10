import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import Header from './Header/Header';
// To review later (auth.js);
import { verifyJWT } from '../../js/Auth';
import Page from './Page/Page';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';


class Main extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  constructor(props){
    super(props);
    this.state = {
      alpha: 1,
      userData: {},
    };
    this.handleAuthResponse = this.handleAuthResponse.bind(this);
    this.handleSliderAlpha = this.handleSliderAlpha.bind(this);
  }

  handleSliderAlpha(alpha) {
    console.log('handleSliderAlpha(): called.');
    this.setState({ alpha: alpha });
  }

  handleAuthResponse(auth, session){
    const data = verifyJWT(session.token, session.secret);
    this.setState({ userData: data }); 
  }

  componentDidMount() {
    const { cookies } = this.props;
    if(cookies.get('session')) {
      axios.get('/api/session').then(res => {
        const data = verifyJWT(res.data.token, res.data.secret);
        console.log('DATA: ', data);
        this.setState({ userData: data });
      });
    } else { 
      console.log('Where is my cookie? Get a cookie and come back for more.');
    }
  }

  render() {
    return (
      <div className='main_cont'>
        <h1>{this.state.userData.username}</h1>
        <Header 
          serverRes={this.state.userData} 
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

export default withRouter(withCookies(Main));
