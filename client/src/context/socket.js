import { createContext } from 'react';
import io from 'socket.io-client';
import Auth from '../utils/auth';
// import { SOCKET_URL } from 'config';

export const socket = io.connect({
  query: {
    token: Auth.getToken(),
  },
});
// export const socket = io.connect('http://localhost:3001', {
//   query: {
//     token: Auth.getToken(),
//   },
// });
export const SocketContext = createContext();
