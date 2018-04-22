import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../css/main.css';
//External Components to be loaded using 'react-router-dom module'
import Home from './Home.jsx'; 
import About from './About.jsx'; 

//Basically this is a main Content or Content Loader 
class Main extends Component {

	render(){
		return (
			<div className='mainCont'>			
				<h1>Main Content Page</h1>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/about' component={About} />
				</Switch>
			</div>
	
		);
	}

}

export default Main;
