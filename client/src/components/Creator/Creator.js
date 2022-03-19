import { useState } from 'react';
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

import Auth from '../../utils/auth';

import EventType from './EventType';
import StepperButtons from './StepperButtons';
import EventTime from './EventTime';
import EventLocation from './EventLocation';
import EventDescription from './EventDescription';

const defaultEvent = {
  eventType: 'Other',
  startDate: new Date(),
  startTime: '',
  endDate: '',
  endTime: '',
  description: '',
  tags: [],
  ownerId: Auth.getProfile().data._id,
  ownerName: Auth.getProfile().data.username,
};

export default function Creator() {
  const [activeStep, setActiveStep] = useState(0);
  const [eventData, setEventData] = useState(defaultEvent);

  const handleReset = () => {
    setActiveStep(0);
    setEventData(defaultEvent);
  };

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h4'>Create New Event</Typography>
      <Typography variant='inherit'>
        Follow these steps to get your event page ready to share with other
        users.
      </Typography>
      <Stepper activeStep={activeStep} orientation='vertical' sx={{ mt: 3 }}>
        {/* Step 1 - Event Type */}
        <Step>
          <StepLabel>What type of event is this?</StepLabel>
          <StepContent>
            <EventType eventData={eventData} setEventData={setEventData} />
            <StepperButtons
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              eventData={eventData}
            />
          </StepContent>
        </Step>

        {/* Step 2 - Event Time */}
        <Step>
          <StepLabel>Let's talk dates and times.</StepLabel>
          <StepContent>
            <EventTime eventData={eventData} setEventData={setEventData} />
            <StepperButtons
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              eventData={eventData}
            />
          </StepContent>
        </Step>

        {/* Step 3 - Event Location */}
        <Step>
          <StepLabel>Where is it happening?</StepLabel>
          <StepContent>
            <EventLocation eventData={eventData} setEventData={setEventData} />
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
            Describe the event to potential attendees, then drop some tags so
            your event is easier to find.
          </StepLabel>
          <StepContent>
            <EventDescription
              eventData={eventData}
              setEventData={setEventData}
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
          <StepLabel>Nail down some final details.</StepLabel>
          <StepContent>
            <EventDescription
              eventData={eventData}
              setEventData={setEventData}
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
            Event created! You can manage your event by clicking EVENTS I'M
            MANAGING in the sidebar.
          </Typography>
          <Button onClick={handleReset} sx={{ mt: 3, ml: 2 }}>
            Create Another Event
          </Button>
        </Paper>
      )}
    </Box>
  );
}
