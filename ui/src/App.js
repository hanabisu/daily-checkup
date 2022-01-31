/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Redirection from './components/Login/Redirection';
import { RealmAppProvider } from './Realm';

function App() {
  return (
    <RealmAppProvider appId={process.env.REACT_APP_REALM_APP_ID}>
      <BrowserRouter>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/redirect" element={<Redirection />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </RealmAppProvider>
  );
}

export default App;
