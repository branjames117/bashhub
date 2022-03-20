import { Paper, Button } from '@mui/material';
import { useState, useRef } from 'react';
import Auth from '../../utils/auth';

export default function EventHeroPicture({ eventData, setEventData }) {
  const [hero, setHero] = useState(eventData.hero);
  const [heroId, setHeroId] = useState(eventData.heroId);
  const [buttonText, setButtonText] = useState('Upload Hero Image');

  const fileInput = useRef();
  const fileUpload = useRef();

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const imageData = document.querySelector('input[type="file"]').files[0];

    formData.append('image', imageData);
    formData.append('uploadType', 'hero');
    formData.append('heroId', heroId);

    try {
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: Auth.getToken(),
        },
      });

      const data = await response.json();

      setHero(data.url);
      setHeroId(data.public_id);
      setEventData({ ...eventData, hero: data.url, heroId: data.public_id });
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageDelete = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/images/delete', {
        method: 'DELETE',
        body: JSON.stringify({ public_id: heroId, deleteType: 'hero' }),
        headers: {
          Authorization: Auth.getToken(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      setHero('');
      setHeroId('');
      setEventData({ ...eventData, hero, heroId });
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
          backgroundImage: `url(${hero ? hero : '../images/blank.png'})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
        }}
      ></div>

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
            if (fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'png') {
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
        <Button
          variant='contained'
          sx={{ width: '100%', my: 1 }}
          onClick={handleImageDelete}
        >
          Delete
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
    </Paper>
  );
}
