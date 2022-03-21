import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { Paper, Typography } from '@mui/material';
import Auth from '../../utils/auth';
import { getDate, getTime } from '../../utils/dateFormat';

import Banner from './Banner';

export default function ManagedEvents() {
  if (!Auth.loggedIn()) window.location.assign('/');

  const { data, loading } = useQuery(QUERY_ME);

  console.log(data);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h5'>Events I'm Managing</Typography>
      {data &&
        data.me.eventsManaged.map((event) => (
          <Banner
            key={event._id}
            _id={event._id}
            slug={event.slug}
            hero={event.hero}
            name={event.name}
            eventType={event.eventType}
            startDate={getDate(event.startDate)}
            startTime={getTime(event.startTime)}
            endDate={getDate(event.endDate)}
            endTime={getTime(event.endTime)}
            location={event.location}
          />
        ))}
    </Paper>
  );
}
