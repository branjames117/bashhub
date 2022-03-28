import { useState } from 'react';
import Auth from '../utils/auth';

// materials
import {
  CssBaseline,
  Box,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Container,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// components
import AppBar from '../components/AppBar';
import Drawer from '../components/Drawer';
import SideMenu from '../components/SideMenu';
import UserProfile from '../components/User/UserProfile';
import Event from '../components/Event/Event';
import SubEvent from '../components/SubEvent';
import Creator from '../components/Creator/Creator';
import SubeventCreator from '../components/Creator/SubeventCreator';
import Editor from '../components/Creator/Editor';
import ManagedEvents from '../components/User/ManagedEvents';
import AttendingEvents from '../components/User/AttendingEvents';
import BrowseEvents from '../components/Event/BrowseEvents';
import NotifIcon from '../components/NotifIcon';
import Notifications from '../components/User/Notifications';

export default function Dashboard({ variant, client }) {
  // if user is not logged in, kick them back to login page
  if (!Auth.loggedIn()) window.location.assign('/');

  const [open, setOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar position='absolute' open={open}>
        <Toolbar
          sx={{
            pr: '10px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '10px',
            }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Bash Hub
          </Typography>
          <NotifIcon
            notificationCount={notificationCount}
            setNotificationCount={setNotificationCount}
            client={client}
          />
          <Button
            variant='text'
            sx={{ color: '#fff', pl: 3 }}
            onClick={() => Auth.logout()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <SideMenu setOpen={setOpen} />
      </Drawer>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
        // close side menu if main content box is clicked on
        onClick={() => setOpen(false)}
      >
        <Toolbar />
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          {variant === 'user' && (
            <UserProfile myUsername={Auth.getProfile().data.username} />
          )}
          {variant === 'browser' && <BrowseEvents />}
          {variant === 'manager' && <ManagedEvents />}
          {variant === 'attending' && <AttendingEvents />}
          {variant === 'notifications' && (
            <Notifications setNotificationCount={setNotificationCount} />
          )}
          {variant === 'event' && <Event />}
          {variant === 'subevent' && <SubEvent />}
          {variant === 'creator' && <Creator />}
          {variant === 'editor' && <Editor />}
          {variant === 'subeventCreator' && <SubeventCreator />}
        </Container>
      </Box>
    </Box>
  );
}
