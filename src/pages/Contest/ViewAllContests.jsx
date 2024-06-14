import { React, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  MenuItem,
  Select,
  Pagination,
  CircularProgress,
} from '@mui/material';
import ContestCard from '../../components/CodingContests/ContestHome/ContestCard';
import { contestAPI } from '../../api/requests/contests/contestAPI';
import { getOrgName } from '../../utils/appendOrgQuery';
import { NavLink } from 'react-router-dom';
import Carousel1 from '../../components/CarouselForBanner';

const ViewAllContests = () => {
  const orgName = getOrgName();
  const imagesObj = JSON.parse(localStorage.getItem('imagesObj'));
  const BannerData = [];
  if (imagesObj) {
    Object.keys(imagesObj).forEach((key) => {
      if (key.includes('contest_banner_up')) {
        BannerData.push(imagesObj[key]);
      }
    });
  }
  let params = new URL(document.location.toString()).searchParams;
  const searchStatus = params.get('search');
  const drawerWidth = 200;
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState(searchStatus);
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);
  const [Contests, setContests] = useState([]);
  const getContests = async () => {
    setLoader(true);
    if (title !== 'ATTEMPTED') {
      try {
        const data = await contestAPI.getContests(title, page);
        setContests(data?.contests);
        setMaxPage(data?.totalPages);
      } catch {
      } finally {
        setLoader(false);
      }
    } else {
      try {
        const data = await contestAPI.getAttemptedContest(page);
        setContests(data?.contests);
      } catch {
      } finally {
        setLoader(false);
      }
    }
  };

  const handleOptionChange = (event) => {
    setTitle(event.target.value);
    setPage(1);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getContests();
  }, [page, title]);

  return (
    <Box sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
      <Grid container>
        <Grid item xs={12} md={12} sx={{ paddingTop: '0px!important', bgcolor: '' }}>
          <Carousel1 BannerImages={BannerData} lgHeight={'400px'} />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" rowSpace={1}>
        <Grid item xs={12} sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: '500', fontSize: { xs: '16px', md: '20px' }, mt: { xs: 2, sm: 0 } }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormControl sx={{ marginLeft: '10px' }}>
                <Select
                  id="select"
                  displayEmpty
                  value={title}
                  onChange={handleOptionChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="UPCOMING">Upcoming</MenuItem>
                  <MenuItem value="ONGOING">Ongoing</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                  <MenuItem value="ATTEMPTED">Attempted</MenuItem>
                </Select>
              </FormControl>
              <div style={{}}>Contests</div>
            </Box>
          </Typography>
        </Grid>

        {
          <Grid
            item
            xs={12}
            sx={{
              p: { xs: 0, md: 2 },
              pt: 0,
              flexGrow: 1,
              border: { xs: 0, md: 1 },
              borderColor: { xs: 'none', md: '#e5e5e5' },
              backgroundColor: '#g1g1g1',
            }}
          >
            {loader ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <CircularProgress />
              </div>
            ) : Contests?.length > 0 ? (
              Contests?.map((Contest, index) => {
                return (
                  <>
                    {title === 'ATTEMPTED' || title === 'COMPLETED' ? (
                      <NavLink
                        to={`/org/${orgName}/contest/${Contest?.id}/${Contest.endingDate}/${Contest?.code}/ranking`}
                        style={{ textDecoration: 'none' }}
                      >
                        <ContestCard key={index} Contest={Contest} />
                      </NavLink>
                    ) : title === 'ONGOING' ? (
                      <NavLink
                        to={`/org/${orgName}/contest/${Contest.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <ContestCard key={index} Contest={Contest} />
                      </NavLink>
                    ) : (
                      <ContestCard key={index} Contest={Contest} startedContest={true} />
                    )}
                  </>
                );
              })
            ) : (
              <Box m={4}>
                <Typography
                  sx={{
                    m: 'auto',
                    fontWeight: '200',
                    alignItems: 'center',
                    textAlign: 'center',
                    py: 4,
                  }}
                  paragraph
                >
                  No contests, Please check back soon
                </Typography>
              </Box>
            )}
          </Grid>
        }
      </Grid>
      <Pagination
        count={maxPage}
        page={page}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        size="large"
        sx={{
          marginTop: '20px',
          justifyContent: 'space-around',
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          background: 'white',
        }}
      />
    </Box>
  );
};

export default ViewAllContests;
