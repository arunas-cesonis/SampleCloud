import React, { Component } from 'react';
import axios from 'axios';
import ParallaxImage from './ParallaxImage.jsx';
import MiniPlayer from './MiniPlayer.jsx';
import './userpage.css';

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
    console.log('CATS[]: ', categories);
  }

  componentDidMount() {
    const userURL = 'http://localhost:3010/api/user/' + this.props.match.params.name;
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
        <ParallaxImage
          image=''
        />
        <div 
          className='user_avatar'
          style={{ backgroundImage: 'url(' + this.state.user.avatar + ')' }}
        ></div>
        <div className='user_cont'>
          <div className='user_left'>
            <div className='categories_cont'>
              {this.state.categories.map((item, i) => 
                <div 
                  onClick={(e) => this.handleCatClick(item)}
                  className='category_btn' 
                  key={i}
                >{item}</div>
              )}
            </div>
            <p>{this.state.catFiles.length}</p>
            {this.state.catFiles.map((item, i) => <p key={i}>{item.friendlyName}</p> )}
          </div>
          <div className='user_right'>
            {this.state.catFiles.map((item, i) => 
              <MiniPlayer
                sample={item}
                key={i}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
