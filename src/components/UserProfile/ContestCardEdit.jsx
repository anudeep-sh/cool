import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';

const drawerWidth = 240;

function ContestCardEdit() {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: '16px 0px 0px 0px', sm: 2 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Grid
          container
          display="flex"
          flexDirection="row"
          sx={{
            p: 1,
            borderRadius: 3,
            bgcolor: '#ffffff',
            mt: 2,
            width: '100%',
            border: 1,
            borderColor: '#e5e5e5',
            width: '320px',
          }}
        >
          <Grid item xs={2.5} mr={2}>
            <Box
              display="flex"
              justifyContent={'center'}
              flexDirection="column"
              sx={{
                p: { xs: '4px 8px', md: '10px 16px' },
                bgcolor: '#000',
                borderRadius: '8px',
              }}
            >
              <Typography
                margin={0}
                padding={0}
                sx={{
                  m: 0,
                  p: 0,
                  fontWeight: '300',
                  color: '#E1E1E1',
                  lineHeight: '16px',
                  textAlign: 'center',
                }}
                variant="caption"
              >
                {'Mar'}
                {/* {String(timeFrom).slice(4, 7)} */}
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  p: 0,
                  fontWeight: '500',
                  lineHeight: '24px',
                  color: '#fff',
                  fontSize: { xs: '16px', md: '24px' },
                  textAlign: 'center',
                }}
                variant="h5"
              >
                {'02'}

                {/* {String(timeFrom).slice(8, 10)} */}
              </Typography>
            </Box>
          </Grid>
          <Grid
            container
            item
            xs={8.8}
            display="flex"
            alignItems={'center'}
            justifyContent="space-between"
          >
            <Grid item xs={12}>
              <Typography
                sx={{
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
                variant="body1"
                color="#2B3746"
              >
                {`title`}
                {/* {Contest.title} */}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex' }} alignItems="center">
              {/* {startedContest? <Typography sx={{display: "-webkit-box!important", WebkitLineClamp: 1, overflow: "hidden", textOverflow: "ellipsis", WebkitBoxOrient: " vertical" }} variant="caption" color="#787878">Started At</Typography>:
                  <Typography sx={{display: "-webkit-box!important", WebkitLineClamp: 1, overflow: "hidden", textOverflow: "ellipsis", WebkitBoxOrient: " vertical" }} variant="caption" color="#787878">Starts At</Typography>} */}
              <Typography
                sx={{
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
                variant="caption"
                color="#787878"
              >
                Started At
              </Typography>
              <Typography
                sx={{
                  ml: 1,
                  fontSize: { xs: '12px', md: '13px' },
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
                variant="caption"
                color="#2B3746"
              >
                {`12:00 AM`}
                {/* {(timeFrom).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}  */}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex' }} alignItems="center">
              <Typography
                variant="caption"
                color="grey"
                sx={{
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
              >
                Duration:{' '}
              </Typography>
              <Typography
                sx={{
                  ml: 1,
                  fontSize: { xs: '12px', md: '13px' },
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
                variant="caption"
                color="#2B3746"
              >
                {`1d 2h`}
                {/* {s} */}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} mt={2} display="flex" alignItems={'center'}>
            <Box display={'flex'} sx={{ width: '100%' }} gap={2}>
              <Button fullWidth sx={{ fontSize: '11px', fontWeight: '400' }} variant="outlined">
                Edit
              </Button>
              <Button fullWidth sx={{ fontSize: '11px', fontWeight: '400' }} variant="outlined">
                Delete
              </Button>
              <Button fullWidth sx={{ fontSize: '11px', fontWeight: '400' }} variant="contained">
                View
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ContestCardEdit;
