import React, { Component } from 'react'
import axios from 'axios';

class Upload extends Component {
	constructor(props){
		super(props);
		this.state = {
			sampleURL: '',
			redirectOnSuccess: false,
		};
		this.handleUpload = this.handleUpload.bind(this);
	};

	//Form handler
	handleUpload(event) {
		event.preventDefault();
		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);


		//To implement later so user can choose their own name + add it to db meta
		//data.append('filename', this.fileName.value);
		//To figure out error handlers
		axios.post('http://localhost:3010/api/upload', data); 

		this.setState({ redirectOnSuccess: true });

		/*
		fetch('http://localhost:3010/api/upload', {
			method: 'POST',
			body: data,	
		}).then((response) => {
			console.log(data);
			response.json()
		});
		*/
	}
	render(){
		if(this.state.redirectOnSuccess){
			return (
				<div>
					<h1>Uploaded</h1> 
				</div>
			);	
		}
		return (
			<form onSubmit={this.handleUpload}>
				<input ref={(ref) => {this.uploadInput = ref; }} type='file' />
				<br />
			<button>submit</button>
			</form>
			
		);
	}

}

export default Upload;
