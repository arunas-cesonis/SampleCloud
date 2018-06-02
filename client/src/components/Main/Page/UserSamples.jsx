import React, { Component } from 'react';
import axios from 'axios';

class UserSamples extends Component {
  constructor(props){
    super(props);
    this.state = {
      samples: [],
      userAttr: []
    }
  }

  componentDidMount(){
    const url = 'http://localhost:3000/api/profile/' + this.props.user.username;
    axios.get(url).then(res => {
      console.log('RES: ', res.data);
      this.setState({ 
        samples: res.data.files, 
        userAttr: res.data.user
      });
    }); 
    console.log('UserSamples.jsx has mounted.');
  }

  render() {
    return (
      <div>
        <div>{'Samples:'}</div>
        <SampleBox
          samples={this.state.samples}
        />
        <div>{'User Attributes:'}</div>
        <UserProperties
          userAttr={this.state.userAttr}
        />
      </div>
    );
  }
}

const box = {
  display: 'inline-block',
  width: '200px',
  height: '100px',
  backgroundColor: 'red'
}

const SampleBox = (props) => (
  props.samples.map((item, i) =>
    <div style={box} key={i}>
      <p>{Object.values(item)}</p>
    </div>
  )
);

const UserProperties = (props) => (
  props.userAttr.map((item, i) =>
    <div key={i}>
      <p>{Object.values(item)}</p>
    </div>
  )
);

export default UserSamples
