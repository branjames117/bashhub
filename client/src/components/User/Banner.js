import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

export default function Banner({
  _id,
  slug,
  hero,
  name,
  eventType,
  startDate,
  startTime,
  endDate,
  endTime,
  location,
}) {
  return (
    <Link key={_id} to={`/bash/e/${slug}`}>
      <Box
        sx={{
          width: '100%',
          minHeight: 150,
          margin: '20px 0',
          borderRadius: '10px',
          backgroundImage: `url(${hero})`,
          color: 'white',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: 'white',
            borderRadius: '10px',
            minHeight: 150,
            width: '100%',
            padding: '8px 15px',
          }}
        >
          <Typography variant='h6'>{name}</Typography>
          <Typography>{eventType}</Typography>
          <Typography>
            {startDate} {startTime && `@ ${startTime}`}
            <br />
            {endDate && `to ${endDate}`}
            {endTime && ` @ ${endTime}`}
          </Typography>
          <Typography>{location}</Typography>
        </Box>
      </Box>
    </Link>
  );
}
