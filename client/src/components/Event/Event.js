import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../../utils/queries';

import { Grid, Paper } from '@mui/material';

import Hero from './Hero';
import Details from './Details';
import Description from './Description';
import Loading from '../Loading';
import Subevent from './Subevents';

export default function Event() {
  const { slug } = useParams();
  const [eventData, setEventData] = useState({});

  const { data, loading } = useQuery(QUERY_EVENT, {
    variables: { slug: slug },
  });

  useEffect(() => {
    if (!loading) {
      const { event } = data;
      console.log(event.subevents);
      setEventData(event);
    }
  }, [data, loading]);

  return loading || !eventData ? (
    <Loading />
  ) : (
    <>
      <Hero
        name={eventData.name}
        hero={eventData.hero}
        eventType={eventData.eventType}
      />
      <Grid container spacing={3}>
        {/* Details */}
        <Details
          startDate={eventData.startDate}
          startTime={eventData.startTime}
          endDate={eventData.endDate}
          endTime={eventData.endTime}
          location={eventData.location}
          url={eventData.url}
          ticketsUrl={eventData.ticketsUrl}
          pricing={eventData.pricing}
          tags={eventData.tags}
          ownerName={eventData.ownerName}
          slug={eventData.slug}
          eventParent={eventData.eventParent}
        />

        {/* Description */}
        <Description
          description={eventData.description}
          videoUrl={eventData.videoUrl}
        />

        {/* Subevents */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            Subevents
          </Paper>
        </Grid>

        {/* Attendees */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            Attendees
          </Paper>
        </Grid>

        {/* My Comments */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            Comments
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
