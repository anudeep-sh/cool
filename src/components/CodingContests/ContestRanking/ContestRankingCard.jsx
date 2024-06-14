import React from 'react';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const ContestRankingCard = ({ person }) => {
  return (
    <>
      <Box p={1}>
        <Box
          display="flex"
          flexDirection="column"
          sx={{ p: 1, bgcolor: '#ffffff', border: 1, borderRadius: 3, borderColor: '#e5e5e5' }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                sx={{ ml: 2 }}
              >
                <Box p={1}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box p={0} m={0}>
                      <Typography
                        margin={0}
                        padding={0}
                        sx={{ m: 0, p: 0, fontWeight: '700' }}
                        variant="body1"
                      >
                        {person.rank}
                        <Typography
                          margin={0}
                          padding={0}
                          sx={{ m: 0, p: 0, fontWeight: '90', color: 'grey' }}
                          variant="caption"
                        >
                          {person.rank === 1
                            ? 'st'
                            : person.rank === 2
                            ? 'nd'
                            : person.rank === 3
                            ? 'rd'
                            : person.rank === 4
                            ? 'th'
                            : person.rank === 5
                            ? 'th'
                            : ''}
                        </Typography>
                      </Typography>
                    </Box>
                    <Box p={0} m={0}>
                      {/* <Typography margin={0} padding={0} sx={{ m: 0, p: 0, fontWeight: "90", color: "grey" }} variant="caption">
                                                Rank
                                            </Typography> */}
                    </Box>
                  </Box>
                </Box>
                <Box>
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
                            {person.name}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{ ml: 2, mr: 0.5, fontWeight: '500' }}
                            variant="caption"
                            color="black"
                          >
                            {person.institution.slice(0, 23)}
                            {person.institution.length > 23 ? '...' : ''}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs>
              <Grid container direction="row-reverse">
                <Grid item>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box>
                          <Typography
                            sx={{ ml: 2, mr: 0.5, fontWeight: '500' }}
                            variant="body1"
                            color="black"
                          >
                            {person.score}
                          </Typography>
                        </Box>
                        <Box>
                          {/* <Typography sx={{ ml: 2, mr: 0.5, fontWeight: "500" }} variant="body2" color="grey">Total Score</Typography> */}
                        </Box>
                      </Box>
                    </Box>
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
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ContestRankingCard;
