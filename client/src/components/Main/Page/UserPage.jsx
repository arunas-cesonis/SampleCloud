import React, { Component } from 'react';
import axios from 'axios';

class UserPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: [],
      files: []
    }
  }
  
  componentDidMount() {
    const userURL = 'http://localhost:3010/api/user/' + this.props.match.params.name;
    axios.get(userURL).then(res => {
      const user = res.data.user;
      console.log('U: ', user);
      this.setState({ 
        user: res.data.user,
        files: res.data.files
      });
    });
  }

  render() {
    console.log('MP all: ', this.props.match.params );
    return (
      <div>
        <p>{this.state.user.password}</p>
      </div>
    );
  }
}

export default UserPage;
