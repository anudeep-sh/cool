import React from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { TaskAPI } from '../../api/requests/tasks/taskAPI';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useParams } from 'react-router-dom';
import ViewProgressTaskHeader from '../../components/Task/View/ViewProgressTaskHeader';
import { useState } from 'react';
import TaskAssigneesList from '../../components/Task/utils/TaskAssigneesList';
import FilterTaskAssignee from '../../components/Task/utils/FilterTaskAssignee';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const TaskProgress = () => {
  const { id } = useParams();
  const drawerWidth = 200;
  const [taskData, setTaskData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [filterData, setfilterData] = useState(null);
  const [textData, setTextData] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setloading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(true);

  const getTaskData = async () => {
    try {
      const data = await TaskAPI.getTaskData(id, true);
      if (data) {
        setProgressData(data);
        setTaskData(data);
      }
      setloading(false);
    } catch (err) {}
  };

  useEffect(() => {
    getTaskData();
  }, []);

  const handleFilterChange = (data) => {
    setfilterData(data);
  };

  const handleTextSearch = (data) => {
    setTextData(data);
  };

  const queryParams = {
    sort: filterData?.value === 'High to Low' || filterData?.value === 'Z-A' ? 'desc' : 'asce',
    sortBy: filterData?.value === 'A-Z' || filterData?.value === 'Z-A' ? 'username' : 'progress',
    filterByProgressAbove: filterData?.range[0],
    filterByProgressBelow: filterData?.range[1],
    search: textData,
    submission: true,
  };

  const getFilteredData = async () => {
    try {
      const data = await TaskAPI.getTaskData(id, true, queryParams);
      if (data) setFilteredData(data);
      setFilterLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    if (filterData !== null || textData !== '') {
      getFilteredData();
    }
  }, [filterData, textData]);

  const handleDataChanges = (type) => {
    setfilterData((prevData) => {
      let newData = { ...prevData };

      if (type === 'value') {
        newData.value = '';
      } else if (type === 'userName') {
        newData.userName = '';
      }

      return newData;
    });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: 'white',
        height: '100vh',
      }}
    >
      <Stack
        spacing={2}
        sx={{
          width: '100',
        }}
      >
        <ViewProgressTaskHeader progressData={progressData} />
        <Stack spacing={2} direction="row">
          <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <FormatListBulletedIcon sx={{ color: 'grey' }} />
            <Typography variant="h6">Users</Typography>
            <>
              {filterData && (filterData.value || filterData.userName) && (
                <>
                  <Box sx={{ boxShadow: 5, borderRadius: '10px' }}>
                    {filterData.value && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ padding: '5px', color: 'grey' }}>
                          Progress: {filterData.value}
                        </Typography>
                        <IconButton
                          aria-label="remove"
                          size="small"
                          onClick={() => handleDataChanges('value')}
                        >
                          <CloseRoundedIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ boxShadow: 5, borderRadius: '10px' }}>
                    {filterData.userName && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ padding: '5px', color: 'grey' }}>
                          username: {filterData.userName}
                        </Typography>
                        <IconButton
                          aria-label="remove"
                          size="small"
                          onClick={() => handleDataChanges('userName')}
                        >
                          <CloseRoundedIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </>
              )}
            </>
          </Box>
        </Stack>
        <Stack direction={{ xs: 'column-reverse', md: 'row' }} spacing={2}>
          <Stack sx={{ width: { xs: '100%', md: '70%' }, height: '100%' }}>
            <TaskAssigneesList
              userData={progressData}
              filteredData={filteredData}
              loading={loading}
              filterLoading={filterLoading}
            />
          </Stack>
          <Stack sx={{ width: { xs: '100%', md: '50%' }, height: '100%' }}>
            <FilterTaskAssignee onApplyChanges={handleFilterChange} onSearch={handleTextSearch} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TaskProgress;
