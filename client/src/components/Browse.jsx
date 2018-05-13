import React, { Component } from 'react';
import UsersList from './UsersList.jsx';
import FilesList from './FilesList.jsx';
import '../css/browse.css';

class Browse extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className='br_main'>
                <h1>Browse</h1>
                <UsersList 
                />
                <FilesList 
                />
            </div>
        );
    }
}

export default Browse
