import React, { Component } from 'react'

class Upload extends Component {
	constructor(props){
		super(props);
		this.state = {
			sampleURL: '',
		};
		this.handleUpload = this.handleUpload.bind(this);
	};
	handleUpload(event) {
		event.preventDefault();
		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		//data.append('filename', this.fileName.value);
		
		fetch('http://localhost:3010/upload', {
			method: 'POST',
			body: data,	
		}).then((response) => {
			console.log(data);
			response.json()
		});
	}
	render(){
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
