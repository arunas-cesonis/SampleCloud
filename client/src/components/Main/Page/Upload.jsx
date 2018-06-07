import React, { Component } from 'react';
import Input from './UploadInput.jsx';
import Select from './UploadSelect.jsx';
import './upload.css';
import axios from 'axios';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ['Drums', 'Strings', 'Brass', 'Electronic', 'Live', 'Other'],
      category: '',
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
    this.handleCategory = this.handleCategory.bind(this);
  }

  handleCategory(val) {
    this.setState({ category: val });
    console.log('handleCategory(); ', val); 
  }

  handleFile(file) {
    const uploadData = Object.assign({}, this.state.uploadData);
    const types = ['audio/mp3', 'audio/wav'];
    uploadData.file = file;
    if(types.indexOf(uploadData.file.type) > -1){
      this.setState({ uploadData });
    } else { 
      this.setState({ error: 'This file type is not allowed.' });
    }
  }

  handleFileName(fileName) {
    const uploadData = Object.assign({}, this.state.uploadData);
    uploadData.fileName = fileName;

    if (fileName.match(/^[a-zA-Z0-9]+$/)) {
      this.setState({ uploadData, nameNotValid: false });
    } else {
      this.setState({ uploadData, nameNotValid: true });
    }
  }

  handleUpload(event) {
    event.preventDefault();
    const user = this.props.user;
    const category = this.state.category;
    const data = new FormData();
    const notValid = this.state.nameNotValid;
    const friendlyName = this.state.uploadData.fileName;
    const fileName = this.state.uploadData.file.name;
    const file = this.state.uploadData.file;
    this.setState({ error: '' });
    //Very basic validation
    if (!notValid && friendlyName.length > 0 && fileName != null && category !== '') {
      data.append('file', file); 
      data.append('friendlyName', friendlyName); 
      data.append('user', user.username);
      data.append('email', user.email);
      data.append('category', category);
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
        error: 'Check your form, some fields are missing or incorrect.'
      });
    }
  }

  componentDidMount() {
    console.log('Upload.jsx Mounted.');
  }

  handleUploadOk() {
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
            <Select 
              update={this.handleCategory}
              categories={this.state.categories}
            />
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
