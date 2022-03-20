import { useMutation } from '@apollo/client';

import { ADD_EVENT } from '../../utils/mutations';

import { Box, Button } from '@mui/material';

export default function StepperButtons({
  eventData,
  activeStep,
  setActiveStep,
}) {
  const [addEvent] = useMutation(ADD_EVENT);

  const handleNext = async () => {
    if (activeStep === 4) {
      try {
        await addEvent({
          variables: {
            eventInput: eventData,
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
