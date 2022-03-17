import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from '@mui/material';

import Auth from '../utils/auth';

export default function Login() {
  const [loginMode, setLoginMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [userFormData, setUserFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [login] = useMutation(LOGIN_USER);
  const [register] = useMutation(ADD_USER);

  // if user is already logged in, kick them back to dashboard page
  if (Auth.loggedIn()) window.location.assign('/bash');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userFormData.email.trim()) {
      setErrorMessage('Email address is required.');
      return;
    }

    try {
      if (loginMode) {
        if (!userFormData.password) {
          setErrorMessage('Enter your password.');
          return;
        }

        const mutationResponse = await login({
          variables: {
            email: userFormData.email,
            password: userFormData.password,
          },
        });

        const token = mutationResponse.data.login.token;
        Auth.login(token);
      } else {
        if (!userFormData.username) {
          setErrorMessage('Username is required.');
          return;
        }

        if (
          userFormData.password !== userFormData.confirmPassword ||
          !userFormData.password.trim() ||
          !userFormData.confirmPassword.trim()
        ) {
          setErrorMessage('Sign up failed. Passwords must match.');
          return;
        }

        const mutationResponse = await register({
          variables: {
            email: userFormData.email,
            username: userFormData.username,
            password: userFormData.password,
          },
        });

        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Login failed. Credentials not found.');
    }

    setUserFormData({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        lg={8}
        sx={{
          backgroundImage: 'url(./images/festival.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={4}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'purple' }}></Avatar>
          <Typography component='h1' variant='h5'>
            {loginMode ? 'Log in to ' : 'Sign up for '} Bash
          </Typography>
          <Typography component='h2' variant='h6'>
            Because this is where it happens.
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleLogin}
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={userFormData.email}
              onChange={handleInputChange}
              onFocus={() => {
                setErrorMessage('');
              }}
            />
            {!loginMode && (
              <TextField
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                value={userFormData.username}
                onChange={handleInputChange}
                onFocus={() => {
                  setErrorMessage('');
                }}
              />
            )}
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={userFormData.password}
              onChange={handleInputChange}
              onFocus={() => {
                setErrorMessage('');
              }}
            />
            {!loginMode && (
              <TextField
                margin='normal'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                value={userFormData.confirmPassword}
                onChange={handleInputChange}
                onFocus={() => {
                  setErrorMessage('');
                }}
              />
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href='#'
                  onClick={() => {
                    setErrorMessage('');
                    setLoginMode(!loginMode);
                  }}
                  variant='body2'
                >
                  {loginMode
                    ? "Don't have an account? Sign up!"
                    : 'Already have an account? Log in!'}
                </Link>
              </Grid>
            </Grid>
            {errorMessage && (
              <Typography
                sx={{
                  textAlign: 'center',
                  color: 'red',
                  mt: 3,
                }}
              >
                {errorMessage}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
