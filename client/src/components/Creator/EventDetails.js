import { TextField, FormGroup, FormControlLabel, Switch } from '@mui/material';
import EventHeroPicture from './EventHeroPicture';

export default function EventDetails({ eventData, setEventData }) {
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    console.log(name);
    setEventData({
      ...eventData,
      [name]:
        name === 'commentsEnabled' || name === 'publicEnabled'
          ? checked
          : value,
    });
    console.log(eventData);
  };

  return (
    <>
      <TextField
        variant='outlined'
        autoComplete='off'
        label='Official URL'
        placeholder='https://archive.org/details/back-to-the-future_20210824'
        name='url'
        value={eventData.url}
        onChange={handleChange}
        sx={{ width: '100%', my: 2 }}
      />
      <TextField
        variant='outlined'
        autoComplete='off'
        label='Purchase Tickets URL'
        placeholder='https://www.backtothefuturemusical.com/tickets/'
        name='ticketsUrl'
        value={eventData.ticketsUrl}
        onChange={handleChange}
        sx={{ width: '100%', my: 2 }}
      />
      <TextField
        variant='outlined'
        autoComplete='off'
        label='Ticket Price Range'
        placeholder='$9.99 - $99.99'
        name='pricing'
        value={eventData.pricing}
        onChange={handleChange}
        sx={{ width: '100%', my: 2 }}
      />
      <FormGroup sx={{ my: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={eventData.commentsEnabled}
              name='commentsEnabled'
              onChange={handleChange}
            />
          }
          sx={{ my: 1 }}
          label='Allow users to leave comments?'
        />
        <FormControlLabel
          control={
            <Switch
              checked={eventData.publicEnabled}
              name='publicEnabled'
              onChange={handleChange}
            />
          }
          sx={{ my: 1 }}
          label='Allow this event to appear in searches?'
        />
      </FormGroup>
      <EventHeroPicture eventData={eventData} setEventData={setEventData} />
    </>
  );
}

// ticketsUrl
