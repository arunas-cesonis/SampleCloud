import React, { Component } from 'react';
import '../css/userpage.css';
import Header from './Header.jsx';
import Content from './Content.jsx';

class UserPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			//TO REVIEW LATER
			currentUser: this.props.username,
			logged: this.props.logged,
		};
	}
    componentDidMount(){
        console.log('UserPage.jsx Mounted.');
    }
    componentWillUnmount(){
        console.log('UserPage.jsx UnMounted.');
    }
	render() {
		console.log('From UserPage component. Logged in as: ',
			this.state.currentUser, ' ', this.state.logged);
		return (
			<div>
                <div className='userPageCont'>
                    <Header />
                    <div className='userPageCol1'></div>
                    <div className='UserPageCol2'>
                    <Content 
                        username={this.state.currentUser} 
                    />
                    </div>
                    <div className='UserPageCol3'></div>
                </div>
			</div>
		);
	}
}

export default UserPage;
