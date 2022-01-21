import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes> 
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
