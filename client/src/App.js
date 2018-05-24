import React, { Component } from 'react';
import Main from './components/Main/Main.jsx';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
//Should load a Main class and main will handle Login and Register components.
  render() {
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
  }
}

export default App;
