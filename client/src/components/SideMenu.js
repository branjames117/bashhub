import { Link } from 'react-router-dom';
import { List, Button, Divider } from '@mui/material';
import Auth from '../utils/auth';

export default function SideMenu() {
  return (
    <List component='nav'>
      <Button variant='text'>
        <Link to={`/bash/u/${Auth.getProfile().data.username}`}>
          View/Edit My Profile
        </Link>
      </Button>
      <Divider sx={{ my: 1 }} />
      <Button variant='text'>Create New Event</Button>
      <Divider sx={{ my: 1 }} />
      <Button variant='text'>Events I'm Managing</Button>
      <Divider sx={{ my: 1 }} />
      <Button variant='text'>Events I'm Attending</Button>
    </List>
  );
}
