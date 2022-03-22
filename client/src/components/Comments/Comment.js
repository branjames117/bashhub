import { Link } from 'react-router-dom';

import {
  Box,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';

export default function Comment() {
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
                alt='Remy Sharp'
                src='/static/images/avatar/1.jpg'
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
                {`These movies are so good. You're going to love being out here.
              Come check them out!`}
              </div>
            }
            secondary={
              <>
                <Typography
                  sx={{
                    p: 3,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                  component='span'
                >
                  <Link to={`/bash/u/branjames117`}>
                    posted by branjames117 on 12 Mar 2022 at 10:00 P.M.
                  </Link>
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
