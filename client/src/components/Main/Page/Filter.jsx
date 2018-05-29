import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormControl, FormGroup } from 'react-bootstrap';

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
      const usersArr = [];
      const tmpArr = res.data.map((item) => item.username);
      for(let i = 0; i < tmpArr.length; i++){
        //indexOf == -1 if tmpArr[i] is not found in usersArr 
        if(usersArr.indexOf(tmpArr[i]) === -1){
          usersArr.push(tmpArr[i]);
        }
      }
      console.log('USERS ARR: ', usersArr);
      this.setState({ users: usersArr });
    });
  }

  render() {
    return(
      <Form inline>
        <FormGroup controlId="formControlsSelect">
          <FormControl onChange={this.handleSelect} componentClass="select">
            <option value={'Select'}>Select</option>
            {this.state.users.map((user, i) => (
              <option key={i} value={user}>{user}</option>
              ))}
          </FormControl>
          <FormControl 
            type='text'
            placeholder='Search...'
            onChange={this.handleSearch}
            value={this.props.value}
          />
        </FormGroup>
      </Form>
    );
  }
}

export default Filter 
