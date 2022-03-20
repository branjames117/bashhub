import { useState } from 'react';

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

export default function EventTime({ eventData, setEventData }) {
  const [startTimeEnabled, setStartTimeEnabled] = useState(false);
  const [endDateEnabled, setEndDateEnabled] = useState(false);
  const [endTimeEnabled, setEndTimeEnabled] = useState(false);

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Stack spacing={3}>
        <FormLabel id='startDate'>Choose the date of your event. *</FormLabel>
        <MobileDatePicker
          label='Start Date'
          aria-labelledby='startDate'
          inputFormat='MM/DD/yyyy'
          value={eventData.startDate}
          onChange={(value) => setEventData({ ...eventData, startDate: value })}
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
            onChange={(value) =>
              setEventData({ ...eventData, startTime: value })
            }
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
            onChange={(value) => setEventData({ ...eventData, endDate: value })}
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
            onChange={(value) => setEventData({ ...eventData, endTime: value })}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      </Stack>
    </LocalizationProvider>
  );
}
