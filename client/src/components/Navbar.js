import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <h2>Bash Hub</h2>
      <ul>
        <Link to={'/login'}>Login / Signup</Link>
      </ul>
    </nav>
  );
}
