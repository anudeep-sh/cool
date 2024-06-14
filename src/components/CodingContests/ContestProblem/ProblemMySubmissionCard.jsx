import React from 'react';
import { Box } from '@mui/system';
import { Grid, Button, Chip } from '@mui/material';
import Typography from '@mui/material/Typography';

const ProblemMySubmissionCard = ({ mySubmission }) => {
  const dateTime = new Date(mySubmission.created_at);

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
        p={1}
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        sx={{ border: 1, borderColor: '#e5e5e5', borderRadius: 1 }}
      >
        <Grid container>
          <Grid item>
            <Box display="flex" flexDirection="row">
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    boxShadow: 0,
                    textTransform: 'none',
                    color: '#698AFF',
                    backgroundColor: '#DFE6FF',
                    '&:hover': { boxShadow: 0, color: '#698AFF', backgroundColor: '#DFE6FF' },
                  }}
                >
                  <Typography sx={{ fontSize: '13px', fontWeight: '400' }} variant="body2">
                    {dateTime.getDate()}-{monthNames[dateTime.getMonth()]}-{dateTime.getFullYear()},
                    Time:{' '}
                    {dateTime.toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </Typography>
                </Button>
              </Box>
              <Box ml={8}>
                <Chip label={mySubmission.language} color="primary" variant="outlined" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs justifyContent="center" alignItems="center">
            <Grid container direction="row-reverse">
              <Grid item>
                <Box display="flex" felxDirection="row" alignItems="center" justifyContent="center">
                  <Box mr={8}>
                    <Typography sx={{ fontSize: '13px', fontWeight: '400' }} variant="body2">
                      Github repo-{' '}
                      <a href={mySubmission.githubRepo} target="_blank" rel="noreferrer noopener">
                        Repository link
                      </a>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography mr={5} sx={{ fontSize: '13px', fontWeight: '400' }} variant="body2">
                      Submission Link-{' '}
                      <a
                        href={mySubmission.submissionLink}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Submission
                      </a>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProblemMySubmissionCard;
