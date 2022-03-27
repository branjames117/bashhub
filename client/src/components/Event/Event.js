import { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_COMMENT, REMOVE_COMMENT } from '../../utils/mutations';
import { QUERY_EVENT } from '../../utils/queries';
import { socket, SocketContext } from '../../context/socket';

import { Grid, Paper } from '@mui/material';

import DateFormatter from '../../utils/dateFormat';

import Hero from './Hero';
import Details from './Details';
import Description from './Description';
import Loading from '../Loading';
import Subevents from './Subevents';
import Attendees from './Attendees';
import CommentInput from '../Comments/CommentInput';
import Comment from '../Comments/Comment';
import Auth from '../../utils/auth';

export default function Event() {
  const { slug } = useParams();

  useContext(SocketContext);

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
      // send signal to server notifying event owner that a comment was left, only if commenter is not also the event owner
      if (Auth.getProfile().data._id !== eventData?.ownerId?._id) {
        socket.emit('newComment', {
          from: Auth.getProfile().data._id,
          to: eventData.ownerId._id,
          subject: eventData._id,
        });
      }
      // scroll user to bottom upon successful cache update
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      // cache could potentially not exist yet, so wrap in try catch block
      try {
        // read what's currently in the cache
        const { event } = cache.readQuery({
          query: QUERY_EVENT,
          variables: { slug: slug },
        });

        // overwrite old array with new array
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

  const [removeComment] = useMutation(REMOVE_COMMENT, {
    update(cache, { data: { removeComment } }) {
      // cache could potentially not exist yet, so wrap in try catch block
      try {
        // read what's currently in the cache
        const { event } = cache.readQuery({
          query: QUERY_EVENT,
          variables: { slug: slug },
        });

        // overwrite old array with new array
        cache.writeQuery({
          query: QUERY_EVENT,
          variables: { slug: slug },
          data: {
            event: { ...event, comments: [...removeComment.comments] },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  useEffect(() => {
    if (!loading && data) {
      const { event } = data;
      setEventData(event);
      setSubevents(
        event?.subevents && DateFormatter.sortSubevents(event?.subevents)
      );
      setAttendees(event?.attendees);
      setComments(event?.comments);
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
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CommentInput slug={eventData.slug} addComment={addComment} />
              {comments.map((comment) => (
                <Comment
                  comment={comment}
                  key={comment._id}
                  removeComment={removeComment}
                  slug={slug}
                />
              ))}
            </Paper>
          </Grid>
        )}
      </Grid>
      <div ref={bottomRef}></div>
    </>
  );
}
