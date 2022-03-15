import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Navbar() {
  const [loginMode, setLoginMode] = useState(true);
  const [userFormData, setUserFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [login] = useMutation(LOGIN_USER);
  const [register] = useMutation(ADD_USER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting to login');

    try {
      const mutationResponse = await login({
        variables: {
          email: userFormData.email,
          username: userFormData.username,
          password: userFormData.password,
        },
      });

      const token = mutationResponse.data.login.token;
      console.log(token);

      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Attempting to register');

    try {
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
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <span onClick={() => setLoginMode(!loginMode)}>
        {loginMode ? 'Click for Register' : 'Click for Login'}
      </span>
      <form onSubmit={loginMode ? handleLogin : handleRegister}>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          id='email'
          onChange={handleInputChange}
          value={userFormData.email}
          required
        ></input>
        {!loginMode && (
          <>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              id='username'
              onChange={handleInputChange}
              value={userFormData.username}
              required
            ></input>
          </>
        )}
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          onChange={handleInputChange}
          value={userFormData.password}
          required
        ></input>
        <button type='submit'>{loginMode ? 'Login' : 'Sign up'}</button>
      </form>
    </>
  );
}
