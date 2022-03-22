import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../../utils/queries';

import { Grid, Paper } from '@mui/material';

import { DateFormatter } from '../../utils/dateFormat';

import Hero from './Hero';
import Details from './Details';
import Description from './Description';
import Loading from '../Loading';
import Subevents from './Subevents';
import Attendees from './Attendees';
import CommentInput from '../Comments/CommentInput';
import Comment from '../Comments/Comment';

export default function Event() {
  const { slug } = useParams();
  const [eventData, setEventData] = useState({});
  const [subevents, setSubevents] = useState([]);
  const [attendees, setAttendees] = useState([]);

  const { data, loading } = useQuery(QUERY_EVENT, {
    variables: { slug: slug },
  });

  useEffect(() => {
    if (!loading) {
      const { event } = data;
      setEventData(event);
      setSubevents(DateFormatter.sortSubevents(event.subevents));
      setAttendees(event.attendees);
    }
  }, [data, loading]);

  return loading || !eventData ? (
    <Loading />
  ) : (
    <>
      <Hero
        name={eventData.name}
        hero={eventData.hero}
        eventType={`${eventData.eventParent ? '' : eventData.eventType}`}
        eventParent={eventData.eventParent}
      />
      <Grid container spacing={3}>
        {/* Details */}
        <Details
          _id={eventData._id}
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
          attendees={eventData.attendees}
          setAttendees={setAttendees}
        />

        {/* Description */}
        <Description
          description={eventData.description}
          videoUrl={eventData.videoUrl}
        />

        {/* Subevents */}
        {subevents.length !== 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Subevents subevents={subevents} setSubevents={setSubevents} />
            </Paper>
          </Grid>
        )}

        {/* Attendees */}
        {attendees.length !== 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Attendees attendees={eventData.attendees} />
            </Paper>
          </Grid>
        )}

        {/* My Comments */}
        <Grid item xs={12} sx={{ mb: 25 }}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <CommentInput />
            <Comment />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
