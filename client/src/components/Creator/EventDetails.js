import { TextField, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useState } from 'react';
import EventHeroPicture from './EventHeroPicture';

export default function EventDetails({
  eventData,
  setEventData,
  isSubevent,
  validUrls,
  setValidUrls,
}) {
  // to do: use regex to verify proper URLS /^(ftp|http|https):\/\/[^ "]+$/.test(url);
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'url' || name === 'ticketsUrl' || name === 'videoUrl') {
      if (value.trim().length === 0) {
        setValidUrls({ ...validUrls, [name]: true });
      } else {
        const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(value);
        setValidUrls({ ...validUrls, [name]: validUrl });
      }
    }

    setEventData({
      ...eventData,
      [name]:
        name === 'commentsEnabled' || name === 'publicEnabled'
          ? checked
          : value,
    });
  };

  return (
    <>
      <TextField
        variant='outlined'
        autoComplete='off'
        label={isSubevent ? 'Relevant URL' : 'Official URL'}
        placeholder='https://archive.org/details/back-to-the-future_20210824'
        name='url'
        error={eventData.url.length > 128 || !validUrls.url}
        helperText={
          validUrls.url
            ? eventData.url.length > 128
              ? 'URL must be < 128 characters.'
              : ''
            : 'URL must be a valid URL (including http(s)://).'
        }
        value={eventData.url}
        onChange={handleChange}
        sx={{ width: '100%', my: 2 }}
      />
      <TextField
        variant='outlined'
        autoComplete='off'
        label='YouTube Video URL'
        placeholder='https://www.youtube.com/watch?v=qvsgGtivCgs'
        name='videoUrl'
        error={eventData.videoUrl.length > 128 || !validUrls.videoUrl}
        helperText={
          validUrls.videoUrl
            ? eventData.videoUrl.length > 128
              ? 'URL must be < 128 characters.'
              : ''
            : 'URL must be a valid URL (including http(s)://).'
        }
        value={eventData.videoUrl}
        onChange={handleChange}
        sx={{ width: '100%', my: 2 }}
      />
      {!isSubevent && (
        <>
          <TextField
            variant='outlined'
            autoComplete='off'
            label='Purchase Tickets URL'
            placeholder='https://www.backtothefuturemusical.com/tickets/'
            name='ticketsUrl'
            error={eventData.ticketsUrl.length > 128 || !validUrls.ticketsUrl}
            helperText={
              validUrls.ticketsUrl
                ? eventData.ticketsUrl.length > 128
                  ? 'URL must be < 128 characters.'
                  : ''
                : 'URL must be a valid URL (including http(s)://).'
            }
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
            error={eventData.pricing.length > 64}
            helperText={
              eventData.pricing.length > 64
                ? 'Pricing description must be < 64 characters.'
                : ''
            }
            value={eventData.pricing}
            onChange={handleChange}
            sx={{ width: '100%', my: 2 }}
          />
        </>
      )}
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
        {!isSubevent && (
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
        )}
      </FormGroup>
      <EventHeroPicture eventData={eventData} setEventData={setEventData} />
    </>
  );
}

// ticketsUrl
