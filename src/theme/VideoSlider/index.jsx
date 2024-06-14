import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const VideoSliderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  // justifyContent: "right",
}));
export const ContainerOfTitle = styled(Typography)(({ theme }) => ({
  // lineHeight: 1.25,
  // letterSpacing: 1.25,
  // fontSize:32,
}));
export const FilterTitle = styled(Typography)(({ theme }) => ({
  // lineHeight: 1.25,
  // letterSpacing: 1.25,
  // fontSize:32,
}));
export const ContestTitle = styled(Typography)(({ theme }) => ({
  // lineHeight: 1.25,
  // letterSpacing: 1.25,
  fontSize: { xs: '20px!important', md: '24px!important' },
}));
