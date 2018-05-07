import React, { Component } from 'react'
import Input from './UploadInput.jsx';
import classNames from 'classnames';
import '../css/upload.css';
import axios from 'axios';

class Upload extends Component {
	constructor(props){
		super(props);
		this.state = {
			sampleURL: '',
			username: this.props.name,
            nameNotValid: false,
            uploadData: {
                file: '',
                fileName: '',
            },
		};
		this.handleUpload = this.handleUpload.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleFileName = this.handleFileName.bind(this);
	};

    handleFile(file){
        const uploadData = Object.assign({}, this.state.uploadData);
        uploadData.file = file;
        this.setState({ uploadData });
    }

    handleFileName(fileName){
        const uploadData = Object.assign({}, this.state.uploadData);
        uploadData.fileName = fileName;
        if(fileName.match(/\s/g)){
            this.setState({ uploadData, nameNotValid: true });
        } else {
            console.log('no white space detected.');
            this.setState({ uploadData, nameNotValid: false });
        }
    }

	handleUpload(event) {
		event.preventDefault();
		const data = new FormData();
        console.log('Real name: ', this.state.uploadData.file.name);
		data.append('file', this.state.uploadData.file);
		data.append('filename', this.state.uploadData.fileName);
		data.append('username', this.state.username);

		//To implement later so user can choose their own name + add it to db meta
		//To figure out error handlers
		axios.post('http://localhost:3010/api/upload', data)
		.then(response => {
			console.log('Server res: ', response.data);
		}); 
	}

    componentDidMount(){
        console.log('Upload.jsx Mounted.');
    }

	render(){
        const notValid = this.state.nameNotValid; 
        console.log('Upload data from Render:', this.state.uploadData);
		return (
			<form>
                <h1>Part 2</h1>
                <Input 
                    type={'file'}
                    upload={this.handleFile}
                    addClass={false}
                />
                <Input 
                    type={'text'}
                    filename={this.handleFileName}
                    val={this.state.uploadData.fileName}
                    valid={notValid}
                    addClass={true}
                />
				<br />
			    <button 
                    onClick={this.handleUpload}
                >submit
                </button>
			</form>
		);
	}

    componentWillUnmount(){
        console.log('Upload.jsx Unmounted.');
    }
}

export default Upload;
