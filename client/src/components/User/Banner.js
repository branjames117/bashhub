import { Link } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import DateFormatter from '../../utils/dateFormat';

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
          backgroundImage: `${
            hero
              ? `url(${hero})`
              : `url(../../images/${eventType.replace(' ', '')}.jpg)`
          }`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          color: 'white',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            borderRadius: '10px',
            minHeight: 150,
            width: '100%',
            padding: '8px 15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Typography variant='h6'>{name}</Typography>
          <Typography>{eventType}</Typography>
          <Typography>
            {DateFormatter.getTimeString(
              startDate,
              startTime,
              endDate,
              endTime
            )}
          </Typography>
          <Typography
            style={{
              overflowX: 'hidden',
              whiteSpace: 'pre-line',
              paddingTop: '8px',
              textAlign: 'center',
            }}
          >
            {location}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}
