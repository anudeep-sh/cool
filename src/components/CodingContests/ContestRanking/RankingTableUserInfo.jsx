import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';

const RankingTableUserInfo = ({ person }) => {
  const getInitials = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  };
  return (
    <>
      <Grid container alignItems={'center'} justifyContent={'left '}>
        <Grid
          item
          sx={{ pl: { xs: 0, lg: 15 } }}
          display="flex"
          flexDirection="row"
          alignItems={'center'}
          width={'fit-content'}
          justifyContent={'center'}
        >
          <Avatar
            alt={person?.firstName}
            src={person.profilePhotoLink}
            mr={2}
            sx={{
              width: { xs: 32, md: 60 },
              height: { xs: 32, md: 50 },
              backgroundColor: 'black',
            }}
            variant="square"
          >
            {getInitials(person?.firstName)}
          </Avatar>

          <Box ml={2} width={'100%'}>
            <Box
              width={'100%'}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              {/* <ReactCountryFlag
                className="emojiFlag"
                countryCode={person.countryCode}
                style={{
                  fontSize: '16px',
                }}
                aria-label={person.country}
                svg
              /> */}

              <Typography
                sx={{
                  ml: 1,
                  mr: 0.5,
                  fontWeight: '500',
                  fontSize: { xs: '14px', md: '16px' },
                  textAlign: 'left',
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
                variant="body1"
                color="black"
              >
                {person?.firstName} {person?.lastName}
              </Typography>
            </Box>
            {/* <Typography
              sx={{
                fontWeight: '500',
                display: '-webkit-box!important',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: ' vertical',
                textAlign: 'left',
              }}
              variant="caption"
              color="black"
            >
              {person.instituteName.slice(0, 23)}
              {person.instituteName.length > 23 ? '...' : ''}
            </Typography> */}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default RankingTableUserInfo;
