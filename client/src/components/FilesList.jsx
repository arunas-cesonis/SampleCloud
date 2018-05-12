import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

class FilesList extends Component {
    constructor(props){
        super(props);
        this.state = {
            files: [],
            username: '',
        }
        this.displayName = this.displayName.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    handleFile(sample){
        console.log('Handling Sample');
        console.log('Sample: ', sample);
    }

    displayName(username){
        if(username){
            return 'Viewing: ' + username;
        }
    }

    render() {
        const files = this.props.listFiles;
        const username = this.props.currentUser;
        console.log('From FilesList.jsx: ', this.props.currentUser);
        return (
            <div className='br_main br_flist'>
                <h1>Files List</h1>
                <div className='br_ftitle'>
                    {this.displayName(username)}
                </div>
                <ul className='br_samplesBar'>
                    {files.map((file, i) =>
                    <li className='br_file' key={i}>{file}</li>)}
                    {files.map((file, i) =>
                    <Item 
                        key={i} 
                        file={file}
                        handler={this.handleFile}
                    />)}
                </ul>
            </div>
        );
    }
}

const Item = (props) => { 
    return (
        <li
            className='br_file'
            onClick={() => props.handler(props.file)}
        >{props.file}
        </li>
    );
}


export default FilesList
