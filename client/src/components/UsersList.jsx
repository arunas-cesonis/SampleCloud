import React, { Component } from 'react';
import axios from 'axios'
import FilesList from './FilesList.jsx';
import classNames from 'classnames';

class UsersList extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            fileList: [],
            currentUser: '',
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
            this.setState({ 
                fileList,
                currentUser: username,
            });
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
                            className={classNames(
                                'br_item', 
                                {active: user.username === this.state.currentUser},
                            )} 
                            onClick={() => this.getFiles(user.username)}
                            key={i}>{user.username}
                        </li>)}
                    </ul>
                </div>
                <FilesList 
                    listFiles={this.state.fileList}
                    currentUser={this.state.currentUser}
                />
            </div>
        );
    }
}

export default UsersList
