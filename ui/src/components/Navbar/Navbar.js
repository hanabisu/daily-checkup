import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Avatar, IconButton, Menu, MenuItem,
} from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import { useRealmApp } from '../../Realm';

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const app = useRealmApp();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    console.log(e);
    console.log(user);
    setAnchorElUser(null);
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]); // when location changes set user

  const logout = () => {
    app.logoutOfRealm();
    dispatch({ type: LOGOUT });
    setAnchorElUser(null);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Typography style={{ fontFamily: 'Fredoka One' }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Daily CheckUp
        </Typography>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenUserMenu}
            color="inherit"
          >
            <Avatar alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography style={{ padding: '10px' }}>
              {user.result.name}
            </Typography>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>My account</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
