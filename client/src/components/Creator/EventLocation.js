import { FormLabel, TextareaAutosize } from '@mui/material';

export default function EventLocation({ eventData, setEventData, isSubevent }) {
  return (
    <>
      <FormLabel id='locationDetails'>
        Provide location details
        {isSubevent
          ? ', more specific than the address of the actual event, which was already provided when the Event was created. Does this subevent take place in a specific room, on a specific stage, atop a specific volcano?'
          : `. Do not share your home address. If this is an event for your friends,
          just say 'My place.' They know the way.`}
      </FormLabel>
      <TextareaAutosize
        aria-labelledby='locationDetails'
        aria-label='empty textarea'
        placeholder={
          isSubevent
            ? 'The DeLorean Stage'
            : `1640 Riverside Drive
Hill Valley, CA
USA
There's a DeLorean parked out front. Don't use the doorbell.`
        }
        minRows={isSubevent ? 2 : 4}
        maxRows={isSubevent ? 2 : 4}
        style={{
          resize: 'none',
          width: '100%',
          marginTop: '20px',
        }}
        maxLength={256}
        value={eventData.location}
        onChange={(e) => {
          setEventData({ ...eventData, location: e.target.value });
        }}
      />
    </>
  );
}
