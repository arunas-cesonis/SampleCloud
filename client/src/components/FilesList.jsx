import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

class FilesList extends Component {
    constructor(props){
        super(props);
        this.state = {
            files: [],
            username: '',
        }
    }
    render() {
        const files = this.props.listFiles;
        const username = this.props.currentUser;
        console.log('From FilesList.jsx: ', this.props.currentUser);
        return (
            <div className='br_main br_flist'>
                <h1>Files List</h1>
                <p>{username}</p>
                <ul>
                    {files.map((file, i) =>
                    <li key={i}>{file}</li>)}
                </ul>
            </div>
        );
    }
}

export default FilesList
