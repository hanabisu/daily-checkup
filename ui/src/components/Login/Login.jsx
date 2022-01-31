import React, { useState } from 'react';
import {
  Avatar, Button, Paper, Grid, Typography, Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Realm from 'realm-web';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { AUTH } from '../../constants/actionTypes';
import { signup, signin, formatLikeGoogleResponse } from '../../actions/auth';
import { useRealmApp } from '../../Realm';

function Login() {
  const classes = useStyles();

  const initialState = {
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const app = useRealmApp();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(form, navigate, app));
    } else {
      dispatch(signin(form, navigate, app));
    }
  };

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => setIsSignUp((prevIsSignUp) => !prevIsSignUp);

  const googleLogin = async () => {
    try {
      const RedirectUri = `http://${window.location.host}/redirect`;
      const credentials = Realm.Credentials.google(RedirectUri);
      const user = await app.loginToRealm(credentials);
      const userDetails = await user.functions.getSingleUser(user.id);
      if (userDetails) {
        // eslint-disable-next-line no-underscore-dangle
        const data = formatLikeGoogleResponse(userDetails, user._accessToken);
        dispatch({ type: AUTH, data });
        navigate('/home');
      } else {
        // navigate('/profile');
        console.log('setup profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <Button
              className={classes.googleButton}
              color="primary"
              fullWidth
              onClick={googleLogin}
              startIcon={<Icon />}
              variant="contained"
            >
              Google Sign In
            </Button>
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
