import React, { Component } from 'react';
import axios from 'axios';
import './filter.css';

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
  }
  
  handleSearch(e){
    this.props.filterSearch(e.target.value);
  }

  componentDidMount() {
    axios.get('http://localhost:3010/api/browse').then(res => {
      const usersArr = [];
      const tmpArr = res.data.map((item) => item.username.toLowerCase());
      for(let i = 0; i < tmpArr.length; i++){
        //indexOf == -1 if tmpArr[i] is not found in usersArr 
        if(usersArr.indexOf(tmpArr[i]) === -1){
          usersArr.push(tmpArr[i]);
        }
      }
      this.setState({ users: usersArr });
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
          placeHolder='Search...'
        />
        <select onChange={this.handleSelect} >
          <option value=''>Select User</option> 
          {this.state.users.map((item, i) =>
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
