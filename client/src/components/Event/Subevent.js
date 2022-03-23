import { Link } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import DateFormatter from '../../utils/dateFormat';

export default function Subevent({ subevent }) {
  return (
    <Grid key={subevent._id} item sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Link to={`/bash/e/${subevent.slug}`}>{subevent.name}</Link>
        <div>
          {DateFormatter.getTime(subevent.startTime)}{' '}
          {subevent.endTime
            ? ` to ${DateFormatter.getTime(subevent.endTime)}`
            : ''}
        </div>
      </Box>
    </Grid>
  );
}
