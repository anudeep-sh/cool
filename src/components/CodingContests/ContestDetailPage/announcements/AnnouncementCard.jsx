import React from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const AnnouncementCard = ({ announcement }) => {
  const d = new Date(announcement.created_at);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ minWidth: 275, boxShadow: 1 }}
      >
        <Box display="flex" flexDirection="column" sx={{ p: 1 }} justifyContent="flex-start">
          <Box>
            <IconButton
              elevation={1}
              sx={{
                ml: 1,
                width: 'auto',
                height: 35,
                borderRadius: 2,
                bgcolor: 'black',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: 'black',
                },
              }}
            >
              <Typography sx={{ fontWeight: '200' }} variant="caption">
                {d.getDate()}-{monthNames[d.getMonth()]}-{d.getFullYear()}, Time:{' '}
                {d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
              </Typography>
            </IconButton>
          </Box>
          <Box>
            <Typography sx={{ m: 1, ml: 2, fontWeight: '200' }} paragraph>
              {announcement?.announcement}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AnnouncementCard;
