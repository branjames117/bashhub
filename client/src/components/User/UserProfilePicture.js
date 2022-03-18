import { Paper, Button } from '@mui/material';
import { useState, useRef } from 'react';
import Auth from '../../utils/auth';

export default function UserProfilePicture({ owned, currAvatar }) {
  const [avatar, setAvatar] = useState(currAvatar);
  const [filename, setFilename] = useState('');

  const fileInput = useRef();

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
      setFilename('');
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
        height: 350,
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
          <input
            ref={fileInput}
            type='file'
            name='image'
            id='file-input'
            style={{ display: 'none' }}
            onChange={(e) => {
              const newFilename = e.target.value.split('\\').pop();
              console.log(newFilename);
              setFilename(newFilename);
            }}
          />
          <Button
            variant='contained'
            sx={{ width: '100%', my: 1 }}
            onClick={() => {
              fileInput.current.click();
            }}
          >
            Select Image
          </Button>
          {filename && (
            <Button type='submit' variant='contained' sx={{ width: '100%' }}>
              Upload {filename}
            </Button>
          )}
        </form>
      )}
    </Paper>
  );
}
