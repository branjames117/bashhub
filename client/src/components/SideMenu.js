import { Link } from 'react-router-dom';
import { Typography, List, Button, Divider } from '@mui/material';
import {
  AddCircle,
  AccountCircle,
  Assignment,
  DirectionsCar,
} from '@mui/icons-material';
import Auth from '../utils/auth';

export default function SideMenu({ setOpen }) {
  return (
    <List component='nav'>
      <Button variant='text'>
        <Link
          to={`/bash/u/${Auth.getProfile().data.username}`}
          onClick={() => setOpen(false)}
        >
          <AccountCircle sx={{ transform: 'translateY(7px)' }} />
          <Typography variant='inherit' display='inline' sx={{ pl: 1 }}>
            View/Edit My Profile
          </Typography>
        </Link>
      </Button>
      <Divider sx={{ my: 1 }} />
      <Button variant='text'>
        <Link to={`/bash/create`} onClick={() => setOpen(false)}>
          <AddCircle sx={{ transform: 'translateY(7px)' }} />
          <Typography variant='inherit' display='inline' sx={{ pl: 1 }}>
            Create New Event
          </Typography>
        </Link>
      </Button>
      <Divider sx={{ my: 1 }} />
      <Button variant='text'>
        <Link to={`/bash/create`} onClick={() => setOpen(false)}>
          <Assignment sx={{ transform: 'translateY(7px)' }} />
          <Typography variant='inherit' display='inline' sx={{ pl: 1 }}>
            Events I'm Managing
          </Typography>
        </Link>
      </Button>
      <Divider sx={{ my: 1 }} />
      <Button variant='text'>
        <Link to={`/bash/create`} onClick={() => setOpen(false)}>
          <DirectionsCar sx={{ transform: 'translateY(7px)' }} />
          <Typography variant='inherit' display='inline' sx={{ pl: 1 }}>
            Events I'm Attending
          </Typography>
        </Link>
      </Button>
    </List>
  );
}
