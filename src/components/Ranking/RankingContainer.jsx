import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';
import { getOrgName } from '../../utils/appendOrgQuery';

const RankingContainer = ({ title, rankings }) => {
  const orgName = getOrgName();
  var ele1 = [].concat(rankings?.slice(0, 1)); //person with 1st position
  var ele2 = [].concat(rankings?.slice(1, 2)); //person with 2nd position
  var ele3 = [].concat(rankings?.slice(2, 3)); //person with 3rd position
  function getFirstName(name) {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  }
  const array = rankings?.slice(3, 6);

  return (
    // xs={12} md={12}
    <Grid container>
      <Grid
        item
        xs={12}
        md={12}
        sx={{ bgcolor: '#FAFCFE', p: 2, display: 'flex', alignItems: 'center' }}
      >
        <EmojiEventsOutlinedIcon
          sx={{
            mb: 0,
            padding: 0,
            fontSize: { xs: '16px', md: '20px' },
            mr: 2,
          }}
        />
        <Typography sx={{ fontWeight: '700', fontSize: { xs: '16px', md: '18px' } }} variant="h6">
          {title}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          p: 2,
          pt: 0,
          flexGrow: 1,
          border: 1,
          borderColor: '#e5e5e5',
          backgroundColor: '#g1g1g1',
        }}
      >
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="row"
          justifyContent={'space-between'}
          sx={{ gap: '16px' }}
          m={1}
          mb={3}
        >
          <Grid
            xs={4}
            spacing={2}
            mt={7}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              alt={ele2[0]?.firstName}
              src={ele2[0]?.profilePhotoLink}
              mr={2}
              sx={{
                width: { lg: '46px', xs: '36px' },
                height: { lg: '46px', xs: '36px' },
                border: 3,
                borderColor: '#FAAF00',
              }}
            >
              {getFirstName(ele2[0]?.firstName)}
            </Avatar>
            <Box mt={1.5} textAlign={'center'}>
              <Typography
                sx={{
                  fontWeight: '500',
                  textAlign: 'center',
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
                variant="body2"
                color="black"
              >
                {!ele2[0]?.firstName && !ele2[0]?.lastName
                  ? `No user`
                  : `${ele2[0]?.firstName} ${ele2[0]?.lastName}`}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: '400',
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
                variant="caption"
                color="black"
                textAlign={'center'}
              >
                {!ele2[0]?.totalScore ? `Score: N/A` : `Score: ${ele2[0]?.totalScore}`}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              fullWidth
              m={0}
              p={0}
              style={{ textTransform: 'none' }}
              sx={{
                borderColor: '#e5e5e5',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#e5e5e5',
                },
                mt: 2,
              }}
            >
              <Typography sx={{ fontWeight: '90' }} variant="body2" color="#FAAF00">
                2
              </Typography>
              <Typography sx={{ fontWeight: '90' }} variant="caption" color="black">
                nd
              </Typography>
            </Button>
          </Grid>
          <Grid
            xs={4}
            spacing={2}
            mt={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              alt={ele1[0]?.firstName}
              src={ele1[0]?.profilePhotoLink}
              mr={2}
              sx={{
                width: { lg: '75px', xs: '45px' },
                height: { lg: '76px', xs: '45px' },
                border: 3,
                borderColor: '#FAAF00',
              }}
            >
              {getFirstName(ele1[0]?.firstName)}
            </Avatar>
            <Box mt={1.5} textAlign={'center'}>
              <Typography
                sx={{
                  fontWeight: '500',
                  textAlign: 'center',
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
                variant="body2"
                color="black"
              >
                {!ele1[0]?.firstName && !ele1[0]?.lastName
                  ? `No user`
                  : `${ele1[0]?.firstName} ${ele1[0]?.lastName}`}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: '400',
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
                variant="caption"
                color="black"
                textAlign={'center'}
              >
                {!ele1[0]?.totalScore ? `Score: N/A` : `Score: ${ele1[0]?.totalScore}`}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              fullWidth
              m={0}
              p={0}
              style={{ textTransform: 'none' }}
              sx={{
                borderColor: '#e5e5e5',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#e5e5e5',
                },
                mt: 2,
              }}
            >
              <Typography sx={{ fontWeight: '90' }} variant="body2" color="#FAAF00">
                1
              </Typography>
              <Typography sx={{ fontWeight: '90' }} variant="caption" color="black">
                st
              </Typography>
            </Button>
          </Grid>
          <Grid
            xs={4}
            spacing={2}
            mt={7}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              alt={ele3[0]?.firstName}
              src={ele3[0]?.profilePhotoLink}
              mr={2}
              sx={{
                width: { lg: '46px', md: '36px' },
                height: { lg: '46px', md: '36px' },
                border: 3,
                borderColor: '#FAAF00',
              }}
            >
              {getFirstName(ele3[0]?.firstName)}
            </Avatar>
            <Box mt={1.5} textAlign={'center'}>
              <Typography
                sx={{
                  fontWeight: '500',
                  textAlign: 'center',
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
                variant="body2"
                color="black"
              >
                {!ele3[0]?.firstName && !ele3[0]?.lastName
                  ? `No user`
                  : `${ele3[0]?.firstName} ${ele3[0]?.lastName}`}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: '400',
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
                variant="caption"
                color="black"
                textAlign={'center'}
              >
                {!ele3[0]?.totalScore ? `Score: N/A` : `Score: ${ele3[0]?.totalScore}`}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              fullWidth
              m={0}
              p={0}
              style={{ textTransform: 'none' }}
              sx={{
                borderColor: '#e5e5e5',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#e5e5e5',
                },
                mt: 2,
              }}
            >
              <Typography sx={{ fontWeight: '90' }} variant="body2" color="#FAAF00">
                3
              </Typography>
              <Typography sx={{ fontWeight: '90' }} variant="caption" color="black">
                rd
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Box display="flex" flexDirection="column" sx={{ mb: 1 }}>
          {/* mapped elements */}
          {array.map((ele, index) => {
            return (
              <Box key={index} p={1} alignItems="center" justifyContent="center">
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item>
                    <Box display="flex" flexDirection="row">
                      <Box>
                        <Avatar
                          alt={ele?.firstName}
                          src={ele?.profilePhotoLink}
                          mr={2}
                          sx={{ width: 40, height: 40 }}
                        />
                      </Box>
                      <Box display="flex" flexDirection="column" ml={1}>
                        <Box m={0} p={0}>
                          <Typography
                            sx={{
                              fontWeight: '500',
                              textAlign: 'left',
                              display: '-webkit-box!important',
                              WebkitLineClamp: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitBoxOrient: ' vertical',
                            }}
                            variant="body2"
                            color="black"
                          >
                            {ele.firstName} {ele.lastName}
                          </Typography>
                        </Box>
                        <Box m={0} p={0}>
                          <Typography
                            sx={{
                              fontWeight: '300',
                              textAlign: 'left',
                              display: '-webkit-box!important',
                              WebkitLineClamp: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitBoxOrient: ' vertical',
                            }}
                            variant="caption"
                            color="black"
                          >
                            Rating: {ele.totalScore}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs>
                    <Grid container direction="row-reverse">
                      <Grid item>
                        <Button
                          variant="outlined"
                          fullWidth
                          m={0}
                          style={{ textTransform: 'none' }}
                          p={0}
                          sx={{
                            borderColor: '#e5e5e5',
                            borderRadius: 4,
                            '&:hover': {
                              backgroundColor: 'white',
                              borderColor: '#e5e5e5',
                            },
                          }}
                        >
                          <Typography sx={{ fontWeight: '90' }} variant="body2" color="#FAAF00">
                            {index + 4}
                          </Typography>
                          <Typography sx={{ fontWeight: '90' }} variant="caption" color="black">
                            th
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Box>

        <Box>
          <NavLink to={`/org/${orgName}/contest/rankings`} style={{ textDecoration: 'none' }}>
            <Button variant="outlined" fullWidth m={0} p={0}>
              View All
            </Button>
          </NavLink>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RankingContainer;
