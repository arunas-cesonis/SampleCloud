import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			messageOfGuest: ''
		};
		this.handleMessageOfGuest = this.handleMessageOfGuest.bind(this);
	}
	handleMessageOfGuest(event) {
		this.setState({ messageOfGuest: event.target.value });
	}
	state = {
		response: '',
		res_arg2: ''
	};

	componentDidMount() {
		this.callApi()
			.then(res => this.setState({ 
				response: res.test,
				res_arg2: res.arg2
			 }));
	}

	callApi = async () => {
		const response = await fetch('/home');
		const body = await response.json();
		return body;
	};
	addToDb = event => {

		event.preventDefault();
		this.setState({ messageOfGuest: event.target.value });
		axios.post('http://localhost:3010/api/newUserRequest', {
			messageOfGuest: 'asasd',		
		})
		.then(response => {
			console.log(response, 'added');
		});
		this.setState({
			messageOfGuest: '',
		});
	};
  	render() {
    	return (
		<div>
			<h1>Sample Cloud</h1>
			<h1>{this.state.response}</h1>
			<p>{this.state.res_arg2}</p>
			<h1>{this.state.messageOfGuest}</h1>
			<input type='text'
				name='messageOfGues'
				value={this.state.messageOfGues}
				onChange={this.handleMessageOfGuest} />
			<button type='submit' onClick={this.addToDb}>
			Submit 
			</button>
		</div>
	    );
	  }
}

export default App;
