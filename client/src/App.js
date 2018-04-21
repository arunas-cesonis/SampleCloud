import React, { Component } from 'react';
import axios from 'axios';
import upload from './components/Upload';

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			username: '',
			response1: '',
			response2: ''
		};
		this.handleNewUser = this.handleNewUser.bind(this);
	}
	//state handler (onChange)
	handleNewUser(event) {
		this.setState({ username: event.target.value });
	}

	componentDidMount() {
		this.callApi()
			.then(res => this.setState({ 
				response1: res.arg1,
				response2: res.arg2
			 }));
	}
	//get data from json
	callApi = async () => {
		const response = await fetch('/api/home');
		const body = await response.json();
		return body;
	};
	addToDb = event => {
		event.preventDefault();
		// Read Inputs
		this.setState({ username: event.target.value });
		
		//Post back to express (server.js)
		axios.post('http://localhost:3010/api/pushtodb', {
			username: this.state.username,		
		})
		.then(response => {
			console.log(response, 'added');
		});
		this.setState({
			username: '',
		});
	};
  	render() {
    	return (
		<div>
			<h1>Sample Cloud</h1>
			<h1>{this.state.response1}</h1>
			<p>{this.state.response2}</p>
			<h1>{this.state.username}</h1>
			<input type='text'
				name='username'
				value={this.state.username}
				onChange={this.handleNewUser} />
			<button type='submit' onClick={this.addToDb}>
			Submit 
			</button>
		</div>
	    );
	  }
}

export default App;
