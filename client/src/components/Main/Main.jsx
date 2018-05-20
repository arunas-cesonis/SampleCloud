import React, { Component } from 'react';
import Header from './Header/Header.jsx';
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
