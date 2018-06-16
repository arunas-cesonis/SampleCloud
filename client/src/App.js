import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Main from './components/Main/Main.jsx';
import { BrowserRouter } from 'react-router-dom';
import 'typeface-roboto';

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      root: {
        width: '150px',
      },
    },
  },
  palette: {
    primary: { 
      main: '#6aabb7' 
    }, 
    secondary: { 
      main: '#fba100' 
    },
  }
});

class App extends Component {
//Should load a Main class and main will handle Login and Register components.
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
