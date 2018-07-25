import React, { Component } from 'react';
import axios from 'axios';
import MiniPlayer from './MiniPlayer.jsx';
import './userpage.css';
import Paper from '@material-ui/core/Paper';
import './wallpaper.css';

class UserPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: [],
      categories: [],
      files: ['', ''],
      catFiles: []
    }
    this.getCategories = this.getCategories.bind(this);
    this.handleCatClick = this.handleCatClick.bind(this);
  }

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
  
  getCategories() {
    const { categories, files } = this.state;
    for(let i in files){
      if(categories.indexOf(files[i].category) === -1){
        categories.push(files[i].category);
      }
    }
    this.setState({ categories: categories });
  }

  componentDidMount() {
    let userURL;
    if(!this.props.match){
      userURL = '/api/user/' + this.props.currentUser;
    } else {
      userURL = '/api/user/' + this.props.match.params.name;
    }
    console.log(userURL);
    axios.get(userURL).then(res => {
      this.setState({ 
        user: res.data.user,
        files: res.data.files,
        catFiles: res.data.files
      });
      this.getCategories();
    });
  }

  render() {
    return (
      <div className='user_wrap'>
        <Wallpaper
          image={this.state.user.wallpaper}
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
                  <div className='cat_title'>CATEGORIES:</div>
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
              <div className='cat_title'>Showing: {this.state.catFiles.length}</div>
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
    </div>
  );
}

export default UserPage;
