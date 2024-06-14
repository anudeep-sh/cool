import { createTheme } from '@mui/material/styles';
export const Colors = {
  primary: '#698AFF',
  secondary: '#fff',
  light_gray: '#c2c2c2',

  ///////////////
  ////Grays
  ///////////////

  /////////////////
  //Solid Colors
  /////////////////
  // NO COLORS RIGHT NOW
};

const theme = createTheme({
  // to change whole website color

  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
    ErrorBtn: {
      main: '#d32f2f',
      contrastText: '#fff',
    },
    ChipColor: {
      main: '#F4F7FF',
      contrastText: '#698AFF',
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      mds: 1000,
      lg: 1200,
      xl: 1536,
      uxl: 2000,
    },
  },

  typography:{
    fontFamily:"'Poppins', sans-serif"
  }
  // to target components wise

  // components:{
  //     MuiButton:{
  //         defaultProps:{
  //             disableRipple:true,
  //             disableElevation:true
  //         }
  //     }
  // }
});

export default theme;
