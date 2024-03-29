import {
  Box,
  Button,
  Chip,
  Typography,
  TextareaAutosize,
  Input,
} from '@mui/material';
import { useState } from 'react';

export default function EventDescription({
  eventData,
  setEventData,
  isSubevent,
}) {
  const [tag, setTag] = useState('');

  return (
    <>
      <Typography>
        What's this {isSubevent ? 'sub' : ''}event all about? What can we
        expect? (Limit 512 characters.)
      </Typography>
      <TextareaAutosize
        aria-label='empty textarea'
        placeholder={
          isSubevent
            ? `For the first movie in our trilogy marathon, we will be watching Back to the Future, with popcorn, frittatas, and Diet Sunkist.
            
The bathroom isn't working, so don't drink too much before you get here.`
            : `This is an exhibition of a new machine with the potential to change the future. We're starting at my place, then heading over to the Twin Pines Mall parking lot. Wear sunglasses, bring body armor.
`
        }
        minRows={4}
        maxRows={4}
        style={{ resize: 'none', width: '100%', marginTop: '12px' }}
        maxLength={512}
        value={eventData.description}
        onChange={(e) => {
          setEventData({ ...eventData, description: e.target.value });
        }}
      />
      <Typography sx={{ mt: 2 }}>
        Create a few tags to give potential attendees a quick overview. After
        adding a tag, you can click it to remove it. (Limit 10 tags, 16
        characters each.)
      </Typography>
      {isSubevent && (
        <Typography sx={{ mt: 2 }}>
          Be even more specific than you were with the tags of the event itself.
          Is this a musical performance of some specific genres? a movie with a
          hard-R rating? a little basement get-together with adult beverages
          where the kids aren't allowed?
        </Typography>
      )}
      <Input
        sx={{ mt: 2 }}
        placeholder='Create Tag'
        value={tag}
        error={tag.length > 16}
        onChange={(e) => {
          setTag(e.target.value);
        }}
      />
      <Button
        type='submit'
        variant='text'
        disabled={!tag || tag.length > 16}
        onClick={() => {
          if (
            tag.trim() !== '' &&
            eventData.tags.indexOf(tag.name) === -1 &&
            eventData.tags.length < 10
          ) {
            setEventData({
              ...eventData,
              tags: [...eventData.tags, tag.trim().toLowerCase()],
            });
          }
          setTag('');
        }}
      >
        Add
      </Button>
      <Box sx={{ width: '100%', mt: 2.5 }}>
        {eventData.tags.map((tag) => (
          <Chip
            label={tag}
            key={tag}
            sx={{ mx: 1 }}
            onClick={(e) => {
              const tagToRemove = e.target.firstChild.data;
              setEventData({
                ...eventData,
                tags: eventData.tags.filter((tag) => tag !== tagToRemove),
              });
            }}
          />
        ))}
      </Box>
    </>
  );
}
