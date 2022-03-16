import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

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
        console.log('Attempting to login');

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

        console.log('response: ', mutationResponse);

        const token = mutationResponse.data.login.token;
        console.log(token);
        Auth.login(token);
      } else {
        console.log('Attempting to register');

        if (!userFormData.username) {
          setErrorMessage('Username is required.');
          return;
        }

        console.log(userFormData);

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
        console.log(token);
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
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(./images/concert.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'crimson' }}></Avatar>
            <Typography component='h1' variant='h5'>
              {loginMode ? 'Sign in ' : 'Log in '} to Bash
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 1 }}
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
    </ThemeProvider>
  );
}
