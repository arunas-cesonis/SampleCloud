import React, { Component } from 'react';
import MiniPlayer from './MiniPlayer.jsx';
import Filter from './Filter.jsx';
import axios from 'axios';
import ParallaxImage from './ParallaxImage.jsx';
import './browse.css';

// Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: [],
      currentUser: '',
      value: '',
      filterCond: '',
      filterType: ''
    };
    this.listAllFiles = this.listAllFiles.bind(this);
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

  listAllFiles(files){
    console.log('Browser props: ', files[0]);
    this.setState({
      samples: files[0]
    });
  }

  render() {
    // To review Grid later
    return (
      <Grid 
        justify='center' 
        container 
        spacing={24}
      >
        <Grid item sm={12}>
          <ParallaxImage 
            image='http://localhost:3000/img/slide4.jpeg'
          />
          <Paper style={{ padding: '5px' }} >
            <Grid container justify='center'>
              <Grid item sm={10}>
                <Filter 
                  listAllFiles={this.listAllFiles}
                  filterGetData={this.filterGetData}
                  filterSearch={this.filterSearch}
                  value={this.state.value}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid  item sm={8} lg={6}>
          <Grid justify='center' container direction='row' spacing={8} >
            {this.state.samples.map((item, i) => 
            <Grid item sm={12} md={6} lg={6}>
             <MiniPlayer 
               sample={item}
               key={i} 
              />
            </Grid>)}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Browse;
