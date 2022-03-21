import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

import { Grid, Paper, Typography } from '@mui/material';
import UserBio from './UserBio';
import UserProfilePicture from './UserProfilePicture';
import Banner from './Banner';
import Loading from '../Loading';
import { getDate, getTime } from '../../utils/dateFormat';

export default function UserProfile({ myUsername }) {
  const { username } = useParams();

  const { data: userData, loading } = useQuery(QUERY_USER, {
    variables: { username: username },
  });

  const [owned, setOwned] = useState(false);

  useEffect(() => {
    // is logged in user same as profile? if so, give them control
    if (username === myUsername) {
      setOwned(true);
    }
  }, [myUsername, username, loading, userData]);

  return loading || !userData.user ? (
    <Loading />
  ) : (
    <Grid container spacing={3}>
      {/* Profile Picture */}
      <Grid item xs={12} sm={5} md={4} lg={3}>
        <UserProfilePicture owned={owned} currAvatar={userData?.user?.avatar} />
      </Grid>
      {/* Bio */}
      <Grid item xs={12} sm={7} md={8} lg={9}>
        <UserBio
          username={username}
          owned={owned}
          currBio={userData?.user?.bio}
        />
      </Grid>

      {/* My Events */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'>Events I'm Managing</Typography>
          {userData &&
            userData?.user?.eventsManaged.map((event) => (
              <Banner
                key={event._id}
                _id={event._id}
                slug={event.slug}
                hero={event.hero}
                name={event.name}
                eventType={event.eventType}
                startDate={getDate(event.startDate)}
                startTime={getTime(event.startTime)}
                endDate={getDate(event.endDate)}
                endTime={getTime(event.endTime)}
                location={event.location}
              />
            ))}
        </Paper>
      </Grid>

      {/* My Comments */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          My Comments
        </Paper>
      </Grid>
    </Grid>
  );
}
