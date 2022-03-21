import { Box, CircularProgress } from '@mui/material';

export default function Loading({ variant }) {
  const height = variant === 'contained' ? '100%' : 'calc(100vh - 250px)';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
