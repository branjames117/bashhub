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

import Auth from '../../utils/auth';
import { DateFormatter } from '../../utils/dateFormat';

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
        <Typography>
          {DateFormatter.getDate(startDate)}{' '}
          {startTime && `@ ${DateFormatter.getTime(startTime)}`}
        </Typography>
        {endDate ||
          (endTime && (
            <Typography>
              to {DateFormatter.getDate(endDate)}
              {endTime && `@ ${DateFormatter.getTime(endTime)}`}
            </Typography>
          ))}
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
