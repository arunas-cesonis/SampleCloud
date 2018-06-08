import React, { Component } from 'react';
import MiniPlayer from './MiniPlayer.jsx';
import Filter from './Filter.jsx';
import axios from 'axios';
import './browse.css';

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: [],
      currentUser: '',
      value: '',
      filterCond: '',
      filterType: '',
      selectUser: '',
      selectCat: ''
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.filterGetData = this.filterGetData.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
  }

  handlePlay(sampleURL) {
    console.log('From Browse.jsx: ', sampleURL);
    this.setState({ sampleURL: sampleURL });
  }

  filterSearch(filterInputVal){
    this.setState({ samples: [] });
    console.log('Filter: ', filterInputVal);
    axios.post('http://localhost:3010/api/browse/search', {
      searchInput: filterInputVal, 
      searchCond: this.state.filterCond, 
      searchType: this.state.filterType
    }).then(res => {
      const data = res.data;
      console.log('D: ', data);
      if(data){
        this.setState({
          samples: data, 
          value: filterInputVal 
        })
      }
    });
  }

  filterGetData(filterInputVal, type){
    this.setState({ 
      samples: [], 
      value: '',
      filterCond: filterInputVal,
      filterType: type
    });
    // To review later
    if(type === 'username') { 
      this.setState({ 
        selectCat: '', 
        selectUser: filterInputVal 
      });
    }
    if(type === 'category') { 
      this.setState({ 
        selectCat: filterInputVal, 
        selectUser: '' 
      });
    }
    if(type === 'category') this.setState({ unSelectUser: '' });
    console.log('Filter Type: ', type);
    axios.post('http://localhost:3010/api/browse/getfiles', {
      type: type, 
      val: filterInputVal 
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
            selectCat={this.state.selectCat}
            selectUser={this.state.selectUser}
            filterGetData={this.filterGetData}
            filterSearch={this.filterSearch}
            value={this.state.value}
          />
          {this.state.samples.map((item, i) => <MiniPlayer 
            sample={item}
            key={i} 
          />)}
        </div>
      </div>
    );
  }
}

export default Browse;
