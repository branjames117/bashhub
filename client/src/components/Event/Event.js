import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';
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
  const [comments, setComments] = useState([]);
  const bottomRef = useRef();

  const { data, loading } = useQuery(QUERY_EVENT, {
    variables: { slug: slug },
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      // scroll user to bottom upon successful cache update
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      // cache could potentially not exist yet, so wrap in try catch block
      try {
        // read what's currently in the cache
        const { event } = cache.readQuery({
          query: QUERY_EVENT,
          variables: { slug: slug },
        });

        console.log(event);

        // prepend the newest comment to the front of the array
        cache.writeQuery({
          query: QUERY_EVENT,
          variables: { slug: slug },
          data: {
            event: { ...event, comments: [...addComment.comments] },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  useEffect(() => {
    if (!loading) {
      const { event } = data;
      setEventData(event);
      setSubevents(DateFormatter.sortSubevents(event.subevents));
      setAttendees(event.attendees);
      setComments(event.comments);
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
          ownerAvatar={eventData.ownerId?.avatar}
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

        {/* Comments */}
        {eventData.commentsEnabled && (
          <Grid item xs={12} sx={{ mb: 25 }}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <CommentInput slug={eventData.slug} addComment={addComment} />
              {comments.map((comment) => (
                <Comment comment={comment} key={comment._id} />
              ))}
            </Paper>
          </Grid>
        )}
      </Grid>
      <div ref={bottomRef}></div>
    </>
  );
}
