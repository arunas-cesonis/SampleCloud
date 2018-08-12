import React, { Component } from 'react';
import axios from 'axios';
import MiniPlayer from './MiniPlayer';
import Paper from '@material-ui/core/Paper';
import Upload from './Upload';
import './wallpaper.css';
import './userpage.css';

class UserPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: [],
      categories: [],
      files: ['', ''],
      catFiles: [],
      getUser: true
    }
    this.handleCatClick = this.handleCatClick.bind(this);
  }

  //Should I consider transferring functions to the another component? 
  //Something to review later 
  handleCatClick(cat) {
    const { files } = this.state;
    const tmpArr = [];
    for(let i in files){
      if(files[i].category.indexOf(cat) > -1){
        tmpArr.push(files[i]);
      }
    }
    this.setState({ catFiles: tmpArr });
  }
  
  componentDidMount() {
    const { categories, files } = this.state;
    const { user } = this.props;
    axios.get('/api/userhome').then(res => {
      this.setState({
        user: res.data.user,
        files: res.data.files,
        catFiles: res.data.files,
      });
      if(files.length > -1) {
        for(let i in files){
          if(categories.indexOf(files[i].category) === -1){
            categories.push(files[i].category);
          }
        }
      } else {
        console.log('ERROR: Files[] is empty');
      }
    });
  }

  /// MOVE CATEGORIES TO ANOTHER COMPONENT LIKE <Upload />
  render() {
    console.log('UserPage render(); has been called');
    return (
      <div className='user_wrap'>
        <Wallpaper
          image={this.state.user.wallpaper}
          name={this.state.user.username}
        />
        <div 
          className='user_avatar'
          style={{ backgroundImage: 'url(' + this.state.user.avatar + ')' }}
        ></div>
        <div className='user_cont'>
          <div className='user_left'>
            <div className='spacing10'></div>
            <Paper
              style={{ width: '80%', margin: '0 auto' }}
            >
              <div className='categories_cont'>
                  <div className='up_title1'>Categories:</div>
                {this.state.categories.map((item, i) => 
                  <div 
                    onClick={(e) => this.handleCatClick(item)}
                    className='category_btn' 
                  key={i}
                >{item}</div>
                )}
              </div>
            </Paper>
            <div className='spacing10'></div>
            <Paper
              style={{ width: '80%', margin: '0 auto' }}
            >
              <div className='up_title1' style={{ padding: '10px 0', marginLeft: '20px' }}>Showing: {this.state.catFiles.length}</div>
            </Paper>
            <div className='spacing10'></div>
            <Paper
              style={{ width: '80%', margin: '0 auto', height: 'auto'}}
            >
              <Upload 
                user={this.state.user}
              />
            </Paper>
          </div>
          <div className='user_right'>
            <Paper
              style={{ width: '670px', margin: '0' }}
            >
            {this.state.catFiles.map((item, i) => 
              <MiniPlayer
                hideAvatar='true'
                sample={item}
                key={i}
              />
            )}
          </Paper>
          </div>
        </div>
      </div>
    );
  }
}

const Wallpaper = props => {
  return (
    <div
      className='wall_wrap'
      style={{ backgroundImage: 'url(' + props.image + ')' }}
    >
      <div className='wall_caption'>
        {props.name}
      </div>
    </div>
  );
}

export default UserPage; 
