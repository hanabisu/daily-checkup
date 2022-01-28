import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Home() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
    if (!user) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <Navbar />
      Home
    </div>
  );
}

export default Home;
