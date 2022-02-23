import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import reducers from './reducers/index';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#fbc02d',
    },
    secondary: {
      main: '#f50057',
    },
    info: {
      main: '#795548',
    },
  },
  spacing: 8,
  typography: {
    fontFamily: 'Zen Kaku Gothic Antique',
    fontWeightLight: 500,
    fontWeightRegular: 600,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
