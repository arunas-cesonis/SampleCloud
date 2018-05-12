import React, { Component } from 'react';
import classNames from 'classnames';

class FilesList extends Component {
    constructor(props){
        super(props);
        this.state = {
            files: [],
            username: '',
            currentSample: '',
        }
        this.displayName = this.displayName.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    handleFile(sample, username){
        //Check the db and get the sample URL or something like that
        console.log('Handling Sample');
        console.log('Sample: ', sample);
        console.log('Username: ', username);
        this.setState({ currentSample: sample });
        this.props.handlePlay(sample, username);
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
                    <Item 
                        key={i} 
                        file={file}
                        currentSample={this.state.currentSample}
                        username={username}
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
            className={classNames('br_file', {active: props.file === props.currentSample})} 
            onClick={() => props.handler(props.file, props.username)}
        >{props.file}
        </li>
    );
}

export default FilesList
