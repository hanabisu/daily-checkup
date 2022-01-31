import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Avatar, Button,
} from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { LOGOUT } from '../../constants/actionTypes';
import { useRealmApp } from '../../Realm';

function Navbar() {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const app = useRealmApp();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]); // when location changes set user

  const logout = () => {
    app.logoutOfRealm();
    dispatch({ type: LOGOUT });
    navigate('/');
    setUser(null);
  };

  return (
    <div>
      {user && (
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Daily CheckUp</Typography>
        </div>
        <Toolbar className={classes.toolbar} />

        <div className={classes.profile}>
          <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
            {user.result.name.charAt(0)}
          </Avatar>
          <Typography className={classes.userName}>
            {user.result.name}
          </Typography>
        </div>
        <Button type="submit" fullWidth variant="contained" color="secondary" onClick={logout}>Logout</Button>
      </AppBar>
      )}
    </div>
  );
}

export default Navbar;
