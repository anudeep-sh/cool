import React, { useState, useEffect, memo } from 'react';
import ContestBanner from '../../components/Banner/ContestBanner';
import ScorableProblems from '../../components/CodingContests/ContestDetailPage/ScorableProblems/ScorableProblems';
import Announcements from '../../components/CodingContests/ContestDetailPage/announcements/Announcements';
import RecruiterSponsor from '../../components/CodingContests/ContestDetailPage/RecruiterSponsor/RecruiterSponsor';
import RulesRegulations from '../../components/CodingContests/ContestDetailPage/rulesRegulations/RulesRegulations';
import AboutContest from '../../components/CodingContests/ContestDetailPage/aboutContest/AboutContest';
import UpcomingContestCarousel from '../../components/CodingContests/UpcomingContestCarousel';
import ShowRank from '../../components/CodingContests/ShowRank';
import BreadCrumb from '../../components/CodingContests/ContestDetailPage/BreadCrumb';
import { useNavigate, useParams } from 'react-router-dom';
import Clock from '../../components/CodingContests/ContestDetailPage/Clock';
import { Grid, Typography } from '@mui/material';
import { contestAPI } from '../../api/requests/contests/contestAPI';
import { contestAnnouncementAPI } from '../../api/requests/contests/contestAnnouncementAPI';
import BigLoader from '../../components/Skeleton/BigLoader';
import { getOrgName } from '../../utils/appendOrgQuery';

const ContestDetail = () => {
  const { contestId } = useParams();
  const [contest_code, setContestCode] = useState();
  const [Contest, setContest] = useState();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const orgName = getOrgName();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setLoading2(true);
    getContest();
    getAnnouncements();
  }, []);

  var contest_going = true;

  const getContest = async () => {
    try {
      const data = await contestAPI.getContest(contestId);
      console.log('curr', new Date().getTime());
      if (data.contestData[0].endingDate < new Date().getTime() / 1000) {
        contest_going = false;
        navigate(
          `/org/${orgName}/contest/${data.contestData[0]?.id}/${data.contestData[0].endingDate}/${data.contestData[0]?.code}/ranking`
        );
      }
      setContest(data);
      setContestCode(data?.contestData[0]?.code);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const getAnnouncements = async () => {
    try {
      const data = await contestAnnouncementAPI.getAnnouncements(contestId);
      setAnnouncements(data);
    } catch (err) {
    } finally {
      setLoading2(false);
    }
  };

  const selected = (crumb) => {};

  const drawerWidth = 200;
  return (
    <>
      {' '}
      {loading || loading2 ? (
        <BigLoader />
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
            m: 0,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            p: 2,
          }}
        >
          <Grid
            item
            xs={12}
            md={12}
            sx={{ paddingTop: '0px!important', paddingLeft: '0px!important' }}
          >
            <ContestBanner />
          </Grid>
          <Grid item xs={12} md={12} sx={{ paddingLeft: '0px!important' }}>
            <BreadCrumb
              sx={{ mt: 0 }}
              selected={selected}
              contest_code={Contest?.contestData[0]?.code}
            />
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '16px', md: '20px' },
                mt: 2,
                ml: 1.5,
                display: { xs: 'block', md: 'none' },
              }}
            >
              {' '}
              {Contest?.contestData[0]?.title}
            </Typography>
          </Grid>
          <Grid container spacing={2} sx={{ mt: { xs: 0, md: 2 } }}>
            <Grid item xs={12} md={8} sx={{ paddingTop: '0px!important', mt: { xs: 4, md: 0 } }}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '16px', md: '20px' },
                  mb: 2,
                  display: { xs: 'none', md: 'block' },
                }}
              >
                {Contest?.contestData[0]?.title}
              </Typography>
              <ScorableProblems
                contestStatus={contest_going}
                ContestProbs={Contest?.problemData}
                contestId={contestId}
              />
              {announcements?.length > 0 && <Announcements announcements={announcements} />}
              {Contest?.contestData[0]?.sponsers?.length > 0 && (
                <RecruiterSponsor recruiterSponsors={Contest?.contestData[0]?.sponsers} />
              )}
              <AboutContest
                about={Contest?.contestData[0]?.about}
                duration={
                  Contest?.contestData[0]?.endingDate - Contest?.contestData[0]?.startingDate
                }
                ed={Contest?.contestData[0]?.endingDate}
                sd={Contest?.contestData[0]?.startingDate}
              />
              {Contest?.contestData[0]?.rules?.length > 0 &&
                Contest?.contestData[0]?.rules[0] !== '' && (
                  <RulesRegulations rules={Contest?.contestData[0]?.rules} />
                )}
            </Grid>
            <Grid item xs={12} display={{ xs: 'block', md: 'none' }}>
              <Clock
                startingDate={parseInt(Contest?.contestData[0]?.startingDate)}
                duration={parseInt(
                  Contest?.contestData[0]?.endingDate - Contest?.contestData[0]?.startingDate
                )}
                contest_going={contest_going}
              />

              <ShowRank
                contestStatus={contest_going}
                contestId={contestId}
                time={Contest?.contestData[0]?.endingDate}
                contest_code={contest_code}
              />
              <UpcomingContestCarousel />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                paddingTop: '0px!important',
                display: { xs: 'none', md: 'block' },
                mt: { xs: 4, md: 6 },
              }}
            >
              <Clock
                startingDate={parseInt(Contest?.contestData[0]?.startingDate)}
                duration={parseInt(
                  Contest?.contestData[0]?.endingDate - Contest?.contestData[0]?.startingDate
                )}
                contest_going={contest_going}
              />
              <UpcomingContestCarousel />
              {/* <ShowRank
              contestStatus={contest_going}
              contestId={contestId}
              time={Contest?.contestData[0]?.endingDate}
              contest_code={contest_code}
            /> */}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default memo(ContestDetail);
