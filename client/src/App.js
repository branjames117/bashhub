import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SocketContext, socket } from './context/socket';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Login from './pages/Login';
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
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>}
            />
          </Routes>
        </SocketContext.Provider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
