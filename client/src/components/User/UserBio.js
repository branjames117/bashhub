import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_BIO } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';
import { Paper, Typography, Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base';

export default function UserBio({ username, owned, currBio }) {
  const [changeBio, setChangeBio] = useState(false);
  const [bio, setBio] = useState(currBio);
  const [editBio] = useMutation(EDIT_BIO, {
    update(cache, { data: { editBio } }) {
      try {
        // otherwise, update the query QUERY_EVENT cache
        const { user } = cache.readQuery({
          query: QUERY_USER,
          variables: {
            username: username,
          },
        });

        cache.writeQuery({
          query: QUERY_USER,
          variables: { username: username },
          data: {
            user: { ...user, bio: editBio.bio },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const changeHandler = (e) => {
    setBio(e.target.value);
  };

  const updateBio = async () => {
    try {
      await editBio({ variables: { bio: bio } });
      setBio(bio);
    } catch (err) {
      console.error(err);
    }
    setChangeBio(false);
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h5' sx={{ mb: 2 }}>
        Hi, I'm {username}
      </Typography>

      {changeBio ? (
        <TextareaAutosize
          aria-label='empty textarea'
          placeholder='Empty'
          minRows={8}
          value={bio}
          onChange={changeHandler}
          autoFocus={true}
        />
      ) : (
        <div
          style={{
            overflowX: 'hidden',
            whiteSpace: 'pre-line',
            paddingTop: '8px',
          }}
        >
          {bio}
        </div>
      )}

      {owned && changeBio && (
        <Button variant='text' onClick={updateBio}>
          Submit Changes
        </Button>
      )}

      {owned && !changeBio && (
        <Button variant='text' onClick={() => setChangeBio(!changeBio)}>
          Edit My Bio
        </Button>
      )}
    </Paper>
  );
}
