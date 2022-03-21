import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { Paper, Typography, Button, Box } from '@mui/material';
import Auth from '../../utils/auth';

import Banner from './Banner';

export default function ManagedEvents() {
  if (!Auth.loggedIn()) window.location.assign('/');

  const { data, loading } = useQuery(QUERY_ME);

  if (data) {
    console.log(data.me.eventsManaged);
  }

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
            startDate={event.startDate}
            startTime={event.startTime}
            endDate={event.endDate}
            endTime={event.endTime}
            location={event.location}
          />
        ))}
    </Paper>
  );
}
