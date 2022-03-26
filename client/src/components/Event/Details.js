import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Box,
  Button,
  Paper,
  Typography,
  Chip,
  Avatar,
} from '@mui/material';

import { useMutation } from '@apollo/client';
import { QUERY_EVENT, QUERY_ME, QUERY_EVENTS } from '../../utils/queries';
import { REMOVE_EVENT } from '../../utils/mutations';

import Auth from '../../utils/auth';
import DateFormatter from '../../utils/dateFormat';

import AttendButton from './AttendButton';

export default function Details({
  _id,
  startDate,
  startTime,
  endDate,
  endTime,
  location,
  url,
  ticketsUrl,
  pricing,
  tags,
  ownerName,
  slug,
  eventParent,
  attendees,
  setAttendees,
  ownerAvatar,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [removeEvent] = useMutation(REMOVE_EVENT, {
    update(cache, { data: { removeEvent } }) {
      try {
        // if event is a subevent, update the QUERY_EVENT cache
        if (eventParent?._id) {
          const { event } = cache.readQuery({
            query: QUERY_EVENT,
            variables: {
              slug: eventParent?.slug,
            },
          });
          // two different write queries depending on if this is a subevent edit
          cache.writeQuery({
            query: QUERY_EVENT,
            variables: { slug: eventParent?.slug },
            data: {
              event: {
                ...event,
                subevents: [
                  ...event.subevents.filter((event) => event._id !== _id),
                ],
              },
            },
          });
        } else {
          // if event is just an event, update the QUERY_ME cache
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: {
              me: {
                ...me,
                eventsManaged: [
                  ...me.eventsManaged.filter((event) => event._id !== _id),
                ],
              },
            },
          });
        }
      } catch (e) {}
      try {
        if (!eventParent?._id) {
          const data = cache.readQuery({ query: QUERY_EVENTS });
          cache.writeQuery({
            query: QUERY_EVENTS,
            data: {
              events: [...data.events.filter((event) => event._id !== _id)],
            },
          });
        }
      } catch (e) {}
    },
  });

  const deleteHandler = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
    } else {
      try {
        await removeEvent({
          variables: {
            event_id: _id,
            event_parent_id: eventParent?._id || null,
          },
        });

        window.location.replace('/bash/manage-events');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Grid item xs={12} sm={12} md={4} lg={4}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant='h5'>Details</Typography>
        <Typography
          sx={{
            overflowX: 'hidden',
            whiteSpace: 'pre-line',
          }}
        >
          {DateFormatter.getTimeString(
            DateFormatter.getDate(startDate),
            DateFormatter.getTime(startTime),
            DateFormatter.getDate(endDate),
            DateFormatter.getTime(endTime)
          )}
        </Typography>
        <Typography sx={{ overflowX: 'hidden', whiteSpace: 'pre-line' }}>
          {location}
        </Typography>
        {url && <a href={url}>Visit the website.</a>}
        {ticketsUrl && <a href={ticketsUrl}>Buy tickets.</a>}
        {pricing && <Typography>{pricing}</Typography>}
        <div>
          {tags &&
            tags.map((tag) => (
              <Chip
                variant='outlined'
                label={tag.name}
                key={tag.name}
                sx={{ m: 1 }}
                onClick={() => {}}
              />
            ))}
        </div>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          Created by
          <Link
            to={`/bash/u/${ownerName}`}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Avatar
              alt={ownerName}
              src={ownerAvatar}
              sx={{ width: 128, height: 128, mt: 2 }}
            />
          </Link>
        </Box>
        {eventParent && (
          <Link to={`/bash/e/${eventParent.slug}`}>
            <Button variant='contained' sx={{ width: '100%', my: 1 }}>
              {eventParent.name}
            </Button>
          </Link>
        )}
        {!eventParent && (
          <AttendButton
            event_id={_id}
            attendees={attendees}
            setAttendees={setAttendees}
            slug={slug}
          />
        )}
        {Auth.getProfile().data.username === ownerName && (
          <Link to={`/bash/edit/${slug}`}>
            <Button variant='contained' sx={{ width: '100%', my: 1 }}>
              Edit This Event
            </Button>
          </Link>
        )}
        {Auth.getProfile().data.username === ownerName && (
          <Button
            variant='contained'
            onClick={deleteHandler}
            sx={{ width: '100%', backgroundColor: 'red', my: 1 }}
          >
            {confirmDelete
              ? 'Click Again to Delete Forever'
              : 'Delete This Event'}
          </Button>
        )}
        {Auth.getProfile().data.username === ownerName && !eventParent && (
          <Link to={`/bash/create/${slug}`}>
            <Button variant='contained' sx={{ width: '100%', my: 1 }}>
              Add Subevent
            </Button>
          </Link>
        )}
      </Paper>
    </Grid>
  );
}
