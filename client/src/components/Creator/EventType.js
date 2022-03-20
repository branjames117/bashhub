import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@mui/material';

const eventTypes = [
  'Party',
  'Festival',
  'Concert',
  'Convention',
  'Game Night',
  'Movie Night',
  'Date Night',
  'Pub Crawl',
  'Other',
];

export default function EventType({ eventData, setEventData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  return (
    <>
      {' '}
      <TextField
        variant='outlined'
        label='Event Name *'
        autoComplete='off'
        placeholder='DeLorean Summer Daze'
        name='name'
        value={eventData.name}
        onChange={handleChange}
        sx={{ width: '100%', my: 2 }}
      />
      <TextField
        variant='outlined'
        label='Event Slug (Generates URL) *'
        autoComplete='off'
        placeholder='delorean-summer-daze'
        name='slug'
        value={eventData.slug}
        onChange={handleChange}
        sx={{ width: '100%', my: 2 }}
      />
      <FormControl>
        <FormLabel id='eventType'>
          Choose the event type that best describes your event. This makes it
          easier for other users to find your event. Choose 'Other' if you've
          got something else in mind. You'll be able to add <em>sub-events</em>{' '}
          later. *
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby='eventType'
          defaultValue='other'
          name='eventType'
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
    </>
  );
}
