import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@mui/material';

import { ADD_ATTENDEE } from '../../utils/mutations';
import { REMOVE_ATTENDEE } from '../../utils/mutations';

import Auth from '../../utils/auth';

export default function AttendButton({
  event_id,
  attendees,
  setAttendees,
  slug,
}) {
  const [attending, setAttending] = useState(false);

  const [addAttendee] = useMutation(ADD_ATTENDEE);
  const [removeAttendee] = useMutation(REMOVE_ATTENDEE);

  const userId = Auth.getProfile().data._id;

  useEffect(() => {
    // check if user is already attending event
    const index = attendees?.findIndex((user) => user._id === userId);

    setAttending(index !== -1 ? true : false);
  }, [attendees, setAttendees, userId]);

  const handleClick = async () => {
    try {
      if (!attending) {
        setAttending(true);
        await addAttendee({
          variables: {
            event_id: event_id,
          },
        });
      } else {
        setAttending(false);
        const [...updateAttendees] = attendees;
        const filteredAttendees = updateAttendees.filter(
          (user) => user._id !== userId
        );
        setAttendees(filteredAttendees);
        await removeAttendee({
          variables: {
            event_id: event_id,
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      variant='contained'
      sx={{ width: '100%', my: 1 }}
      onClick={handleClick}
    >
      {attending ? 'Drop Out of This Event' : 'Attend This Event'}
    </Button>
  );
}
