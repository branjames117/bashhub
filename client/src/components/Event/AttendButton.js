import { Button } from '@mui/material';

import { useMutation } from '@apollo/client';

import { ADD_ATTENDEE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { QUERY_EVENT } from '../../utils/queries';

export default function AttendButton({ event_id }) {
  const [addAttendee] = useMutation(ADD_ATTENDEE);

  // to do - need to update cache of other queries when attend this event button is clicked

  const handleClick = async () => {
    try {
      const mutationResponse = await addAttendee({
        variables: {
          event_id: event_id,
        },
      });

      console.log(mutationResponse);
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
      Attend This Event
    </Button>
  );
}
