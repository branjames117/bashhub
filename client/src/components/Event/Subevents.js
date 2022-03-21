import { useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';

import Loading from '../Loading';
import Subevent from './Subevent';

const sortSubevents = (input) => {
  // get ready for the least efficient sorting algorithm you've ever seen

  // find out how many unique dates there are among subevents and create a set containing each unique date
  const [...subevents] = input;
  const dates = new Set();

  // find out how many unique dates there are among the subevents
  subevents.forEach((e) =>
    dates.add(new Date(e.startDate - 0).toString().slice(0, 15))
  );

  // if there's only one date, just return the sorted subevents
  if (dates.size === 1) {
    subevents.sort((a, b) => {
      const startA =
        new Date(a.startTime - 0).getTime() ||
        new Date(a.startDate - 0).getTime();
      const startB =
        new Date(b.startTime - 0).getTime() ||
        new Date(b.startDate - 0).getTime();
      return startB - startA;
    });

    return subevents;
  }

  const datesArr = [...dates];

  const dailyPlan = [];

  datesArr.forEach((date) => {
    dailyPlan.push({ date, subevents: [] });
  });

  subevents.forEach((subevent) => {
    const date = new Date(subevent.startDate - 0).toString().slice(0, 15);
    const index = dailyPlan.findIndex((dateObj) => {
      return dateObj.date === date;
    });

    dailyPlan[index].subevents.push(subevent);
  });

  return dailyPlan;
};

export default function Subevents({ subevents, setSubevents }) {
  useEffect(() => {
    setSubevents(sortSubevents(subevents));
  }, [setSubevents]);

  if (!subevents) {
    setSubevents([]);
    return <Loading variant='contained' />;
  }

  // if subevents is just an array of subevents,
  if (subevents[0]?.date === null) {
    return (
      <>
        {subevents.map((subevent) => (
          <Subevent key={subevent._id} subevent={subevent} />
        ))}
      </>
    );
  } else {
    return (
      <>
        {subevents.map((day) => (
          <Box key={Math.random()} sx={{ py: 1 }}>
            <Typography
              sx={{ textAlign: 'center' }}
              variant='h6'
              key={day.date}
            >
              {day?.date}
            </Typography>
            <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
              {day?.subevents?.map((subevent) => (
                <Subevent key={subevent._id} subevent={subevent} />
              ))}
            </Grid>
          </Box>
        ))}
      </>
    );
  }
}
