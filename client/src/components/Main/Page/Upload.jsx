import React, { Component } from 'react';
import Input from './UploadInput.jsx';
import './upload.css';
import axios from 'axios';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleURL: '',
      username: this.props.name,
      nameNotValid: false,
      uploadData: {
        file: '',
        fileName: ''
      },
      error: '',
      uploaded: '',
      msg: ''
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleFileName = this.handleFileName.bind(this);
    this.handleUploadOk = this.handleUploadOk.bind(this);
  }

  handleFile(file) {
    const uploadData = Object.assign({}, this.state.uploadData);
    uploadData.file = file;
    this.setState({ uploadData });
  }

  handleFileName(fileName) {
    const uploadData = Object.assign({}, this.state.uploadData);
    uploadData.fileName = fileName;


    if (fileName.match(/\s/g)) {
      this.setState({ uploadData, nameNotValid: true });
    } else {
      console.log('no white space detected.');
      this.setState({ uploadData, nameNotValid: false });
    }
  }

  handleUpload(event) {
    event.preventDefault();
    this.setState({ error: '' });
    const userData = this.props.user;
    const data = new FormData();
    const notValid = this.state.nameNotValid;
    const userFileName = this.state.uploadData.fileName;
    const origFileName = this.state.uploadData.file.name;
    //Very basic validation
    if (!notValid && userFileName.length > 0 && origFileName != null) {
      data.append('file', this.state.uploadData.file);
      data.append('filename', this.state.uploadData.fileName);
      data.append('username', this.state.username);
      //To implement later so user can choose their own name + add it to db meta
      //To figure out error handlers
      axios.post('http://localhost:3010/api/upload', data).then(response => {
        console.log('Server res: ', response.data);
      });
      this.setState({
        uploaded: true,
        msg: 'The file has been successfully uploaded.'
      });
    } else {
      this.setState({
        error: 'Specify filename with no white spaces and include a file.'
      });
    }
  }

  componentDidMount() {
    console.log('Upload.jsx Mounted.');
  }

  handleUploadOk() {
    this.setState({
      msg: 'File has been uploaded',
      uploaded: false
    });
  }

  render() {
    const notValid = this.state.nameNotValid;
    console.log('Upload data from Render:', this.state.uploadData);
    if (this.state.uploaded) {
      return (
        <div>
          <p>{this.state.msg}</p>
          <button onClick={this.handleUploadOk}>Ok</button>
        </div>
      );
    } else {
      return (
        <form>
          <p className="error_msg">{this.state.error}</p>
          <Input
            id={'file'}
            label={'File:'}
            type={'file'}
            upload={this.handleFile}
            addClass={false}
          />
          <Input
            id={'filename'}
            label={'File Name:'}
            type={'text'}
            filename={this.handleFileName}
            val={this.state.uploadData.fileName}
            valid={notValid}
            addClass={true}
          />
          <br />
          <button onClick={this.handleUpload}>submit</button>
        </form>
      );
    }
  }

  componentWillUnmount() {
    console.log('Upload.jsx Unmounted.');
  }
}

export default Upload;
