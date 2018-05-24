import React, { Component } from 'react';
import UsersList from './UsersList.jsx';
import FilesList from './FilesList.jsx';
import FilterResults from './FilterResults.jsx';
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
      sampleURL: '',
      username: '',
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
    this.setState({ sampels: [],  });
    console.log('Filter: ', filterArg);
    axios
      .post('http://localhost:3010/api/browse/search', {
        searchInput: filterArg 
      })
      .then(res => {
        const data = res.data;
        console.log('D: ', data);
        if(data){
          this.setState({
            samples: Object.values(data), 
            username: '',
            value: filterArg 
          })
        }
      });
  }

  filterGetData(filterArg){
    this.setState({ sampels: [], value: '' });
    axios
      .post('http://localhost:3010/api/browse/getfiles', {
        arg: filterArg 
      })
      .then(res => {
        const data = res.data;
        console.log('GetData: ', data);
        this.setState({
          samples: Object.values(data), 
          username: ''
        });
      });
  }

  render() {
    const sampleURL = this.state.sampleURL;
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
            username={this.state.username}
            sample={item}
          />)}
        </div>
      </div>
    );
  }
}

export default Browse;
