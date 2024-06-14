import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ClockRanking from './ClockRanking';
import Grid from '@mui/material/Grid';
import SearchArea from './SearchArea';
import Link from '@mui/material/Link';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { useParams } from 'react-router-dom';
import ClockRankingForMobile from './ClockRankingForMobile';
import { getOrgName } from '../../../utils/appendOrgQuery';

const RankingNavbar = ({
  pid,
  is_scoring,
  contest_code,
  onSearchChangeName,
  setId,
  onSearchChangeFilter,
  placeHolder2,
  is_viewAll,
  time,
  setSearchField,
  handleSearchUser,
  setFilterSearch,
}) => {
  const orgName = getOrgName();
  const { contestId } = useParams();

  const arr = [
    {
      pathname: `CONTESTS`,
      path: `/org/${orgName}/contest`,
    },
    {
      pathname: 'RANK CURRENT PAGE',
      path: `/org/${orgName}/contest/${contestId}/${time}/${contest_code}/ranking`,
    },
  ];

  function isLast(index) {
    return index === arr.length - 1;
  }

  let contestStatus = true;

  const [Days, setDays] = useState();
  const [Minutes, setMinutes] = useState();
  const [Hours, setHours] = useState();
  const [Seconds, setSeconds] = useState();

  let interval;

  const now2 = new Date().getTime();

  var contest_going = true;

  if (time * 1000 <= now2) {
    contest_going = false;
  }

  const startTimer = () => {
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = time * 1000 - now;
      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    startTimer();
  });

  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e5e5',
          p: { xs: 2, md: '28px 16px' },
        }}
        // position="fixed"
        // top={{ xs: "56px", sm: "56px", lg: "0px" }}
        // zIndex="1"
        width="100%"
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          display="flex"
          alignItems={'flex-start'}
          flexDirection={'column'}
          justifyContent={'left'}
        >
          <>
            {is_viewAll && (
              <Box display="flex" alignItems={'center'} flexDirection={'row'}>
                <EmojiEventsOutlinedIcon
                  sx={{
                    mb: 0,
                    padding: 0,
                    fontSize: { xs: '16px', md: '20px' },
                    mr: 2,
                    mt: { xs: 1, md: 0 },
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: '700',
                    fontSize: { xs: '16px', md: '20px' },
                    mt: { xs: 1, md: 0 },
                  }}
                >
                  Organization Ranking
                </Typography>
              </Box>
            )}
            {is_viewAll !== true ? (
              <Box
                sx={{
                  maxWidth: 'fit-content',
                  bgcolor: '#FFF',
                  p: '4px 16px',
                  // borderRadius: "8px",
                  boxShadow: ' 1px 1px 4px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',

                  mt: { xs: 1, md: 0 },
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
                  CONTEST CODE
                </Typography>
                <Typography
                  ml={1}
                  variant="body1"
                  sx={{
                    fontWeight: '500',
                    color: '#000000',
                    textTransform: 'uppercase',
                    lineHeight: '18px',
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                    fontSize: { xs: '12px', lg: '14px' },
                  }}
                >
                  {contest_code}
                </Typography>
              </Box>
            ) : null}
            {is_scoring === true ? (
              <Box
                sx={{
                  maxWidth: 'fit-content',
                  bgcolor: '#FFF',
                  p: '4px 16px',
                  // borderRadius: "8px",
                  boxShadow: ' 1px 1px 4px rgba(0, 0, 0, 0.1)',
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
                  Problem
                </Typography>
                <Typography
                  ml={1}
                  variant="body1"
                  sx={{
                    fontWeight: '500',
                    color: '#000000',
                    textTransform: 'uppercase',
                    lineHeight: '18px',
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                    fontSize: { xs: '12px', lg: '14px' },
                  }}
                >
                  {pid}
                </Typography>
              </Box>
            ) : null}
            {is_scoring === false ? (
              <Box mt={2} mb={0} pb={0}>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="12px" />}
                  aria-label="breadcrumb"
                  sx={{
                    p: 0,
                    m: 0,
                    '& .css-1wuw8dw-MuiBreadcrumbs-separator': {
                      mx: { xs: '4px', md: '8px' },
                    },
                  }}
                >
                  {arr.map((a, ci) => {
                    const colour = isLast(ci) ? '#ffffff' : 'black';
                    const backColour = isLast(ci) ? 'black' : '';
                    return (
                      <Link underline="hover" color="inherit" href={a.path}>
                        <Button
                          size={'small'}
                          sx={{
                            textTransform: {
                              xs: 'capitalize',
                              md: 'uppercase',
                            },
                            boxShadow: 'none',
                            borderRadius: '8px',
                            fontSize: { xs: '10px', lg: '12px' },
                            backgroundColor: `${backColour}`,
                            color: `${colour}`,
                            '&:hover': {
                              backgroundColor: `${backColour}`,
                              color: `${colour}`,
                            },
                          }}
                          onClick={() => a.selected(a)}
                        >
                          {a.pathname}
                        </Button>
                      </Link>
                    );
                  })}
                </Breadcrumbs>
              </Box>
            ) : null}
          </>
        </Grid>
        {is_scoring === false && contest_going === true ? (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            display={{ xs: 'flex', sm: 'block', md: 'flex' }}
            alignItems={{ xs: 'center', md: 'center' }}
            flexDirection={{ xs: 'row', md: 'row' }}
            justifyContent={{ xs: 'left', sm: 'flex-end', md: 'flex-end' }}
            gap={{ xs: 1, sm: 1.5, md: 2 }}
            sx={{ mt: { xs: '12px', md: '0px' } }}
          >
            <Box
              display={{ xs: 'flex' }}
              sx={{
                justifyContent: { sm: 'flex-end', alignItems: 'center' },
                gap: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: '200',
                  color: 'grey',
                  display: '-webkit-box!important',
                  WebkitLineClamp: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                }}
              >
                Contest ends in:
              </Typography>
              <ClockRankingForMobile
                contestStatus={contestStatus}
                days={Days}
                mins={Minutes}
                hours={Hours}
                seconds={Seconds}
              />
            </Box>
            <ClockRanking
              contestStatus={contestStatus}
              days={Days}
              mins={Minutes}
              hours={Hours}
              seconds={Seconds}
            />
            {/* <Box
              sx={{
                display: { xs: 'none', sm: 'flex', md: 'none' },
                justifyContent: { sm: 'right' },
              }}
            >
              <SearchArea
                setSearchField={setSearchField}
                onSearchChange={onSearchChangeName}
                setId={setId}
                onSearchChangeFilter={onSearchChangeFilter}
                handleSearchUser={handleSearchUser}
                placeHolder2={placeHolder2}
                setFilterSearch={setFilterSearch}
              />
            </Box> */}
          </Grid>
        ) : null}
        {
          <Grid
            item
            // sx={{ display: { xs: 'block', sm: 'none', md: 'block' } }}
            xs={12}
            sm={12}
            md={12}
            mt={{ xs: 1.5, md: 2 }}
          >
            <SearchArea
              setSearchField={setSearchField}
              onSearchChange={onSearchChangeName}
              setId={setId}
              onSearchChangeFilter={onSearchChangeFilter}
              handleSearchUser={handleSearchUser}
              placeHolder2={placeHolder2}
              setFilterSearch={setFilterSearch}
            />
          </Grid>
        }
      </Grid>
    </>
  );
};

export default RankingNavbar;
