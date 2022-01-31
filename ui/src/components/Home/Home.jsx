import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRealmApp } from '../../Realm';
import Navbar from '../Navbar/Navbar';
import CreatePost from '../Posts/CreatePost';
import PostsGrid from '../Posts/PostsGrid';

function Home() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  const app = useRealmApp();

  const getUsersPosts = async () => app.currentUser.functions.getUsersPosts();
  const getData = async () => {
    setPosts(await getUsersPosts());
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
    if (!user) {
      navigate('/');
    }

    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <CreatePost getData={getData} />
      <PostsGrid posts={posts} />
    </div>
  );
}

export default Home;
