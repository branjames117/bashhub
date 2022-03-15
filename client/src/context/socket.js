import { createContext } from 'react';
import io from 'socket.io-client';
// import { SOCKET_URL } from 'config';

export const socket = io.connect('http://localhost:3001');
export const SocketContext = createContext();
