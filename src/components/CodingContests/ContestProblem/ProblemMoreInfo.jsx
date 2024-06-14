import React from 'react';
import { ContainerOfTitle } from '../../../Style/VideoSlider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion } from '@mui/material';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import StarIcon from '@mui/icons-material/Star';

const ProblemMoreInfo = ({ moreInfo, authors }) => {
  return (
    <>
      <Accordion
        m={0}
        p={0}
        defaultExpanded={true}
        sx={{ boxShadow: 'none', mt: '32px!important' }}
      >
        <AccordionSummary
          sx={{
            backgroundColor: '#FAFCFE',
            minHeight: { xs: '48px!important', md: '58px!important' },
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: '500',
              fontSize: { xs: '16px', md: '20px' },
            }}
          >
            More Info
          </Typography>{' '}
          {/*title of the container*/}
        </AccordionSummary>

        <AccordionDetails sx={{ border: '1px solid #e5e5e5', px: '0px', py: 1 }}>
          <Grid Container direction={'column'}>
            <List sx={{ p: '0px!important' }}>
              {moreInfo?.map((info, index) => {
                return (
                  info && (
                    <ListItem key={index}>
                      <StarIcon sx={{ color: '#e5e5e5', fontSize: '16px' }} mr={1} />
                      <Typography
                        ml={1}
                        sx={{
                          fontSize: { xs: '12px', md: '13px' },
                          lineHeight: '18px',
                          fontWeight: '200',
                        }}
                        variant="body2"
                      >
                        {info}
                      </Typography>
                    </ListItem>
                  )
                );
              })}
            </List>
            {/* <Box p={2}>
                           <Typography ml={1} sx={{ fontSize: "16px", fontWeight: "700" }} variant="body1">Languages</Typography>
                           </Box>
                             <Box pl={2}>
                                   <Stack direction="row" spacing={2}>
                                   {(info.languages).map((lang, index) => {
                                           return (
                                                 <Chip p={2} label={<Typography ml={1} sx={{ fontSize: "12px", fontWeight: "200", color: "#343434" }} variant="caption">{lang}</Typography>} key={index} variant="outlined" sx={{ borderRadius: 1 }} />
                                        )
                                     })}
                                 </Stack>
                            </Box> */}
            <Grid item xs={12} pl={2}>
              <Typography sx={{ fontSize: '14px', fontWeight: '700', mt: 2 }} variant="body1">
                Author
              </Typography>
            </Grid>
            <Grid container p={2} columnSpacing={2} paddingBottom={'8px!important'}>
              {authors?.map((author, index) => {
                return (
                  <>
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      mb={1}
                      key={index}
                      display="flex"
                      // flexWrap={"wrap"}
                      flexDirection="row"
                      alignItems="center"
                    >
                      <IconButton
                        sx={{
                          width: { xs: 30, md: 36 },
                          height: { xs: 30, md: 36 },
                          borderRadius: 1,
                          bgcolor: '#d9d9d9',
                          color: '#505050',
                          '&:hover': {
                            backgroundColor: '#d9d9d9',
                          },
                          fontSize: { xs: '14px', md: '16px' },
                          mr: 1.5,
                        }}
                      >
                        {author.slice(0, 1)}
                      </IconButton>
                      <Typography
                        sx={{
                          mr: 0.5,
                          fontWeight: '500',
                          fontSize: { xs: '14px', md: '16px' },
                          display: '-webkit-box!important',
                          WebkitLineClamp: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          WebkitBoxOrient: ' vertical',
                        }}
                        variant="body1"
                        color="black"
                      >
                        {author}
                      </Typography>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ProblemMoreInfo;
