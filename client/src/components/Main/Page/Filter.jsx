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
      <div>
        <InputSelect
          id='User'
          label='User'
          update={(e) => this.handleSelection(e, 'username')}
          items={this.state.users}
          value={this.state.selectUser}
        />
        <InputSelect
          id='Category'
          label='Category'
          update={(e) => this.handleSelection(e, 'category')}
          items={this.state.categories}
          value={this.state.selectCat}
        />
        <InputText 
          id='Search'
          label='Search...'
          update={this.handleSearch}
        />
      </div>
    );
  }
}

export default Filter 
