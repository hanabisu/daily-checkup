import React, { useState } from 'react';
import {
  Avatar, Button, Paper, Grid, Typography, Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { AUTH } from '../../constants/actionTypes';

function Login() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = () => {};
  const handleSubmit = () => {};

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => setIsSignUp((prevIsSignUp) => !prevIsSignUp);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log(result);
    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = (error) => {
    console.log(error);
    console.log('Google Sign In was unsuccessful. Try again later');
  };
  // const state = null;
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autofocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )
            }
            <Input name="email" label="E-mail" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {
              isSignUp && (
                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              )
            }
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
            <GoogleLogin
              clientId="251231669393-arbb6q3qct85ho8f3bf1q0rvvet04i8b.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} startIcon={<Icon />} variant="contained">
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>{isSignUp ? 'Already have an account? Sign In' : 'New User? Sign Up'}</Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>

  );
}

export default Login;
