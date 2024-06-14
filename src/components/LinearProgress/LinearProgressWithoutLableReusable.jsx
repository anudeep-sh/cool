import { Box, LinearProgress, Typography } from '@mui/material';
import React from 'react';

function LinearProgressWithoutLabel(props) {
  return (
    <Box sx={{ width: '100%', mr: 1 }}>
      <LinearProgress
        variant="determinate"
        color="primary"
        {...props}
        sx={{
          backgroundColor: 'rgba(160, 160, 160, 1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#698AFF',
            borderRadius: '10px',
          },
          height: '10px',
          borderRadius: '10px',
        }}
      />
    </Box>
  );
}

export default function LinearProgressWithoutLabelReusable({
  progressCount,
  displayTitle,
  display,
}) {
  return (
    <Box
      sx={{
        width: '250px',
        display: { xs: display ? display : 'none', sm: 'block' },
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: '400', display: displayTitle }}>
        Your Progress
      </Typography>
      <LinearProgressWithoutLabel value={progressCount} />
    </Box>
  );
}
