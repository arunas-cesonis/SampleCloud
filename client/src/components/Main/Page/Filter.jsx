import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormGroup } from 'react-bootstrap';

class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSelect(e){
    this.props.filterGetData(e.target.value);
    console.log(e.target.value);
  }
  
  handleSearch(e){
    this.props.filterSearch(e.target.value);
  }

  componentDidMount() {
    axios.get('http://localhost:3010/api/browse').then(res => {
      this.setState({ users: res.data.map((user) => user)});
      console.log(this.state.users);
    });
  }

  render() {
    return(
        <FormGroup controlId="formControlsSelect">
          <FormControl onChange={this.handleSelect} componentClass="select">
            {this.state.users.map((user, i) => (
              <option key={i} value={user.username}>{user.username}</option>
              ))}
          </FormControl>
          <input 
            type='text'
            onChange={this.handleSearch}
            value={this.props.value}
          />
        </FormGroup>
    );
  }
}

export default Filter 
