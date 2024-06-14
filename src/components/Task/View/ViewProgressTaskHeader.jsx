import React from 'react';
import { Stack, List, ListItem, Typography, CircularProgress } from '@mui/material';
import UtilFunctions from '../utils/UtilFunctions';
import LinearProgressWithoutLabelReusable from '../../LinearProgress/LinearProgressWithoutLableReusable';

const ViewProgressTaskHeader = ({ progressData }) => {
  const listItems = [
    {
      title: 'Created By',
      value: progressData?.creator?.username,
    },
    {
      title: 'Due Date',
      value: progressData?.taskDetails?.startsAt ? (
        UtilFunctions.parseEpochDate(
          progressData?.taskDetails?.startsAt + progressData?.taskDetails?.duration
        )
      ) : (
        <CircularProgress size={12} />
      ),
    },
    {
      title: 'Progress',
      progress: progressData && progressData?.overAllProgress,
    },
  ];

  return (
    <>
      <Stack spacing={1}>
        <Typography sx={{ fontSize: '1.8rem' }} variant="h4">
          {progressData?.taskDetails?.title}
        </Typography>

        <List>
          {listItems.map((item) => (
            <ListItem
              key={item.title}
              sx={{
                display: item.display ? item.display : 'flex',
                height: '45px',
                px: 0,
              }}
            >
              <Typography sx={{ color: 'grey', width: { xs: '120px' } }}>{item.title}</Typography>
              {item.title !== 'Progress' ? (
                !item.value || item.value === 'NaN undefined NaN' ? (
                  <CircularProgress size={12} />
                ) : (
                  <Typography>{item.value}</Typography>
                )
              ) : (
                <></>
              )}

              {item.title === 'Progress' && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <LinearProgressWithoutLabelReusable
                    displayTitle="none"
                    color="primary"
                    progressCount={item.progress ? item.progress : 0}
                  />
                  <Typography sx={{ fontSize: '16px' }}>
                    {item.progress ? `${Math.round(item.progress)}` : 0} %
                  </Typography>
                </Stack>
              )}
            </ListItem>
          ))}
        </List>

        <Stack spacing={1}>
          <Typography variant="h6">Description</Typography>
          <Typography sx={{ color: 'grey' }}>{progressData?.taskDetails?.description}</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default ViewProgressTaskHeader;
