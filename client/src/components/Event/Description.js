import { Grid, Typography, Paper } from '@mui/material';

export default function Description({ description, videoUrl }) {
  return (
    <Grid item sm={12} md={8} lg={8}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography
          variant='h6'
          sx={{ overflowX: 'hidden', whiteSpace: 'pre-line' }}
        >
          {description}
        </Typography>
        {videoUrl && (
          <iframe
            title='YouTube video'
            style={{ height: '400px', width: '100%', borderRadius: '10px' }}
            src={videoUrl.replace('watch?v=', 'embed/')}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        )}
      </Paper>
    </Grid>
  );
}
