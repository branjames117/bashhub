import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import { Button, Grid, Paper } from '@mui/material';
import UserBio from './UserBio';
import UserProfilePicture from './UserProfilePicture';

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
    if (!loading && !userData.user) {
      window.location.assign('/bash');
    }
  }, [myUsername, username, loading, userData]);

  if (loading || !userData.user) {
    return <></>;
  }

  return (
    <Grid container spacing={3}>
      {/* Biographical */}
      <Grid item xs={12} md={8} lg={9}>
        <UserBio
          username={username}
          owned={owned}
          currBio={userData?.user?.bio}
        />
      </Grid>
      {/* Profile Picture */}
      <Grid item xs={12} md={4} lg={3}>
        <UserProfilePicture owned={owned} currAvatar={userData?.user?.avatar} />
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>3</Paper>
      </Grid>
    </Grid>
  );
}
