import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { socket, SocketContext } from '../context/socket';

import { useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_NOTIF_COUNT, QUERY_EVENT } from '../utils/queries';

import { IconButton, Badge, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NotifIcon({
  notificationCount,
  setNotificationCount,
  client,
}) {
  useContext(SocketContext);

  const { data, loading } = useQuery(QUERY_NOTIF_COUNT);

  const [updateEvent] = useLazyQuery(QUERY_EVENT);

  socket.on('newNotification', (data) => {
    setNotificationCount(notificationCount + 1);
    updateEvent({ variables: { slug: data.slug } });
  });

  useEffect(() => {
    if (!loading) {
      const { notifCount } = data;
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
