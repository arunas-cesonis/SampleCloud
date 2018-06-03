import React, { Component } from 'react';
import Player from './Player.jsx';
import Filter from './Filter.jsx';
import axios from 'axios';
import './browse.css';

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: [],
      currentUser: '',
      value: ''
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.filterGetData = this.filterGetData.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
  }

  handlePlay(sampleURL) {
    console.log('From Browse.jsx: ', sampleURL);
    this.setState({ sampleURL: sampleURL });
  }

  filterSearch(filterArg){
    this.setState({ sampels: [] });
    console.log('Filter: ', filterArg);
    axios.post('http://localhost:3010/api/browse/search', {
        searchInput: filterArg 
    }).then(res => {
      const data = res.data;
      console.log('D: ', data);
      if(data){
        this.setState({
          samples: data, 
          value: filterArg 
        })
      }
    });
  }

  filterGetData(filterArg){
    this.setState({ sampels: [], value: '' });
    axios.post('http://localhost:3010/api/browse/getfiles', {
        arg: filterArg 
    }).then(res => {
      const data = res.data;
      console.log('GetData: ', data.map((item, i) => item.fileName));
      this.setState({
        samples: data 
      });
    });
  }

  render() {
    return (
      <div className="br_container">
        <div className="br_middle">
          <Filter 
            filterGetData={this.filterGetData}
            filterSearch={this.filterSearch}
            value={this.state.value}
          />
          {this.state.samples.map((item, i) => <Player 
            key={i} 
            username={item.username}
            sample={item.friendlyName}
            sampleURL={item.filePath}
            dateAdded={item.dateAdded}
            noControls={'none'}
          />)}
        </div>
      </div>
    );
  }
}

export default Browse;
