import { Box, Typography } from '@mui/material';

export default function Hero({ hero, name, eventType }) {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 150,
        margin: '20px 0',
        borderRadius: '10px',
        backgroundImage: `${hero ? `url(${hero})` : ''}`,
        backgroundColor: 'black',
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
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant='h4'>{name}</Typography>
        <Typography variant='h6'>{eventType}</Typography>
      </Box>
    </Box>
  );
}
