import { Box, Typography, Grid } from '@mui/material';

import Loading from '../Loading';
import Subevent from './Subevent';

export default function Subevents({ subevents, setSubevents }) {
  if (!subevents) {
    setSubevents([]);
    return <Loading variant='contained' />;
  }

  return (
    <>
      {subevents.map((day) => {
        return (
          <Box key={Math.random()} sx={{ py: 1 }}>
            <Typography
              sx={{ textAlign: 'center' }}
              variant='h6'
              key={day.date}
            >
              {day.date}
            </Typography>
            <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
              {day.subevents?.map((subevent) => (
                <Subevent key={subevent._id} subevent={subevent} />
              ))}
            </Grid>
          </Box>
        );
      })}
    </>
  );
}
