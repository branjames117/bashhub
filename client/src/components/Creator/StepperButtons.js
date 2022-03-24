import { useMutation } from '@apollo/client';

import { ADD_EVENT } from '../../utils/mutations';
import { QUERY_EVENTS, QUERY_ME } from '../../utils/queries';
import { QUERY_EVENT } from '../../utils/queries';

import { Box, Button } from '@mui/material';
import Auth from '../../utils/auth';

export default function StepperButtons({
  eventData,
  activeStep,
  setActiveStep,
  slugTaken,
  isEditor,
}) {
  const [addEvent] = useMutation(ADD_EVENT, {
    update(cache, { data: { addEvent } }) {
      try {
        // if event is a subevent, update the QUERY_EVENT cache
        if (addEvent.eventParent) {
          const { event } = cache.readQuery({
            query: QUERY_EVENT,
            variables: {
              slug: addEvent.eventParent.slug,
            },
          });

          // two different write queries depending on if this is a subevent edit
          cache.writeQuery({
            query: QUERY_EVENT,
            variables: { slug: addEvent.eventParent.slug },
            data: {
              event: isEditor
                ? { ...event, subevents: [...event.subevents] }
                : {
                    ...event,
                    subevents: [...event.subevents, addEvent],
                  },
            },
          });
        } else {
          // if event is just an event, update the QUERY_ME cache
          const { me } = cache.readQuery({ query: QUERY_ME });

          cache.writeQuery({
            query: QUERY_ME,
            data: {
              me: { ...me, eventsManaged: [...me.eventsManaged] },
            },
          });
        }
      } catch (e) {}

      try {
        if (!addEvent.eventParent) {
          const data = cache.readQuery({ query: QUERY_EVENTS });

          cache.writeQuery({
            query: QUERY_EVENTS,
            data: {
              events: [...data.events, addEvent],
            },
          });
        }
      } catch (e) {}
    },
  });

  const handleNext = async () => {
    if (activeStep === 4) {
      try {
        await addEvent({
          variables: {
            eventInput: {
              ...eventData,
              ownerId: Auth.getProfile().data._id,
              ownerName: Auth.getProfile().data.username,
            },
          },
        });
      } catch (err) {
        console.error(err);
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ my: 2 }}>
      <div>
        <Button
          variant='contained'
          disabled={
            (activeStep === 0 && !eventData.name.trim()) ||
            (activeStep === 0 && !eventData.slug.trim()) ||
            (activeStep === 0 && slugTaken) ||
            (activeStep === 2 && !eventData.location.trim())
          }
          onClick={handleNext}
          sx={{ mt: 1, mr: 1 }}
        >
          {activeStep === 4 ? 'Publish Event' : 'Next'}
        </Button>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mt: 1, mr: 1 }}
        >
          Back
        </Button>
      </div>
    </Box>
  );
}
