import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const eventTypes = [
  'Festival',
  'Concert',
  'Convention',
  'Party',
  'Game Night',
  'Movie Night',
  'Date Night',
  'Pub Crawl',
  'Other',
];

export default function EventType({ eventData, setEventData }) {
  const handleChange = (e) => {
    setEventData({ ...eventData, eventType: e.target.value });
    console.log(eventData);
  };

  return (
    <FormControl>
      <FormLabel id='eventType'>
        Choose the event type that best describes your event. This makes it
        easier for other users to find your event. Choose 'Other' if you've got
        something else in mind.
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby='eventType'
        defaultValue='other'
        name='radio-buttons-group'
      >
        {eventTypes.map((type) => {
          return (
            <FormControlLabel
              key={type}
              value={type}
              control={
                <Radio
                  checked={eventData.eventType === type}
                  onChange={handleChange}
                />
              }
              label={type}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
