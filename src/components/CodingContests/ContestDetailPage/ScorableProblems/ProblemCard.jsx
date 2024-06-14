import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

const ProblemCard = ({ problem, i }) => {
  let colour = '#000000';

  if (problem?.difficultyLevel === 'EASY') colour = '#228c22';
  else if (problem?.difficultyLevel === 'MEDIUM') colour = '#CCCC00';
  else if (problem?.difficultyLevel === 'HARD') colour = '#d92121';

  return (
    <>
      <Grid
        container
        sx={{
          p: 1,
          borderRadius: 3,
          bgcolor: '#ffffff',
          mt: 2,
          width: '100%',
          border: 1,
          borderColor: '#e5e5e5',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Grid
          item
          xs={3.5}
          sm={3}
          md={3}
          lg={3}
          sx={{
            mr: { xs: 1, sm: 2 },
            p: { xs: '4px 8px', md: '8px 16px' },
            maxHeight: '36px!important',
            bgcolor: '#000',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              m: 0,
              p: 0,
              fontWeight: '500',
              lineHeight: '24px',
              color: '#fff',
              fontSize: { xs: '12px', md: '14px' },
              textAlign: 'center',
              display: '-webkit-box!important',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: ' vertical',
            }}
            variant="h5"
          >
            {problem.code.toUpperCase()}
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={8}
          sm={8}
          md={8.2}
          lg={8.6}
          display="flex"
          alignItems={'center'}
          justifyContent="space-between"
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={4}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: { xs: 0, md: 0, lg: 2 },
              mb: { xs: 0.5, lg: '0px' },
            }}
          >
            <Typography
              sx={{
                display: '-webkit-box!important',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: ' vertical',
                fontSize: { xs: '14px', md: '16px' },
              }}
              variant="body1"
              color="#2B3746"
            >
              {problem.title.toUpperCase()}
            </Typography>
          </Grid>

          <Grid
            item
            xs={7}
            md={6}
            lg={4}
            sx={{ display: 'flex', mr: { xs: 1, sm: 2 } }}
            alignItems="center"
          >
            <Typography sx={{ mr: 1 }} variant="caption" color="#787878">
              Difficulty:
            </Typography>
            <Typography
              sx={{
                display: '-webkit-box!important',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: ' vertical',
              }}
              variant="caption"
              color={colour}
            >
              {problem.difficultyLevel}{' '}
            </Typography>
          </Grid>
          <Grid item xs={4.1} sm={4} lg={3} sx={{ display: 'flex' }} alignItems="center">
            <Typography
              sx={{
                mr: 1,
                display: '-webkit-box!important',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: ' vertical',
              }}
              variant="caption"
              color="#787878"
            >
              Score:
            </Typography>

            <Typography
              sx={{
                fontSize: '13px',
                display: '-webkit-box!important',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: ' vertical',
              }}
              variant="caption"
              color="#2B3746"
            >
              {problem.maximumScore}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ProblemCard;
