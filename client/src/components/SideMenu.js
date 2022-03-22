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
    <List component='nav' sx={{ pl: 1 }}>
      <Link
        to={`/bash/u/${Auth.getProfile().data.username}`}
        onClick={() => setOpen(false)}
      >
        <Button sx={{ my: 2 }}>
          <AccountCircle sx={{ mr: 1 }} /> View/Edit My Profile
        </Button>
      </Link>
      <Divider />
      <Link to={`/bash/create`} onClick={() => setOpen(false)}>
        <Button sx={{ my: 2 }}>
          <AddCircle sx={{ mr: 1 }} /> Create New Event
        </Button>
      </Link>
      <Divider />
      <Link to={`/bash/manage-events`} onClick={() => setOpen(false)}>
        <Button sx={{ my: 2 }}>
          <Assignment sx={{ mr: 1 }} /> Events I'm Managing
        </Button>
      </Link>
      <Divider />
      <Link to={`/bash/attending`} onClick={() => setOpen(false)}>
        <Button sx={{ my: 2 }}>
          <DirectionsCar sx={{ mr: 1 }} /> Events I'm Attending
        </Button>
      </Link>
    </List>
  );
}
