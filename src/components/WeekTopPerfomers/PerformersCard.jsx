import React from 'react';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const PerformersCard = ({ performer }) => {
  return (
    <div>
      <Box sx={{ minWidth: 275 }}>
        <Paper
          square={true}
          sx={{
            mt: 2,
            maxWidth: 782,
            height: 76,
            flexGrow: 1,
            backgroundColor: '#ffffff',
            boxShadow: 0,
            borderRadius: 3,
            pb: 0,
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            sx={{ p: 1, borderRadius: 1, bgcolor: '#ffffff' }}
            alignItems={'center'}
            justifyContent="center"
          >
            <Box
              component="img"
              sx={{
                height: 63,
                width: 63,
                maxHeight: { xs: 63, md: 63 },
                maxWidth: { xs: 63, md: 63 },
                borderRadius: 1,
              }}
              alt="image"
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            ></Box>
            <Box>
              <Box display="flex" flexDirection="column">
                <Box>
                  <Typography
                    sx={{ ml: 2, mr: 0.5, fontWeight: '500' }}
                    variant="body1"
                    color="black"
                  >
                    {performer.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ ml: 2, mr: 0.5, fontWeight: '500' }}
                    variant="caption"
                    color="black"
                  >
                    {performer.joinedOn}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box display="flex" flexDirection="column">
                <Box>
                  <Typography
                    sx={{ ml: 2, mr: 0.5, fontWeight: '500' }}
                    variant="body1"
                    color="black"
                  >
                    {performer.rating}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ ml: 2, mr: 0.5, fontWeight: '500' }}
                    variant="caption"
                    color="black"
                  >
                    Rating
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box display="flex" flexDirection="column">
                <Box>
                  <Typography
                    sx={{ ml: 2, mr: 0.5, fontWeight: '500' }}
                    variant="body1"
                    color="black"
                  >
                    {performer.rank}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ ml: 2, mr: 0.5, fontWeight: '500' }}
                    variant="caption"
                    color="black"
                  >
                    Rank
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box display="flex" flexDirection="column">
                <Box>
                  <Typography
                    sx={{ ml: 2, mr: 0.5, fontWeight: '500' }}
                    variant="body1"
                    color="black"
                  >
                    {performer.problems}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ ml: 2, mr: 0.5, fontWeight: '500' }}
                    variant="caption"
                    color="black"
                  >
                    Problems
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default PerformersCard;
