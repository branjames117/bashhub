import { Box, Button } from '@mui/material';

export default function StepperButtons({
  eventData,
  activeStep,
  setActiveStep,
}) {
  const handleNext = () => {
    if (activeStep === 4) {
      // call on ApolloServer to create the event
    }
    console.log(eventData);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ my: 2 }}>
      <div>
        <Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
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
