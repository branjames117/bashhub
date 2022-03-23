import { useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function CommentInput({ slug, addComment }) {
  const [comment, setComment] = useState('');
  const [buttonText, setButtonText] = useState('Submit');

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (comment.trim().length === 0) {
      setButtonText('Comment Cannot Be Empty');
      return;
    } else {
      setButtonText('Comment Submitted');
    }

    await addComment({
      variables: {
        event_slug: slug,
        body: comment,
      },
    });

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
      <Button variant='contained' sx={{ mt: 1 }} onClick={handleSubmit}>
        {buttonText}
      </Button>
    </>
  );
}
