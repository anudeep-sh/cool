import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function BigLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
}

export default BigLoader;
