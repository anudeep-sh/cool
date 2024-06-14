import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import ContestContainer from '../../components/CodingContests/ContestHome/ContestContainer';
import RankingContainer from '../../components/Ranking/RankingContainer';
import Carousel1 from '../../components/CarouselForBanner';
import { Grid } from '@mui/material';
import { contestAPI } from '../../api/requests/contests/contestAPI';
import { contestRankAPI } from '../../api/requests/contests/contestRankAPI';
import { fetchAllImages } from '../../utils/images';
import { handleAlert } from '../../utils/handleAlert';

const imagesObj = JSON.parse(localStorage.getItem('imagesObj'));
const BannerData = [];
if (imagesObj) {
  Object.keys(imagesObj).forEach((key) => {
    if (key.includes('contest_banner_up')) {
      BannerData.push(imagesObj[key]);
    }
  });
}
const BannerData2 = [];
if (imagesObj) {
  Object.keys(imagesObj).forEach((key) => {
    if (key.includes('contest_banner_codingcontest')) {
      BannerData2.push(imagesObj[key]);
    }
  });
}

const ContestHome = () => {
  useEffect(() => {
    fetchAllImages();
    getContests();
  }, []);
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [loader3, setLoader3] = useState(false);
  const [loader4, setLoader4] = useState(false);
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [presentContests, setPresentContests] = useState([]);
  const [completedContests, setCompletedContests] = useState([]);
  const [attemptedContests, setAttemptedContests] = useState([]);
  const getContests = async () => {
    setLoader1(true);
    setLoader2(true);
    setLoader3(true);
    setLoader4(true);
    try {
      const data = await contestAPI.getContests('UPCOMING', 1);
      if (data !== 'no upcoming contests for now') {
        setUpcomingContests(data?.contests);
      }
    } catch (err) {
      handleAlert('Failed to fetch contests', 'error');
    } finally {
      setLoader1(false);
    }
    try {
      const data2 = await contestAPI.getContests('ONGOING', 1);
      if (data2 !== 'no ongoing contests for now') {
        setPresentContests(data2?.contests);
      }
    } catch (err) {
      handleAlert('Failed to fetch contests', 'error');
    } finally {
      setLoader2(false);
    }
    try {
      const data4 = await contestAPI.getAttemptedContest(1);
      if (data4 !== 'no attempted contest') {
        setAttemptedContests(data4?.contests);
      }
    } catch (err) {
      handleAlert('Failed to fetch contests', 'error');
    } finally {
      setLoader4(false);
    }
    try {
      const data3 = await contestAPI.getContests('COMPLETED', 1);
      if (data3 !== 'no completed contests') {
        setCompletedContests(data3?.contests);
      }
    } catch (err) {
    } finally {
      setLoader3(false);
    }
  };

  const [rankings, setRankings] = useState([]);

  const getRanks = async () => {
    try {
      const data = await contestRankAPI.getOrgRanks(1);

      setRankings(data?.data.length === 0 ? [] : data?.data);
    } catch (err) {}
  };

  useEffect(() => {
    getRanks();
  }, []);

  var d = Math.floor(Date.now() / 1000);

  // for (var i = 0; i < Contests.length; i++) {
  //   if (Contests[i].endingDate > d && Contests[i].startingDate >= d) {
  //     upcomingContests.push(Contests[i]);
  //   } else if(Contests[i].endingDate > d && Contests[i].startingDate < d){
  //     presentContests.push(Contests[i]);
  //   }
  // }

  const drawerWidth = 200;
  return (
    <>
      {/* <SideBarResponsive /> */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        // display: { xs: "none", sm: isContestPage ? "none" : "block",lg: isContestPage ? "block" : "none" },
      >
        <Grid container>
          <Grid item xs={12} md={12} sx={{ paddingTop: '0px!important', bgcolor: '' }}>
            <Carousel1 BannerImages={BannerData} lgHeight={'400px'} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8} sx={{ paddingTop: '0px!important' }}>
            <ContestContainer
              title="Ongoing Coding Contest"
              Contests={presentContests}
              query={'ONGOING'}
              loader={loader2}
            />
            <Box mt={2}>
              <ContestContainer
                title="Upcoming Coding Contest"
                Contests={upcomingContests}
                startedContest="true"
                query={'UPCOMING'}
                loader={loader1}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              paddingTop: '0px!important',
              display: { xs: 'none', md: 'block' },
            }}
          >
            <RankingContainer title="Organization Ranking" rankings={rankings} />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8} sx={{ paddingTop: '0px!important' }}>
            <Grid item xs={12} mb={2}>
              <Carousel1 BannerImages={BannerData2} lgHeight={'210px'} />
            </Grid>
            {/* <WeekTopPerformers topPerformers={topPerformers} /> */}
            <ContestContainer
              title="Completed Coding Contest"
              Contests={completedContests}
              query={'COMPLETED'}
              loader={loader3}
            />
            <Box mt={2}>
              <ContestContainer
                title="Attempted Coding Contest"
                Contests={attemptedContests}
                query={'ATTEMPTED'}
                loader={loader4}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ paddingTop: '0px!important' }}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                paddingTop: '0px!important',
                my: 2,
                display: { xs: 'block', md: 'none' },
              }}
            >
              <RankingContainer title="Organization Ranking" rankings={rankings} />
            </Grid>

            {/* <RankingContainer
              title="Global Ranking for testers"
              rankings={rankings}
            /> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContestHome;
