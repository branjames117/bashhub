import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SocketContext, socket } from './context/socket';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Auth from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  socket.emit();
  console.log('Logged in? ', Auth.loggedIn());

  return (
    <ApolloProvider client={client}>
      <Router>
        <SocketContext.Provider value={socket}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route
                path='*'
                element={<h1 className='display-2'>Wrong page!</h1>}
              />
            </Routes>
          </ThemeProvider>
        </SocketContext.Provider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
