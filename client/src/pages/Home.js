import Auth from '../utils/auth';

export default function Home() {
  console.log(Auth.loggedIn());

  return <div>Hi</div>;
}
