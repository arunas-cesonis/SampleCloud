import React, { Component } from 'react';
import axios from 'axios'

class UsersList extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3010/api/browse/users/list')
            .then(res => {
                const users = res.data; 
                console.log(res.data);
                this.setState({ users });
            });
    }

    render() {
        return (
            <div className='br_main br_ulist'>
                <h1>UsersList</h1>
                <ul>
                    {this.state.users.map((user, i) =>
                    <li key={i}>{user.username}</li>)}
                </ul>
            </div>
        );
    }
}

export default UsersList
