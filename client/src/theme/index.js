import { createTheme } from '@mui/material/styles';
import { yellow, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: yellow[500],
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
