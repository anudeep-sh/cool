import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const RankingTableLink = () => {
  return (
    <>
      <Box>
        <Button
          variant="contained"
          sx={{
            ml: 3,
            mr: 3,
            backgroundColor: '#ffffff',
            boxShadow: 1,
            '&:hover': {
              backgroundColor: '#ffffff',
              boxShadow: 1,
            },
          }}
          justifyItems="center"
          alignItems="center"
        >
          <Typography variant="caption" sx={{ color: '#000000', fontWeight: '550' }}>
            Submmission Link
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default RankingTableLink;
