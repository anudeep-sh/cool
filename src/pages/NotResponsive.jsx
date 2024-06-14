import React from 'react';
import { Box } from '@mui/system';
import Image from '../assets/not_responsive.png';

const NotResponsive = () => {
  return (
    <>
      <Box
        component="img"
        sx={{
          borderRadius: 1,
          boxShadow: 1,
          width: '100%',
          height: '100%',
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        alt="image"
        src={Image}
      ></Box>
    </>
  );
};

export default NotResponsive;
