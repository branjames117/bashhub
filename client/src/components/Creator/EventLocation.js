import { FormLabel, TextareaAutosize } from '@mui/material';

export default function EventLocation({ eventData, setEventData }) {
  return (
    <>
      <FormLabel id='locationDetails'>
        Provide location details.{' '}
        <em>
          Do not share your home address. If this is an event for your friends,
          just say 'My place.' They know the way.
        </em>
      </FormLabel>
      <TextareaAutosize
        aria-labelledby='locationDetails'
        aria-label='empty textarea'
        placeholder={`1640 Riverside Drive
Hill Valley, CA
USA
There's a DeLorean parked out front. Don't use the doorbell.`}
        minRows={4}
        maxRows={4}
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
