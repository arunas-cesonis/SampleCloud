import React, { Component } from 'react';

class App extends Component {
	state = {
		response: '',
		res_arg2: ''
	};

	componentDidMount() {
		this.callApi()
			.then(res => this.setState({ response: res.test,
				res_arg2: res.arg2
			 }));
	}

	callApi = async () => {
		const response = await fetch('/home');
		const body = await response.json();
		return body;
	};

  	render() {
    	return (
		<div>
			<h1>Sample Cloud</h1>
			<h1>{this.state.response}</h1>
			<h1>{this.state.res_arg2}</h1>
		</div>
	    );
	  }
}

export default App;
