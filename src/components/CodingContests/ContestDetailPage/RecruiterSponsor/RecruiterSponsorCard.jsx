import React from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import StarIcon from '@mui/icons-material/Star';
import { Button } from '@mui/material';

const RecruiterSponsorCard = ({ recruiterSponsor }) => {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ minWidth: 275, boxShadow: 1 }}
      >
        <Box display="flex" flexDirection="column" sx={{ p: 1 }} justifyContent="flex-start">
          {/* <Box component="img" sx={{
                        borderRadius: 1,
                        boxShadow: 1,
                        width: 400,
                    }}
                        ml={20}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        alt="image"
                        src={Image}>
                    </Box> */}
          {/* <Box>
                        <Typography sx={{ m: 1, fontWeight: "200" }} paragraph>{recruiterSponsor.description}</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{m:1, fontWeight: "200" }} variant="body1"><strong>{recruiterSponsor.requirements.title}</strong></Typography>
                    </Box> */}
          <Box>
            <List textAlign="left">
              <ListItem>
                {recruiterSponsor.map((ele, index) => {
                  return (
                    <Box key={index}>
                      <StarIcon sx={{ color: '#e5e5e5' }} mr={1} />
                      <Typography
                        ml={1}
                        sx={{ fontSize: '15px', fontWeight: '200' }}
                        variant="body2"
                      >
                        {ele}
                      </Typography>
                    </Box>
                  );
                })}
              </ListItem>
              {/* <ListItem>
                                <StarIcon sx={{ color: "#e5e5e5" }} />
                                <Typography ml={1} sx={{ fontSize: "15px", fontWeight: "200", color: "grey" }} variant="body2">JD: </Typography>
                                <Typography ml={1} mr={1} sx={{ fontSize: "15px", fontWeight: "200" }} variant="body2">{recruiterSponsor.requirements.details.jd}
                                    <Button variant="contained" size="small" sx={{ml: 1,
                                        height: 30, color: "white", backgroundColor: "#343434",
                                        "&:hover": {
                                            backgroundColor: "grey"
                                        }
                                    }}>
                                        <Typography sx={{ fontSize: "11px", fontWeight: "200" }} variant="body2">
                                            Click here
                                        </Typography>
                                    </Button>
                                </Typography>
                            </ListItem> */}
            </List>
          </Box>
          {/* <Box>
                        <Typography sx={{ m: 1, fontWeight: "500" }} variant="body1"><strong>{recruiterSponsor.qualifications.title}</strong></Typography>
                    </Box>
                    <Box>
                        <List>
                            {(recruiterSponsor.qualifications.points).map((point, index) => {
                                return (
                                    <ListItem key={index}>
                                        <StarIcon sx={{ color: "#e5e5e5" }} />
                                        <Typography ml={1} sx={{ fontSize: "15px", fontWeight: "200" }} variant="body2">{point}</Typography>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box> */}
          <Box textAlign="center">
            <Button
              margin="auto"
              variant="contained"
              sx={{
                color: 'white',
                backgroundColor: '#343434',
                '&:hover': {
                  backgroundColor: 'grey',
                },
              }}
            >
              Apply here
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RecruiterSponsorCard;
