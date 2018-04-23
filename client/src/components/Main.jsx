import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../css/main.css';
//External Components to be loaded using 'react-router-dom module'
import Home from './Home.jsx'; 
import About from './About.jsx'; 
import Upload from './Upload.jsx';
import Login from './Login.jsx';

//Basically this is a main Content or Content Loader 
class Main extends Component {

	render(){
		return (
			<div className='mainCont'>			
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/about' component={About} />
					<Route path='/login' component={Login} />
					<Route path='/upload' component={Upload} />
				</Switch>
			</div>
	
		);
	}

}

export default Main;
