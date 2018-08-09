import React, { Component } from 'react';
import Input from './InputText.jsx';
import FileInput from './UploadFileInput.jsx';
import InputSelect from './InputSelect.jsx';
import './upload.css';
import axios from 'axios';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    flewGrow: 1,
    width: '195px',
    height: '350px',
    margin: '0 auto',
  },
  paper: {
    padding: '10px 20px'
  }
});

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
    const size = () => { return (file.size > 10000 && file.size < 11000000) };
    console.log('Size: ', size());
    this.setState({ error: '' });
    //Very basic validation
    if (!notValid && friendlyName.length > 0 && fileName != null && category !== '' && size()) {
      data.append('file', file); 
      data.append('friendlyName', friendlyName); 
      data.append('user', user.username);
      data.append('email', user.email);
      data.append('category', category);
      axios.post('/api/profile', data)
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
        error: 'Check your form, some fields are missing or incorrect. Max file size = 11Mb.'
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
    const { classes } = this.props;
    if (this.state.uploaded) {
      return (
        <div>
          <p>{this.state.msg}</p>
          <button onClick={this.handleUploadOk}>Ok</button>
        </div>
      );
    } else {
        /*
        <div className='upload_main'>
          <form>
            <p className="error_msg">{this.state.error}</p>
            <FileInput
              id={'file'}
              label={'File:'}
              upload={this.handleFile}
              value='value'
            />
            <Input
              id={'filename'}
              label={'File Name:'}
              filename={this.handleFileName}
              val={this.state.uploadData.fileName}
              valid={notValid}
            />
            <br />
            <Select 
              update={this.handleCategory}
              categories={this.state.categories}
            />
            <button onClick={this.handleUpload}>submit</button>
          </form>
        </div>
        */
      return (
        <form autoComplete='off' className={classes.root}>
          <Grid container justify='center' spacing={8}>
            <Grid item xs={6}>
              <div className='up_title1' style={{ padding: '5px'}}>Upload File:</div>
              <p className="upload_error">{this.state.error}</p>
            </Grid>
          </Grid>
          <Grid direction='row' alignItems='flex-end' container spacing={8} >
            <Grid item >
              <Input
                id={'filename'}
                label={'File Name:'}
                update={this.handleFileName}
                val={this.state.uploadData.fileName}
                valid={notValid}
              />
            </Grid>
          </Grid>
          <Grid direction='row' alignItems='flex-end' container justify='flex-start' spacing={8}> 
            <Grid item >
              <InputSelect 
                id='Category'
                label='Category'
                update={this.handleCategory}
                items={this.state.categories}
                value={this.state.category}
              />
            </Grid>
          </Grid>
          <Grid direction='row' alignItems='flex-end' container spacing={8} >
            <Grid item >
              <FileInput
                id='file'
                label='File:'
                upload={this.handleFile}
                value='value'
              />
            </Grid>
          </Grid>
          <Grid direction='row' alignItems='flex-end' container justify='flex-start' spacing={8} > 
            <Grid item >
              <div className='upload_submit' onClick={this.handleUpload} >Submit</div>
            </Grid>
          </Grid>
        </form>
      );
    }
  }

  componentWillUnmount() {
    console.log('Upload.jsx Unmounted.');
  }
}

export default withStyles(styles)(Upload);
