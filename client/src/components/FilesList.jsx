import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

class FilesList extends Component {
    constructor(props){
        super(props);
        this.state = {
            files: [],
        }
    }
    render() {
        const files = this.props.listFiles;
        return (
            <div className='br_main br_flist'>
                <h1>Files List</h1>
                <ul>
                    {files.map((file, i) =>
                    <li key={i}></li>)}
                </ul>
            </div>
        );
    }
}

export default FilesList
