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
  cache: new InMemoryCache({
    typePolicies: {
      Event: {
        fields: {
          attendees: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          comments: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          subevents: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
      User: {
        fields: {
          eventsAttending: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          eventsManaged: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

function App() {
  socket.emit();

  return (
    <ApolloProvider client={client}>
      <Router>
        <SocketContext.Provider value={socket}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/bash' element={<Dashboard variant='browser' />} />
              <Route
                path='/bash/u/:username'
                element={<Dashboard variant='user' />}
              />
              <Route
                path='/bash/u/:username'
                element={<Dashboard variant='user' />}
              />
              <Route
                path='/bash/notifs'
                element={<Dashboard variant='notifications' />}
              />
              <Route
                path='/bash/manage-events'
                element={<Dashboard variant='manager' />}
              />
              <Route
                path='/bash/attending'
                element={<Dashboard variant='attending' />}
              />
              <Route
                path='/bash/e/:slug'
                element={<Dashboard variant='event' />}
              />
              <Route
                path='/bash/create'
                element={<Dashboard variant='creator' />}
              />
              <Route
                path='/bash/create/:slug'
                element={<Dashboard variant='subeventCreator' />}
              />
              <Route
                path='/bash/edit/:slug'
                element={<Dashboard variant='editor' />}
              />
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
