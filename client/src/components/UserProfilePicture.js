import { Input, Paper, Button } from '@mui/material';
import { useState } from 'react';
import Auth from '../utils/auth';

export default function UserProfilePicture({ owned, currAvatar }) {
  const [avatar, setAvatar] = useState(currAvatar);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const imageData = document.querySelector('input[type="file"]').files[0];

    formData.append('image', imageData);

    try {
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: Auth.getToken(),
        },
      });

      const data = await response.json();

      setAvatar(data.url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper
      sx={{
        p: 0.5,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <div
        style={{
          backgroundImage: `url(${
            avatar
              ? avatar
              : `https://picsum.photos/500?random=${Math.floor(
                  Math.random() * 100
                )}`
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
        }}
      ></div>
      {owned && (
        <form
          id='image-form'
          name='image-form'
          action='/api/images/upload'
          encType='multipart/form-data'
          method='post'
          onSubmit={handleImageUpload}
        >
          <Input
            type='file'
            name='image'
            id='file-input'
            disableUnderline={true}
          />
          <Button type='submit' variant='contained'>
            Upload Image
          </Button>
        </form>
      )}
    </Paper>
  );
}
