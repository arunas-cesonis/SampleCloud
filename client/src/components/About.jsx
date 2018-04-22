import React, { Component } from 'react';

class About extends Component {
	constructor(props){
		super(props);
		this.state = {
			response1: '',
			response2: '',
		}
	}
	//Get data from Express route
	componentDidMount() {
		this.callApi()
			.then(res => this.setState({
				//args from express
				response1: res.arg1,
				response2: res.arg2,
			}));
	}
	callApi = async () => {
		const response = await fetch('/api/about');
		const body = await response.json();
		return body;
	};	

	render(){
		return (
			<div>
				<h1>About</h1>
				<p>{this.state.response1}</p>
				<p>{this.state.response2}</p>
			</div>
		);
	}

}

export default About;
