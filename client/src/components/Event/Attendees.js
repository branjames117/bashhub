import { Link } from 'react-router-dom';
import { Typography, Stack, Avatar } from '@mui/material';

export default function Attendees({ attendees }) {
  return (
    <>
      <Typography variant='h5' sx={{ textAlign: 'center', mb: 2 }}>
        Attendees
      </Typography>
      <Stack direction='row' spacing={2} sx={{ justifyContent: 'center' }}>
        {attendees.map((user) => (
          <Link to={`/bash/u/${user.username}`} key={user._id}>
            <Avatar
              alt={user.username}
              title={user.username}
              src={user.avatar}
              sx={{ width: 128, height: 128 }}
            />
          </Link>
        ))}
      </Stack>
    </>
  );
}
