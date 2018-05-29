import React, { Component } from 'react';
import Player from './Player.jsx';
import './home.css';
import axios from 'axios';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      samples: []
    }
  }

  componentDidMount(){
    console.log('Home.jsx mounted.');
    axios.get('http://localhost:3000/api/home').then(res => {
      console.log('GET /api/home: ', res.data);
      this.setState({ samples: res.data });
      
    });
  }

  render() {
    return (
      <div className='home_cont'>
        <div className='home_col1'></div>
        <div className='home_col2'>
          <div className='home_title'>Recent Uploads</div>
          {this.state.samples.map((item, i) => <Player
              key={i}
              sampleURL={item.filePath}
              username={item.username}
              sample={item.fileName}
              dateAdded={item.dateAdded}
            />
          )}
        </div>
        <div className='home_col3'></div>
      </div>
    );
  }
}

export default Home;