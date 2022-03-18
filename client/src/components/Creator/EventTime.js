import { useState } from 'react';

import {
  FormGroup,
  FormControlLabel,
  Typography,
  Stack,
  TextField,
  Checkbox,
} from '@mui/material';

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

export default function EventTime({ eventData, setEventData }) {
  const [startTimeEnabled, setStartTimeEnabled] = useState(true);
  const [endTimeEnabled, setEndTimeEnabled] = useState(true);

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Stack spacing={3}>
        <Typography variant='inherit'>
          Choose the date {startTimeEnabled ? 'and time ' : ''} your event
          starts.
        </Typography>
        <MobileDatePicker
          label='Start Date'
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
                  setStartTimeEnabled(e.target.checked);
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
        <Typography variant='inherit'>
          Choose the date {endTimeEnabled ? 'and time ' : ''} your event ends.
        </Typography>
        <MobileDatePicker
          label='End Date'
          inputFormat='MM/DD/yyyy'
          value={eventData.endDate}
          onChange={(value) => setEventData({ ...eventData, endDate: value })}
          renderInput={(params) => <TextField {...params} />}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={endTimeEnabled}
                onChange={(e) => {
                  setEndTimeEnabled(e.target.checked);
                }}
              />
            }
            label='Start at a specified time.'
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
