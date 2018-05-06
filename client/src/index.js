import React from 'react';
import ReactDOM from 'react-dom';
//For routing componenets
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './main.css';

ReactDOM.render((
    <BrowserRouter>
		<App /> 
    </BrowserRouter>
	), document.getElementById('root')
);
