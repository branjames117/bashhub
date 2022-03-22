import { useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';

import Loading from '../Loading';
import Subevent from './Subevent';

export default function Subevents({ subevents, setSubevents }) {
  if (!subevents) {
    console.log('none');
    setSubevents([]);
    return <Loading variant='contained' />;
  }

  // if subevents is just an array of subevents,

  return (
    <>
      {subevents.map((day) => {
        console.log(day);
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
