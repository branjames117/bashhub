import { useCallback, useEffect, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_SLUG } from '../../utils/queries';

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

export default function EventType({
  eventData,
  setEventData,
  slugTaken,
  setSlugTaken,
  isSubevent,
  isEditor,
}) {
  const slugRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // keep the slug lowercased
    if (name === 'slug') {
      setEventData({ ...eventData, slug: value.toLowerCase() });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
    if (name === 'slug') {
      checkSlugAvailability();
    }
  };

  const [slug, { data }] = useLazyQuery(QUERY_SLUG);

  const checkSlugAvailability = useCallback(async () => {
    if (!isEditor) {
      await slug({ variables: { slug: slugRef.current.value.toLowerCase() } });
      setSlugTaken(data?.slug?._id ? true : false);
    }
  }, [isEditor, setSlugTaken, slug, data]);

  useEffect(() => {
    checkSlugAvailability();
  }, [data, checkSlugAvailability]);

  return (
    <>
      {' '}
      <TextField
        variant='outlined'
        label={isSubevent ? 'Subevent Name *' : 'Event Name *'}
        autoComplete='off'
        error={eventData.name.length > 64}
        helperText={
          eventData.name.length > 64 ? 'Name must be < 64 characters.' : ''
        }
        placeholder={isSubevent ? 'The Foo Fighters' : 'DeLorean Summer Daze'}
        name='name'
        value={eventData.name}
        onChange={handleChange}
        sx={{ width: '100%', my: 2 }}
      />
      {!isEditor && (
        <TextField
          variant='outlined'
          label='Event Slug (Generates URL, cannot be changed later) *'
          autoComplete='off'
          inputRef={slugRef}
          placeholder='delorean-summer-daze'
          error={slugTaken}
          helperText={slugTaken ? 'Slug already in use.' : ''}
          name='slug'
          value={eventData.slug.trim()}
          onChange={handleChange}
          sx={{ width: '100%', my: 2 }}
        />
      )}
      {slugTaken && <div>Slug taken</div>}
      {!isSubevent && (
        <FormControl>
          <FormLabel id='eventType'>
            Choose the event type that best describes your event. This makes it
            easier for other users to find your event. Choose 'Other' if you've
            got something else in mind. You'll be able to add{' '}
            <em>sub-events</em> later. *
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
      )}
    </>
  );
}
