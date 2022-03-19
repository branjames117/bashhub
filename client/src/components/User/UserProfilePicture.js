import { Paper, Button } from '@mui/material';
import { useState, useRef } from 'react';
import Auth from '../../utils/auth';

export default function UserProfilePicture({ owned, currAvatar }) {
  const [avatar, setAvatar] = useState(currAvatar);
  const [buttonText, setButtonText] = useState('Upload Image');

  const fileInput = useRef();
  const fileUpload = useRef();

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
              const filenameArr = newFilename.split('.');
              const fileExt = filenameArr[filenameArr.length - 1];
              if (
                fileExt === 'jpg' ||
                fileExt === 'jpeg' ||
                fileExt === 'png'
              ) {
                fileUpload.current.click();
                setButtonText('Image Uploaded');
              } else {
                setButtonText('File must be JPEG or PNG!');
              }
            }}
          />
          <Button
            variant='contained'
            sx={{ width: '100%', my: 1 }}
            onClick={() => {
              fileInput.current.click();
            }}
          >
            {buttonText}
          </Button>
          {/* Hidden submit button, clicked after file is chosen. */}
          <button
            ref={fileUpload}
            type='submit'
            name='upload'
            id='upload'
            style={{ display: 'none' }}
          ></button>
        </form>
      )}
    </Paper>
  );
}
