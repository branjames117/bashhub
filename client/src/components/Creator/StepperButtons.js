import { Box, Button } from '@mui/material';

export default function StepperButtons({ activeStep, setActiveStep }) {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <div>
        <Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
          {activeStep === 3 ? 'Submit' : 'Next'}
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
