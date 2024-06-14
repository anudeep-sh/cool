import { Box, LinearProgress, Typography } from '@mui/material';
import React from 'react';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={props.value ?? 0} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value ?? 0
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearProgressWithLabelReusable({ progressCount, displayTitle, display }) {
  return (
    <Box
      sx={{
        width: '250px',
        display: { xs: display ? display : 'none', sm: 'block' },
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: '400', display: displayTitle }}>
        Progress
      </Typography>
      <LinearProgressWithLabel value={progressCount} />
    </Box>
  );
}
