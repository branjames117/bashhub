import { useState, useEffect } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  TextareaAutosize,
} from '@mui/material';

import EventType from './EventType';
import StepperButtons from './StepperButtons';
import EventTime from './EventTime';
import EventLocation from './EventLocation';

export default function Creator() {
  const [activeStep, setActiveStep] = useState(0);
  const [eventData, setEventData] = useState({
    eventType: '',
    startDate: new Date(),
    startTime: new Date(),
    endDate: new Date(),
    endTime: new Date(),
  });

  const handleReset = () => {
    setActiveStep(0);
    setEventData({});
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
            />
          </StepContent>
        </Step>
        <Step>
          <StepLabel
            optional={<Typography variant='caption'>Last step</Typography>}
          >
            First step
          </StepLabel>
          <StepContent>
            <Typography>Description</Typography>
            <StepperButtons
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === 4 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed!</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Create Another Event
          </Button>
        </Paper>
      )}
    </Box>
  );
}
