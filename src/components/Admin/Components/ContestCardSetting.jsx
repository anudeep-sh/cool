import { Box, Button, Typography, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrgName } from '../../../utils/appendOrgQuery';

function ContestCardSetting({ Contest, tab }) {
  const orgName = getOrgName();
  const navigate = useNavigate();

  var startTime = new Date(Contest?.startingDate * 1000);
  const days = Math.floor((Contest?.endingDate - Contest?.startingDate) / (24 * 60 * 60));
  const hours = Math.floor(
    ((Contest?.endingDate - Contest?.startingDate) % (24 * 60 * 60)) / (60 * 60)
  );

  var s = '';
  if (days === 0) s = hours + ' hours';
  else s = days + ' days ' + hours + ' hours';

  return (
    <>
      <Box
        container
        display="flex"
        onClick={(e) => {
          if (
            !e.target.classList.contains('MuiButtonBase-root') &&
            !e.target.classList.contains('MuiButton-label')
          )
            navigate(`/org/${orgName}/admin/contest/${Contest?.id}/problems`);
        }}
        sx={{
          p: 1,
          borderRadius: 3,
          bgcolor: '#ffffff',
          mt: 2,
          height: 'fit-content',
          width: '250px',
          borderColor: '#e5e5e5',
          xs: { width: '300px' },
          md: { width: '400px' },
          lg: { width: '500px' },
          xl: { width: '500px' },
          justifyContent: 'center',
          m: 1,
        }}
      >
        <Stack>
          <Box>
            <Box
              display="flex"
              justifyContent={'center'}
              flexDirection="column"
              sx={{
                mt: 2,
                p: { xs: '4px 8px', md: '10px 16px' },
                bgcolor: '#000',
                borderRadius: '8px',
              }}
              alignItems="center"
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
                {String(startTime).slice(4, 7)}
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
                {String(startTime).slice(8, 10)}
              </Typography>
            </Box>
            <Typography
              sx={{
                display: '-webkit-box!important',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: ' vertical',
                mt: 1,
              }}
              variant="body1"
              color="#2B3746"
              textAlign="left"
            >
              {Contest?.title}
            </Typography>
            <Stack>
              <Box display="flex" alignItems="center">
                <Typography
                  variant="caption"
                  color="grey"
                  sx={{
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                    textAlign: 'left',
                  }}
                >
                  Code:{' '}
                </Typography>
                <Typography
                  sx={{
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
                  {Contest?.code}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
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
                  {tab && tab === 'UPCOMING' ? 'Starts at:' : 'Started At:'}
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
                  {startTime?.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
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
                  {s}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box display={'flex'} sx={{ width: '100%', mt: 1 }} gap={2}>
            <Button
              fullWidth
              sx={{ fontSize: '11px', fontWeight: '400' }}
              variant="outlined"
              onClick={() => {
                navigate(`/org/${orgName}/admin/contest/${Contest?.id}/edit`);
              }}
            >
              Edit
            </Button>
            <Button
              fullWidth
              sx={{ fontSize: '11px', fontWeight: '400' }}
              variant="outlined"
              disabled={'true'}
            >
              Delete
            </Button>
            {/* <Button
              fullWidth
              sx={{ fontSize: '11px', fontWeight: '400' }}
              variant="contained"
              onClick={() => {
                navigate(`/org/${orgName}/contest/${Contest.id}`);
              }}
            >
              View
            </Button> */}
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default ContestCardSetting;
