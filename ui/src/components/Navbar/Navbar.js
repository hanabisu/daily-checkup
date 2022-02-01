import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Avatar, IconButton, Container, Box, Menu, MenuItem,
} from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import useStyles from './styles';
import { LOGOUT } from '../../constants/actionTypes';
import { useRealmApp } from '../../Realm';

function Navbar() {
  // const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const app = useRealmApp();
  const settings = ['Profile', 'Settings'];
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
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Daily CheckUp
          </Typography>

          <Box sx={{ flexGrow: 0 }} justifyContent="end">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem key="logout" onClick={logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
