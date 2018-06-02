import React, { Component } from 'react';
import Input from './UploadInput.jsx';
import './upload.css';
import axios from 'axios';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    if (fileName.match(/^[a-zA-Z]+$/)) {
      this.setState({ uploadData, nameNotValid: false });
    } else {
      this.setState({ uploadData, nameNotValid: true });
    }
  }

  handleUpload(event) {
    event.preventDefault();
    const user = this.props.user;
    const data = new FormData();
    const notValid = this.state.nameNotValid;
    const friendlyName = this.state.uploadData.fileName;
    const fileName = this.state.uploadData.file.name;
    const file = this.state.uploadData.file;
    this.setState({ error: '' });
    //Very basic validation
    if (!notValid && friendlyName.length > 0 && fileName != null) {
      data.append('file', file); 
      data.append('friendlyName', friendlyName); 
      data.append('user', user.username);
      data.append('email', user.email);
      axios.post('http://localhost:3010/api/profile', data)
        .then(res => {
          console.log('Server res: ', res.data);
          if(res.data.success){
            this.setState({
              uploaded: true,
              msg: 'The file has been successfully uploaded.'
            });
          } else {
            this.setState({
              error: res.data.error 
            });
          }
      });
    } else {
      // VALIDATION
      this.setState({
        error: 'Specify filename with no white spaces and include a file.'
      });
    }
  }

  componentDidMount() {
    console.log('Upload.jsx Mounted.');
  }

  handleUploadOk() {
    this.props.updateList();
    this.setState({
      uploadData: {
        file: '',
        fileName: ''
      },
      error: 'File has been uploaded.',
      uploaded: false
    });
  }

  render() {
    const notValid = this.state.nameNotValid;
    if (this.state.uploaded) {
      return (
        <div>
          <p>{this.state.msg}</p>
          <button onClick={this.handleUploadOk}>Ok</button>
        </div>
      );
    } else {
      return (
        <div>
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
        </div>
      );
    }
  }

  componentWillUnmount() {
    console.log('Upload.jsx Unmounted.');
  }
}

export default Upload;
