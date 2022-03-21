import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, Chip } from '@mui/material';

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
          {startDate} {startTime && `@ ${startTime}`}
        </Typography>
        {endDate ||
          (endTime && (
            <Typography>
              to {endDate}
              {endTime && `@ ${endTime}`}
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
      </Paper>
    </Grid>
  );
}
