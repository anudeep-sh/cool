import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, MenuItem, Select } from '@mui/material';
import 'react-multi-carousel/lib/styles.css';
import ContestCardSetting from '../../components/Admin/Components/ContestCardSetting';
import { contestAPI } from '../../api/requests/contests/contestAPI';

const tabs = {
  UPCOMING: 'UPCOMING',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
};

const SettingsContestComponent = () => {
  const [value, setValue] = useState(tabs.UPCOMING);
  const [filteredData, setFilteredData] = useState([]);
  const [tab, setTab] = useState(tabs.UPCOMING);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [tabCount, setTabCount] = useState(0);
  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
    setTab(tabs[e.target.value]);
    setPage(1);
  };

  const [loader, setLoader] = useState(false);
  const fetchData = (tab, page) => {
    contestAPI.getUserContests(tab, page).then((data) => {
      setFilteredData(data?.contests);
      setMaxPage(data?.totalPages);
      setTabCount(data?.contests?.length);
    });
  };
  useEffect(() => {
    setLoader(true);
    fetchData(tab, page);
    setLoader(false);
  }, [tab, page]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#F7F7F7',
          borderRadius: '15px',
          filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
          padding: '10px',
          p: '12px',
          overflow: 'scroll',
        }}
        style={{
          width: '100%',
          overflowX: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box>
            <Typography
              variant="h5"
              sx={{
                mt: 1,
                display: '-webkit-box!important',
                // WebkitLineClamp: 1,
                // overflow: 'hidden',
                // textOverflow: 'ellipsis',
                WebkitBoxOrient: ' vertical',
              }}
            >
              Contest created
            </Typography>
          </Box>
          <Box>
            <Select value={value} onChange={handleChange}>
              {Object.entries(tabs).map(([key, label]) => (
                <MenuItem key={key} value={label}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box overflowX="auto" display="inline-flex">
          {loader ? (
            <Box sx={{ display: 'flex' }} className="mainSkeletonContainer">
              <CircularProgress />
            </Box>
          ) : filteredData ? (
            filteredData?.map((item) => <ContestCardSetting Contest={item} tab={tab} />)
          ) : (
            <Typography>No contests available</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SettingsContestComponent;
