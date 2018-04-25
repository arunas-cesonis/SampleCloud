import React, { Component } from 'react'
import axios from 'axios';

class Upload extends Component {
	constructor(props){
		super(props);
		this.state = {
			sampleURL: '',
			// THE Username Will be used a lot for later
			username: this.props.name,
			notifyOnSuccess: false,
		};
		this.handleUpload = this.handleUpload.bind(this);
		this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
	};

	handleUploadSuccess(event) {
		event.preventDefault();
			this.setState({ notifyOnSuccess: false });
	}
	//Form handler
	handleUpload(event) {
		event.preventDefault();
		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		data.append('filename', this.fileName.value);
		data.append('username', this.state.username);

		//To implement later so user can choose their own name + add it to db meta
		//To figure out error handlers
		axios.post('http://localhost:3010/api/upload', data)
		.then(response => {
			console.log(response.data);
			console.log(this.props.ready);
			this.setState({ notifyOnSuccess: true });
		}); 
	}

	render(){
		if(this.state.notifyOnSuccess){
			return (
				<div>
					<h1>Uploaded</h1> 
					<button onClick={this.handleUploadSuccess}>Ok
					</button>
				</div>
			);	
		}
		return (
			<form onSubmit={this.handleUpload}>
				<h1>{this.state.username}</h1> 
				<input ref={(ref) => {this.uploadInput = ref; }} type='file' />
				<input ref={(ref) => {this.fileName = ref; }} type='text' />
				<br />
			<button>submit</button>
			</form>
			
		);
	}

}

export default Upload;
