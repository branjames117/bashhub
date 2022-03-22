import { useEffect, useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
} from '@mui/material';

import EventType from './EventType';
import StepperButtons from './StepperButtons';
import EventTime from './EventTime';
import EventLocation from './EventLocation';
import EventDescription from './EventDescription';
import EventDetails from './EventDetails';
import Loading from '../Loading';

const defaultEvent = {
  eventType: 'Other',
  createdAt: new Date(),
  startDate: new Date(),
  startTime: '',
  endDate: '',
  endTime: '',
  description: '',
  tags: [],
  location: '',
  ownerId: '',
  ownerName: '',
  url: '',
  ticketsUrl: '',
  pricing: '',
  hero: '',
  heroId: '',
  videoUrl: '',
  commentsEnabled: true,
  publicEnabled: true,
  name: '',
  slug: '',
};

export default function Creator({ variant, _id }) {
  const [activeStep, setActiveStep] = useState(0);
  const [eventData, setEventData] = useState(defaultEvent);
  const [slugTaken, setSlugTaken] = useState(false);
  const [isSubevent, setIsSubevent] = useState(false);
  const [checkingVariant, setCheckingVariant] = useState(true);

  const handleReset = () => {
    setActiveStep(0);
    if (variant === 'subevent') {
      setEventData({ ...defaultEvent, eventParent: _id });
    } else {
      setEventData(defaultEvent);
    }
  };

  useEffect(() => {
    // if we're creating a subevent, add the subevent's parent's ID to the creator object
    if (variant === 'subevent') {
      setIsSubevent(true);
      setEventData({ ...eventData, eventParent: _id });
    }

    setCheckingVariant(false);
  }, [_id, variant]);

  return checkingVariant ? (
    <Loading />
  ) : (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h5' sx={{ mb: 3 }}>
        Create New {isSubevent ? 'Subevent' : 'Event'}
      </Typography>
      <Typography variant='inherit'>
        Follow these steps to get your {isSubevent ? 'Subevent' : 'Event'} page
        ready to share with other users. Required fields are marked with *.
      </Typography>
      <Stepper activeStep={activeStep} orientation='vertical' sx={{ mt: 3 }}>
        {/* Step 1 - Event Type */}
        <Step>
          <StepLabel>
            {isSubevent
              ? 'Choose a name and URL for your subevent.'
              : 'Choose a name, URL, and type for your event.'}{' '}
            *
          </StepLabel>
          <StepContent>
            <EventType
              eventData={eventData}
              setEventData={setEventData}
              slugTaken={slugTaken}
              setSlugTaken={setSlugTaken}
              isSubevent={isSubevent}
            />
            <StepperButtons
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              eventData={eventData}
              slugTaken={slugTaken}
            />
          </StepContent>
        </Step>

        {/* Step 2 - Event Time */}
        <Step>
          <StepLabel>Let's talk dates and times. *</StepLabel>
          <StepContent>
            <EventTime
              eventData={eventData}
              setEventData={setEventData}
              slugTaken={slugTaken}
              setActiveStep={setActiveStep}
              isSubevent={isSubevent}
            />
            <StepperButtons
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              eventData={eventData}
            />
          </StepContent>
        </Step>

        {/* Step 3 - Event Location */}
        <Step>
          <StepLabel>Where is it happening? *</StepLabel>
          <StepContent>
            <EventLocation
              eventData={eventData}
              setEventData={setEventData}
              isSubevent={isSubevent}
            />
            <StepperButtons
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              eventData={eventData}
            />
          </StepContent>
        </Step>

        {/* Step 4 - Event Description */}
        <Step>
          <StepLabel>
            Describe the {isSubevent ? 'sub' : ''}event to potential attendees,
            then drop some tags so your {isSubevent ? 'sub' : ''}event is easier
            to find in a search.
          </StepLabel>
          <StepContent>
            <EventDescription
              eventData={eventData}
              setEventData={setEventData}
              isSubevent={isSubevent}
            />
            <StepperButtons
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              eventData={eventData}
            />
          </StepContent>
        </Step>

        {/* Step 5 - Final Details */}
        <Step>
          <StepLabel>
            Nail down some final details and customize the look of your{' '}
            {isSubevent ? 'Subevent' : 'Event'} page with a custom hero image.
          </StepLabel>
          <StepContent>
            <EventDetails
              eventData={eventData}
              setEventData={setEventData}
              isSubevent={isSubevent}
            />
            <StepperButtons
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              eventData={eventData}
            />
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === 5 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>
            {isSubevent ? 'Subevent' : 'Event'} created! You can manage your{' '}
            {isSubevent ? 'sub' : ''}event by clicking EVENTS I'M MANAGING in
            the sidebar
            {isSubevent ? `, and navigating to this event's parent` : ''}.
          </Typography>
          <Button onClick={handleReset} sx={{ mt: 3, ml: 2 }}>
            Create Another Event
          </Button>
        </Paper>
      )}
    </Box>
  );
}
