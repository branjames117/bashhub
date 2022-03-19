import { Typography, TextareaAutosize } from '@mui/material';

export default function EventLocation({ eventData, setEventData }) {
  return (
    <>
      <Typography>
        Give us location details. Be specific. Provide directions if necessary.
      </Typography>
      <TextareaAutosize
        aria-label='empty textarea'
        placeholder={`1640 Riverside Drive
Hill Valley, CA
USA
There's a DeLorean parked out front. Don't use the doorbell.`}
        minRows={4}
        maxRows={4}
        style={{ resize: 'none', width: '100%' }}
        value={eventData.location}
        onChange={(e) => {
          setEventData({ ...eventData, location: e.target.value });
        }}
      />
    </>
  );
}
