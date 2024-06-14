import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/system';
import { Divider, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { NavLink, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Explanation from './Explanation';
import UploadCodeLink from './UploadCodeLink';
import ProblemMySubmissions from './ProblemMySubmissions';
const ProblemNavbar = ({ problem, contestStatus, isLoading }) => {
  const params = useParams();

  const [currentTab, setCurrentTab] = useState(1);

  const active = 'contained';

  const drawerWidth = 240;

  let tabs = [];
  let routes = [];

  if (contestStatus == true) {
    tabs = [
      {
        id: 1,
        name: 'Explanation',
      },
      {
        id: 2,
        name: 'Submit',
      },
      // {
      //   id: 3,
      //   name: 'My submissions',
      // },
      // {
      //     id: 4,
      //     name: "Discussion",
      // },
    ];
    routes = ['explanation', 'submit', 'submissions', 'discussion'];
  } else if (contestStatus === false) {
    tabs = [
      {
        id: 1,
        name: 'Explanation',
      },
    ];
    routes = ['explanation'];
  }
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
      <>
        <Grid
          container
          sx={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e5e5e5',
            p: { xs: 2, md: '10px 16px 32px 16px' },
            mt: { xs: 8, sm: 0 },
          }}
          top="0"
          position="fixed"
          zIndex="3"
          width="100%"
        >
          <Grid item xs={12} sm={6} md={'auto'} display="flex" alignItems={'center'} mr={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: '700',
                fontSize: { xs: '16px', md: '20px' },
              }}
            >
              CODE {String(problem.title).toUpperCase()}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={'auto'}
            mt={{ xs: 1, md: 0, lg: 0, display: 'flex', alignItems: 'center' }}
          >
            {problem?.rating === undefined ? (
              <Box
                sx={{
                  maxWidth: 'fit-content',
                  bgcolor: '#FFF',
                  // p: "4px 16px",
                  // borderRadius: "8px",
                  // boxShadow: " 1px 1px 12px rgba(0, 0, 0, 0.1)",
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: '200',
                    color: 'grey',
                    lineHeight: '16px',
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                  }}
                >
                  Problem code:
                </Typography>
                <Typography
                  ml={1}
                  variant="body2"
                  sx={{
                    fontWeight: '500',
                    color: '#000000',
                    lineHeight: '18px',
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                    fontSize: { xs: '12px', lg: '14px' },
                  }}
                >
                  {problem?.code}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  maxWidth: 'fit-content',
                  bgcolor: '#FFF',
                  p: '4px 16px',
                  borderRadius: '8px',
                  boxShadow: ' 1px 1px 12px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: '200',
                    color: 'grey',
                    lineHeight: '16px',
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                  }}
                >
                  Difficulty Rating:
                </Typography>
                <Typography
                  ml={1}
                  variant="body2"
                  sx={{
                    fontWeight: '500',
                    color: '#000000',
                    lineHeight: '18px',
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                    fontSize: { xs: '12px', lg: '14px' },
                  }}
                >
                  {problem?.rating}
                </Typography>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} mt={{ xs: 1, md: 2 }}>
            {tabs?.map((tab, index) => (
              <Button
                size={'small'}
                key={index}
                sx={{
                  textTransform: {
                    xs: 'capitalize',
                    md: 'uppercase',
                  },
                  boxShadow: 'none',
                  borderRadius: '8px',
                  fontSize: { xs: '10px', lg: '12px' },
                  backgroundColor: currentTab === tab.id ? 'black' : '',
                  '&:hover': {
                    backgroundColor: currentTab === tab.id ? 'black' : '',
                  },
                }}
                variant={currentTab === tab.id ? active : ''}
                onClick={() => {
                  setCurrentTab(tab.id);
                }}
              >
                {tab.name}
              </Button>
            ))}
          </Grid>
        </Grid>
        <Grid width="100%" sx={{ mt: { xs: 0, sm: 4, md: 2, lg: 0 } }}>
          <Grid item xs={12} md={12}>
            {currentTab === 1 && <Explanation problem={problem} />}
            {currentTab === 2 && <UploadCodeLink problem={problem} />}
            {/* {currentTab === 3 && <ProblemMySubmissions problem={problem} />} */}
          </Grid>
        </Grid>
      </>
    </>
  );
};

export default ProblemNavbar;
