import React, { Component } from 'react';
import UsersList from './UsersList.jsx';
import FilesList from './FilesList.jsx';
import Player from './Player.jsx';
import axios from 'axios';
import '../css/browse.css';

class Browse extends Component {
    constructor(props){
        super(props);
        this.state = {
            fileList: [],
            currentUser: '',
            
        }
        this.getFiles = this.getFiles.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
    }

    getFiles(username){
        console.log('Browse getFiles(): On Click');
        axios.post('http://localhost:3010/api/browse/getfiles',{
            username: username
        }).then(res => {
                const fileList = res.data;
                console.log(fileList);
            this.setState({
                fileList,
                currentUser: username,
            });
        });
    }

    handlePlay(sampleURL, username){
        console.log('From Browse.jsx: ', sampleURL, username);
    }

    render() {
        const currentUser = this.state.currentUser;
        const fileList = this.state.fileList;

        return (
            <div className='br_main'>
                <h1>Browse</h1>
                <UsersList 
                    getFiles={this.getFiles}
                    currentUser={currentUser}
                />
                <FilesList
                    currentUser={currentUser}
                    listFiles={fileList}
                    handlePlay={this.handlePlay}
                />
                <Player />
            </div>
        );
    }
}

export default Browse
