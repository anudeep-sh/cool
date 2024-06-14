import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { Colors } from '../Theme';
import { Typography } from '@mui/material';

export const BannerContainer = styled(Box)(({ src, theme }) => ({
  display: 'flex',
  justifyContent: 'right',
  width: '100%',
  height: '100%',
  padding: '0px 0px ',
  backgroundImage: `url(${src})`,
  backgroundColor: Colors.light_gray,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 'auto',
  },
}));

export const BannerContainerImage = styled('img')(({ src, theme }) => ({
  src: `url${src}`,
  width: '100%',
  // height: "20rem",
  objectFit: 'cover',
  objectPosition: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '260px',
    objectFit: 'cover',
    objectPosition: 'center',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '210px',
    objectFit: 'cover',
    objectPosition: 'center',
  },
}));

export const BannerSideImage = styled('img')(({ src, theme }) => ({
  src: `url${src}`,
  width: '400px',
  [theme.breakpoints.down('md')]: {
    width: '200px',

    // height:"200px"
  },
  [theme.breakpoints.down('sm')]: {
    width: '220px',
    height: '220px',
  },
}));

export const BannerContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: 420,
  padding: '30px',
}));

export const BannerTitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1.3,
  fontSize: '40px',
  marginBottom: '20px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '30px',
    marginBottom: '10px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',

    marginBottom: '10px',
  },
}));

export const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  letterSpacing: 1.25,
  // marginBottom: "2rem",
  [theme.breakpoints.down('md')]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    fontSize: '14px',
    // marginBottom: "1.5rem",
  },
}));
