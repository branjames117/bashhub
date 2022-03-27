import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { socket, SocketContext } from '../context/socket';

import { useQuery } from '@apollo/client';
import { QUERY_NOTIF_COUNT } from '../utils/queries';

import { IconButton, Badge, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NotifIcon({ notificationCount, setNotificationCount }) {
  useContext(SocketContext);

  const { data, loading } = useQuery(QUERY_NOTIF_COUNT);

  socket.on('newNotification', (data) => {
    setNotificationCount(notificationCount + 1);
  });

  useEffect(() => {
    if (!loading) {
      const { notifCount } = data;
      console.log(notifCount);
      setNotificationCount(notifCount);
    }
  }, [setNotificationCount, data, loading]);

  return (
    <Button
      color='secondary'
      variant='text'
      component={Link}
      to={`/bash/notifs`}
    >
      <IconButton color='inherit'>
        <Badge badgeContent={notificationCount} color='text'>
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Button>
  );
}
