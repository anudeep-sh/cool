import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import TabComponent from '../../components/Tab';
import EditContestCard from '../../components/Admin/Components/EditContestCard';
import { contestAPI } from '../../api/requests/contests/contestAPI';
import TabPagination from '../../components/Tab/TabPagination';
import SearchBar from '../../components/SearchBar';

const AllContest = () => {
  const drawerWidth = 210;
  const tabs = {
    UPCOMING: 'UPCOMING',
    ONGOING: 'ONGOING',
    COMPLETED: 'COMPLETED',
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState('UPCOMING');
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [statusCount, setStatusCount] = useState({});
  const [searchValue, setSearchValue] = useState('');

  const fetchData = (searchValue, activeTab, page) => {
    setLoader(true);

    contestAPI
      .getUserContests(searchValue, activeTab, page)
      .then((data) => {
        setFilteredData(data?.contests);
        setStatusCount(data?.statusCounts);
        setMaxPage(data?.totalPages);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    fetchData(searchValue, activeTab, page);
  }, [searchValue, activeTab, page]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        p: 2,
      }}
    >
      <Stack spacing={1} sx={{ textAlign: 'start', width: '100%' }}>
        <Typography variant="h5">Contest</Typography>
        <Typography sx={{ color: 'grey' }} variant="subtitle1">
          Find all your Created Contests
        </Typography>
      </Stack>
      <TabComponent
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setPage={setPage}
        navigateToLink={'/admin/contest'}
        statusCount={statusCount}
        setSearchValue={setSearchValue}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: { xs: '0 0px 20px 0px', md: '0 16px 20px 16px' },
        }}
      >
        <SearchBar setSearchValue={setSearchValue} />
      </Box>
      <Grid container spacing={2} sx={{ ml: 1, pd: '20px' }}>
        {loader ? (
          <Box
            width="100%"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}
          >
            <CircularProgress />
          </Box>
        ) : (
          filteredData?.map((contest) => (
            <Grid item xs={10} sm={8} md={5} lg={3.85} key={contest.id}>
              <Item>
                <EditContestCard Contest={contest} tab={activeTab} />
              </Item>
            </Grid>
          ))
        )}
      </Grid>
      <TabPagination page={page} setPage={setPage} maxPage={maxPage} />
    </Box>
  );
};

export default AllContest;
