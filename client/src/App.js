import React, { Component } from 'react';
//import axios from 'axios';
import Login from './components/Login.jsx';
import Main from './components/Main.jsx';
import ReactDOM from 'react-dom';

class App extends Component {
    //Should load a Main class and main will handle Login and Register components.
  	render() {
    	return (
		<div>
            <Main />
		</div>
	    );
	  }
}

export default App;
