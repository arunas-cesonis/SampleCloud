import React, { Component } from 'react';
import axios from 'axios';
import InputSelect from './InputSelect.jsx';
import InputText from './InputText.jsx';
import './filter.css';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      categories: [],
      selectUser: '',
      selectCat: ''
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSelection(val, type) {
    this.props.filterGetData(val, type);
    //TO Review this later.
    if(type === 'category') {
      this.setState({ 
        selectUser: '',
        selectCat: val 
      });
    }
    if(type === 'username') {
      this.setState({ 
        selectCat: '',
        selectUser: val 
      });
    }
  }
  
  handleSearch(val) {
    this.props.filterSearch(val);
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

  render() {
    return(
      <div className='filter_main'>
        <div className='filter_item'>
          <InputText 
            id='Search'
            label='Search...'
            update={this.handleSearch}
            width='180px'
            value={this.props.value}
        />
        </div>
        <div className='filter_item'>
          <InputSelect
            id='User'
            label='User'
            width='100px'
            update={(e) => this.handleSelection(e, 'username')}
            items={this.state.users}
            value={this.state.selectUser}
          />
        </div>
        <div className='filter_item'>
          <InputSelect
            id='Category'
            label='Category'
            width='100px'
            update={(e) => this.handleSelection(e, 'category')}
            items={this.state.categories}
            value={this.state.selectCat}
          />
        </div>
      </div>
    );
  }
}

export default Filter 
