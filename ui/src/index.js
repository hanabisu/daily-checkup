import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import reducers from './reducers/index';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#FFE357',
      light: '#faf2c8',
    },
    secondary: {
      main: '#d4c9e6',
    },
    background: {
      default: '#fff3a9',
      paper: '#fdffca',
    },
    info: {
      main: '#795548',
    },
  },
  spacing: 8,
  typography: {
    fontFamily: 'Playfair Display',
    fontWeightLight: 500,
    fontWeightRegular: 600,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
