import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../css/main.css';
//External Components to be loaded using 'react-router-dom module'
import Home from './Home.jsx'; 
import About from './About.jsx'; 
import Upload from './Upload.jsx';

//Basically this is a main Content or Content Loader 
class Content extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: this.props.username,
			ready: true,
		};
	}
	uploadSamples(username){

	}

	// CHECK {...props} - This is the way to pass props using Route module.
	render(){
		return (
			<div className='mainCont'>			
			<h1>U:{this.props.username}</h1>
				<Switch>
					<Route exact path='/' 
						component={Home} 
					/>
					<Route path='/about' component={About} />
					<Route path='/upload' 
						render={(props) => <Upload {...props}  
						name={this.state.username}
						readyUpload={this.state.ready} />}
					/>
				</Switch>
			</div>
	
		);
	}

}

export default Content;
