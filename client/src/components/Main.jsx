import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import { BrowserRouter } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  }
}

export default Main;
