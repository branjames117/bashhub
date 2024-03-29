import {
  FormGroup,
  FormControlLabel,
  FormLabel,
  Stack,
  TextField,
  Checkbox,
} from '@mui/material';

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import moment from 'moment';

export default function EventTime({
  eventData,
  setEventData,
  slugTaken,
  setActiveStep,
  isSubevent,
  startTimeEnabled,
  setStartTimeEnabled,
  endDateEnabled,
  setEndDateEnabled,
  endTimeEnabled,
  setEndTimeEnabled,
}) {
  // if user tried to sneak to step 2 with an in-use slug, knock them back
  if (slugTaken) {
    setTimeout(() => {
      setActiveStep(0);
    }, 0);
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Stack spacing={3}>
        <FormLabel id='startDate'>
          Choose the date of your {isSubevent ? 'sub' : ''}event. *
        </FormLabel>
        <MobileDatePicker
          label='Start Date'
          aria-labelledby='startDate'
          inputFormat='MM/DD/yyyy'
          value={moment(eventData.startDate - 0)}
          onChange={(value) => {
            const date = new Date(value);
            if (date.getTime()) {
              setEventData({ ...eventData, startDate: value });
            }
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={startTimeEnabled}
                onChange={(e) => {
                  if (e.target.checked) {
                    setEventData({ ...eventData, startTime: new Date() });
                  }
                  setStartTimeEnabled(e.target.checked);
                  // if boxes is unchecked, clear any previously set values
                  if (!e.target.checked) {
                    setEventData({ ...eventData, startTime: '' });
                  }
                }}
              />
            }
            label='Start at a specified time.'
          />
        </FormGroup>
        {startTimeEnabled && (
          <TimePicker
            label='Start Time'
            value={eventData.startTime}
            onChange={(value) => {
              const date = new Date(value - 0);
              if (date.getTime()) {
                setEventData({ ...eventData, startTime: value });
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={endDateEnabled}
                onChange={(e) => {
                  if (e.target.checked) {
                    setEventData({ ...eventData, endDate: new Date() });
                  }
                  setEndDateEnabled(e.target.checked);
                  if (!e.target.checked) {
                    setEventData({
                      ...eventData,
                      endDate: '',
                    });
                  }
                }}
              />
            }
            label='End on a different day.'
          />
        </FormGroup>
        {endDateEnabled && (
          <MobileDatePicker
            label='End Date'
            inputFormat='MM/DD/yyyy'
            value={eventData.endDate}
            onChange={(value) => {
              const date = new Date(value - 0);
              if (date.getTime()) {
                setEventData({ ...eventData, endDate: value });
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={endTimeEnabled}
                onChange={(e) => {
                  if (e.target.checked) {
                    setEventData({ ...eventData, endTime: new Date() });
                  }
                  setEndTimeEnabled(e.target.checked);
                  if (!e.target.checked) {
                    setEventData({ ...eventData, endTime: '' });
                  }
                }}
              />
            }
            label='End at a specified time.'
          />
        </FormGroup>
        {endTimeEnabled && (
          <TimePicker
            label='End Time'
            value={eventData.endTime}
            onChange={(value) => {
              const date = new Date(value - 0);
              if (date.getTime()) {
                setEventData({ ...eventData, endTime: value });
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      </Stack>
    </LocalizationProvider>
  );
}
