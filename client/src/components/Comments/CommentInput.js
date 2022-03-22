import { TextField, Button } from '@mui/material';
import { useState } from 'react';

export default function CommentInput() {
  const [comment, setComment] = useState('');
  const [buttonText, setButtonText] = useState('Submit');
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim().length === 0) {
      setButtonText('Comment Cannot Be Empty');
    } else {
      setButtonText('Comment Submitted');
    }

    setComment('');
    setTimeout(() => {
      setButtonText('Submit');
    }, 3000);
    // to do - use ApolloServer to submit new comment
    // to do - use socket.io to emit that a comment was left
  };

  return (
    <>
      <TextField
        id='outlined-multiline-static'
        label='Leave a Comment'
        multiline
        rows={4}
        value={comment}
        onChange={handleChange}
      />
      <Button variant='text' onClick={handleSubmit}>
        {buttonText}
      </Button>
    </>
  );
}
