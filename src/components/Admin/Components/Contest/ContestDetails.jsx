import React from 'react';
import { Typography, Box } from '@mui/material';
const ContestDetails = ({ contest }) => {
  const { title, startingDate, endingDate, about, code, type } = contest;
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Contest Details
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Title:</strong> {title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Start Date:</strong> {new Date(startingDate*1000).toLocaleString()}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>End Date:</strong> {new Date(endingDate*1000).toLocaleString()}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>About:</strong> {about}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Code:</strong> {code}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Type:</strong> {type}
      </Typography>
    </Box>
  );
};

export default ContestDetails;
