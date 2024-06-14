import React, { useState } from 'react';
import { Stack, Tab, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import NumberBadge from '../NumberBadge';
import ButtonAddNew from '../../CreateAndEdit/ButtonAddNew';
import TaskTabContent from './TaskTabContent';

const TaskStatusTabs = ({ loading, isParentTask, role, tasks, currentTask, progressData, getTaskProgress, id }) => {
  const url = window.location.pathname.split('/');
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: `Ongoing`,
      value: '1',
      count: isParentTask ? tasks?.length : currentTask?.subTasks?.length,
      tasks: isParentTask ? tasks : currentTask?.subTasks,
      disabled: false,
    },

    {
      label: `Older ${isParentTask ? 'Tasks' : 'Subtasks'}`,
      value: '2',
      count: 0,
      disabled: true,
    },
  ];

  return (
    <TabContext value={value}> 
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          p: 0,
          bgcolor: '#FAFBFB',
        }}
      >
        <Stack
          sx={{
            bgcolor: '#fff',
            boxShadow: 3,
            borderRadius: '10px',
            my: 1,
            px: 1,
            py: 0,
          }}
          flexDirection="row"
          justifyContent="space-between"
        >
          <TabList
            variant="scrollable"
            TabIndicatorProps={{
              sx: { height: '2.5px', borderRadius: '4px' },
            }}
            sx={{
              height: '65px',
              '& button': { color: 'grey', opacity: '65%', py: 0 },
              '& button.Mui-selected': {
                color: '#698AFF',
                opacity: '100%',
              },
              maxWidth: 'calc(100% - 150px)',
              whiteSpace: 'nowrap',
            }}
            onChange={handleChange}
          >
            {tabs.map((tab) => (
              <Tab
                icon={<NumberBadge num={tab.count} isActive={value === tab.value} />}
                iconPosition="end"
                disableRipple
                label={tab.label}
                value={tab.value}
                disabled={tab.disabled}
              />
            ))}
          </TabList>
          {url[url.length - 1] !== 'assigned' && (
            <Box
              sx={{
                display: (role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR') ? 'flex' : 'none',
                alignItems: 'center',
                width: 'auto',
                justifyContent: 'right',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              <ButtonAddNew width="150px" display="flex" isParentTask={isParentTask} />
            </Box>
          )}
        </Stack>
      </Box>
      {tabs.map((item, i) => (
        <TabPanel sx={{ pt: 1, px: { xs: 0, md: 1 } }} value={(i + 1).toString()} key={i}>
          <TaskTabContent
            isParentTask={isParentTask}
            tasks={tasks}
            role={role}
            loading={loading}
            subtasks={currentTask?.subTaskDetails}
            progressData={progressData}
            getTaskProgress={getTaskProgress}
            id={id}
          />
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default TaskStatusTabs;
