import React, { Component } from 'react';
import Player from './Player.jsx';
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
      <div>
        <h1>Most Recent Sample Uploads</h1>
        {this.state.samples.map((item, i) => <Player
            key={i}
            sampleURL={item.filePath}
            username={item.username}
            sample={item.fileName}
            dateAdded={item.dateAdded}
          />
        )}
      </div>
    );
  }
}

export default Home;
