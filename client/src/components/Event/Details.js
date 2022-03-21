import { Link } from 'react-router-dom';
import { Grid, Button, Paper, Typography, Chip } from '@mui/material';

import Auth from '../../utils/auth';
import { getDate, getTime } from '../../utils/dateFormat';

export default function Details({
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
}) {
  return (
    <Grid item sm={12} md={4} lg={4}>
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
          {getDate(startDate)} {startTime && `@ ${getTime(startTime)}`}
        </Typography>
        {endDate ||
          (endTime && (
            <Typography>
              to {getDate(endDate)}
              {endTime && `@ ${getTime(endTime)}`}
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
                sx={{ mx: 1 }}
                onClick={() => {}}
              />
            ))}
        </div>
        <Typography>
          Bash page managed by{' '}
          <Link to={`/bash/u/${ownerName}`}>{ownerName}</Link>
        </Typography>
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
