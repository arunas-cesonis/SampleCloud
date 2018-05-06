import React, { Component } from 'react';
//import axios from 'axios';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(props){
        super(props);
    }
    mountLogin(){
        ReactDOM.render( <Login />, document.getElementById('login'));
        ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    }
    mountRegister(){

    }
  	render() {
    	return (
		<div>
            <Login />
		</div>
	    );
	  }
}

export default App;
