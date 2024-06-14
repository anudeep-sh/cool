import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrgName } from '../../../utils/appendOrgQuery';

const EditProblemCard = ({ Problem }) => {
  const orgName = getOrgName();
  const navigate = useNavigate();
  return (
    <>
      <Grid
        container
        sx={{
          p: 2,
          borderRadius: 3,
          bgcolor: '#ffffff',
          width: '100%',
          border: 1,
          borderColor: '#e5e5e5',
          width: '300px',
          mr: 0,
          mb: 2,
        }}
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
            {Problem.title}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex' }} alignItems="center">
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
            Difficulty Level
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
            {Problem.difficultyLevel}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex' }} alignItems="center">
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
            Maximum Score
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
            {Problem.maximumScore}
          </Typography>
        </Grid>
        <Grid container item xs={12} mt={2} display="flex" alignItems={'center'}>
          <Box display={'flex'} sx={{ width: '100%' }} gap={2}>
            <Button
              fullWidth
              sx={{ fontSize: '11px', fontWeight: '400' }}
              variant="outlined"
              onClick={() => {
                navigate(`/org/${orgName}/admin/${Problem.id}/edit`);
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
            <Button
              fullWidth
              sx={{ fontSize: '11px', fontWeight: '400' }}
              variant="contained"
              disabled={'true'}
            >
              View
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default EditProblemCard;
