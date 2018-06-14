import React, { Component } from 'react';
import axios from 'axios';
import './filter.css';

class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      categories: []
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSelect = (type) => (e) => {
    this.props.filterGetData(e.target.value, type);
  }
  
  handleSearch(e){
    this.props.filterSearch(e.target.value);
  }

  componentDidMount() {
    axios.get('http://localhost:3010/api/browse').then(res => {
      console.log('Categories: ', res.data.categories);
      console.log('Users: ',res.data.users);
      console.log('All files: ', res.data.files);
      this.setState({ 
        users: res.data.users, 
        categories: res.data.categories
      });
      this.props.listAllFiles(res.data.files);
    });
  }
  // Create a new component for Filter Form/Inputs/ETC
  render() {
    return(
      <div>
        <input 
          type='text'
          onChange={this.handleSearch}
          value={this.props.value}
          placeholder='Search...'
        />
        <select 
          value={this.props.selectUser}  
          onChange={this.handleSelect('username')} >
          <option value=''>Select User</option> 
          {this.state.users.map((item, i) =>
          <option 
            key={i}
            value={item}
          >{item}</option>)}
        </select>
        <select 
          value={this.props.selectCat} 
          onChange={this.handleSelect('category')}>
          <option value=''>Category</option> 
          {this.state.categories.map((item, i) =>
          <option 
            key={i}
            value={item}
          >{item}</option>)}
        </select>
      </div>
    );
  }
}

export default Filter 
