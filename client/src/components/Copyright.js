import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      sx={{
        textAlign: 'center',
      }}
    >
      <Link
        color='inherit'
        sx={{ textDecoration: 'none' }}
        href='https://branjamesweb.dev/'
      >
        branjamesweb.dev
      </Link>{' '}
      {' © '}
      {new Date().getFullYear()}
    </Typography>
  );
}
