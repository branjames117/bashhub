import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export default function Hero({ hero, name, eventType, eventParent }) {
  return (
    <Box sx={{ my: 3 }}>
      {eventParent && (
        <Link to={`/bash/e/${eventParent.slug}`}>
          <Box
            sx={{
              width: '100%',
              minHeight: 150,
              margin: '0',
              borderRadius: '10px 10px 0 0',
              backgroundImage: `${
                eventParent.hero
                  ? `url(${eventParent.hero})`
                  : `url(../../images/${eventParent.eventType}.jpg)`
              }`,
              backgroundColor: 'black',
              color: 'white',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                color: 'white',
                borderRadius: '10px 10px 0 0',
                minHeight: 150,
                width: '100%',
                padding: '8px 15px',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant='h4'>{eventParent.name}</Typography>
              <Typography variant='h6'>{eventParent.eventType}</Typography>
            </Box>
          </Box>
        </Link>
      )}
      <Box
        sx={{
          width: '100%',
          minHeight: 150,
          margin: '0',
          borderRadius: `${eventParent ? '0 0 10px 10px' : '10px'}`,
          backgroundImage: `${
            hero ? `url(${hero})` : `url(../../images/Subevent.jpg)`
          }`,
          backgroundColor: 'black',
          color: 'white',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: 'white',
            borderRadius: `${eventParent ? '0 0 10px 10px' : '10px'}`,
            minHeight: 150,
            width: '100%',
            padding: '8px 15px',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant='h5'>{name}</Typography>
          <Typography variant='h6'>{eventType}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
