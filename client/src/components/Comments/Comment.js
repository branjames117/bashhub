import { Link } from 'react-router-dom';

import {
  Box,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import { DateFormatter } from '../../utils/dateFormat';
import Auth from '../../utils/auth';

export default function Comment({ comment, removeComment, slug }) {
  const handleRemove = async () => {
    await removeComment({
      variables: {
        event_slug: slug,
        _id: comment._id,
      },
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30px',
      }}
    >
      <List
        sx={{
          width: '90%',
        }}
      >
        <ListItem alignItems='flex-start'>
          <ListItemAvatar sx={{ mr: 3 }}>
            <Link to={`/bash/u/branjames117`}>
              <Avatar
                alt={comment.author.username}
                src={comment.author.avatar}
                sx={{ width: 64, height: 64 }}
              />
            </Link>
          </ListItemAvatar>
          <ListItemText
            sx={{ gap: 3 }}
            primary={
              <div
                style={{
                  overflowX: 'hidden',
                  whiteSpace: 'pre-line',
                  marginBottom: '15px',
                }}
              >
                {comment.body}
              </div>
            }
            secondary={
              <>
                <Typography
                  sx={{
                    p: 3,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}
                  component='span'
                >
                  <Link to={`/bash/u/${comment.author.username}`}>
                    {comment.author.username}
                  </Link>
                  {DateFormatter.dateFormat(comment.createdAt)}
                  {Auth.getProfile().data.username ===
                    comment.author.username && (
                    <Button onClick={handleRemove}>Remove Comment</Button>
                  )}
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider component='li' sx={{ my: 3 }} />
      </List>
    </Box>
  );
}
