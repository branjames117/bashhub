import { useContext } from 'react';
import { SocketContext } from '../context/socket';
import Auth from '../utils/auth';

export default function Home() {
  
  console.log(Auth.loggedIn());

  return <div>Hi</div>;
}
