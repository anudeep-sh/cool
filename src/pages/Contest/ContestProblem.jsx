import React, { useState, useEffect } from 'react';
import ProblemNavbar from '../../components/CodingContests/ContestProblem/ProblemNavbar';
import { Box } from '@mui/system';
import { Outlet, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import { contestProblemAPI } from '../../api/requests/contests/contestProblemAPI';

const ContestProblem = () => {
  const { problemId } = useParams();

  const drawerWidth = 200;
  const [problem, setProblem] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [contest_going, setContest_going] = useState(true);

  useEffect(() => {
    getProblemById();
  }, []);

  const getProblemById = async () => {
    try {
      const data = await contestProblemAPI.getProblem(problemId);
      if (data?.contestData?.endingDate < d) {
        setContest_going(false);
      } else {
        setContest_going(true);
      }
      setProblem(data && data);
      setLoading(false);
    } catch (err) {
      setLoading(false); 
    }
  };

  var d = Math.floor(Date.now() / 1000);

  if (isLoading) {
    return (
      <>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </>
    );
  }
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          mt: { xs: '121px', sm: '113px', md: '150px' },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          p: '16px 0px 16px 0px',
          pl: { xs: '16px', lg: '0px' },
          pr: { xs: '16px' },
        }}
      >
        <ProblemNavbar
          isLoading={isLoading}
          contestStatus={contest_going}
          problem={problem?.problemData}
        />
        {isLoading === true && (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </>
  );
};

export default ContestProblem;
