import React, { Component } from 'react';
import axios from 'axios'
import FilesList from './FilesList.jsx';

class UsersList extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            fileList: [],
        }
        this.getFiles = this.getFiles.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:3010/api/browse/users/list')
            .then(res => {
                const users = res.data; 
                console.log(res.data);
                this.setState({ users });
            });
    }
    getFiles(username){
        console.log('On Click');
        axios.post('http://localhost:3010/api/browse/getfiles',{
            username: username
        }).then(res => {
                const fileList = res.data;
                console.log(fileList);
            //this.setState({ fileList });
            });
    }

    render() {
        return (
            <div>
                <div className='br_main br_ulist'>
                    <h1>UsersList</h1>
                    <ul className='br_itemsBar'>
                        {this.state.users.map((user, i) =>
                        <li 
                            className='br_item' 
                            onClick={() => this.getFiles(user.username)}
                            key={i}>{user.username}
                        </li>)}
                    </ul>
                </div>
                <FilesList 
                    listFiles={this.state.fileList}
                />
            </div>
        );
    }
}

export default UsersList
