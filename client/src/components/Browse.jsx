import React, { Component } from 'react';
import UsersList from './UsersList.jsx';
import '../css/browse.css';

class Browse extends Component {
    render() {
        return (
            <div className='br_main'>
                <h1>Browse</h1>
                <UsersList />
            </div>
        );
    }
}

export default Browse
