import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../css/main.css';
import Home from './Home.jsx'; 
import About from './About.jsx'; 

class Main extends Component {
	constructor(props){
		super(props);
	};

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
