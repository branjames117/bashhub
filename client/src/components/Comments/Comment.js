import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function Comment() {
  return (
    <List sx={{ width: '100%' }}>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar sx={{ mr: 3 }}>
          <Avatar
            alt='Remy Sharp'
            src='/static/images/avatar/1.jpg'
            sx={{ width: 64, height: 64 }}
          />
        </ListItemAvatar>
        <ListItemText
          sx={{ gap: 3 }}
          primary={`These movies are so good. You're going to love being out here. Come check them out!`}
          secondary={
            <>
              <Typography sx={{ textAlign: 'right', p: 3 }} component='span'>
                by branjames117 on 12 Mar 2022 at 10:00 P.M.
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider component='li' sx={{ my: 3 }} />
    </List>
  );
}
