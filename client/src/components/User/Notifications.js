import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';

import { useQuery } from '@apollo/client';
import { QUERY_NOTIFICATIONS } from '../../utils/queries';
import { socket, SocketContext } from '../../context/socket';

import DateFormatter from '../../utils/dateFormat';
import Auth from '../../utils/auth';
import Loading from '../Loading';

export default function Notifications({ setNotificationCount }) {
  if (!Auth.loggedIn()) window.location.assign('/');

  const [notifications, setNotifications] = useState([]);

  const { loading, data, refetch } = useQuery(QUERY_NOTIFICATIONS);

  useContext(SocketContext);

  socket.on('newNotification', (data) => {
    refetch();
  });

  useEffect(() => {
    setNotificationCount(0);
    if (!loading) {
      const { notifications } = data;
      setNotifications(notifications);
    }
  }, [refetch, setNotificationCount, data, loading]);

  return loading ? (
    <Loading />
  ) : (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        mb: 25,
      }}
    >
      <Typography variant='h5'>My Notifications</Typography>
      <Button onClick={() => refetch()}>Mark All as Read</Button>
      <List>
        {notifications.map((notification) => (
          <ListItem
            key={notification._id}
            sx={{
              backgroundColor: `${notification.read ? `#eee` : `#ccc`}`,
              borderRadius: '5px',
              my: 1,
            }}
            disablePadding
          >
            <ListItemButton
              component={Link}
              to={`/bash/e/${notification.subject.slug}`}
            >
              <ListItemText
                primary={`${DateFormatter.dateFormat(
                  notification.createdAt
                )} - ${notification.fromId.username} left a ${
                  notification.read ? '' : 'new'
                } ${notification.notifType} on ${notification.subject.name}.`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
