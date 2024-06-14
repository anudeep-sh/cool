import RotateRightIcon from '@mui/icons-material/RotateRight';
import { Stack, List, ListItem, Typography, CircularProgress } from '@mui/material';
import LinearProgressWithLabelReusable from '../../LinearProgress/LinearProgressWithLabelReusable';
import SelectAssignee from './SelectAssignee';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import UtilFunctions from '../utils/UtilFunctions';
import GetValidatedTokenData from '../../../utils/helper';
import { useLocation } from 'react-router-dom';

const ViewTaskHeader = ({ getTaskProgress, role, progressData, currentTask }) => {
  let assigneeId = null;
  if (role !== 'ADMIN' || role !== 'SUPERADMIN' || role !== 'CREATOR') {
    assigneeId = GetValidatedTokenData().id;
  }
  const { pathname } = useLocation();
  const userId = pathname.split('/')[pathname.split('/').length - 1];
  const listItems = [
    {
      title: 'Created By',
      value: currentTask?.creator && currentTask?.creator[0]?.username,
      display: !role && 'none',
    },

    {
      title: 'Assignee',
      select: <SelectAssignee getTaskProgress={getTaskProgress} userId={userId} />,
      display: !role && 'none',
    },

    {
      title: 'Due Date',
      value: UtilFunctions.parseEpochDate(
        currentTask && currentTask?.taskDetails?.startsAt + currentTask?.taskDetails?.duration
      ),
    },

    {
      title: 'Status',
      value: progressData?.status,
      icon:
        progressData?.status === 'In Progress' ? (
          <RotateRightIcon sx={{ fontSize: '16px' }} />
        ) : progressData?.status === 'Completed' ? (
          <DoneOutlineIcon sx={{ fontSize: '16px' }} />
        ) : (
          <NotInterestedIcon sx={{ fontSize: '16px' }} />
        ),
      display: (role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR') && !assigneeId && 'none',
    },

    {
      title: 'Progress',
      progress: progressData?.overAllProgress,
      display: (role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR') && !assigneeId && 'none',
    },
  ];
  return (
    <Stack spacing={1.5}>
      <Typography sx={{ fontSize: '1.8rem' }} variant="h4">
        {currentTask?.taskDetails?.title}
      </Typography>

      <List>
        {listItems.map((item) => (
          <ListItem
            sx={{
              display: item.display ? item.display : 'flex',
              py: 1,
              height: '45px',
              px: 0,
            }}
          >
            <Typography sx={{ color: 'grey', width: { xs: '120px' } }}>{item.title}</Typography>

            {item.icon ? (
              <Stack
                alignItems="center"
                sx={{
                  color:
                    item.value === 'In Progress'
                      ? '#ffb74d'
                      : item.value === 'Completed'
                      ? '#66bb6a'
                      : '#9e9e9e',
                  bgcolor:
                    item.value === 'In Progress'
                      ? '#fff3e0'
                      : item.value === 'Completed'
                      ? '#e8f5e9'
                      : '#f5f5f5',
                  py: 0.2,
                  px: 1,
                  pr: 1.1,
                  borderRadius: '4px',
                }}
                direction="row"
                spacing={1}
              >
                {item.icon}
                <Typography>{item.value}</Typography>
              </Stack>
            ) : (
              <>
                {item.title !== 'Assignee' &&
                item.title !== 'Progress' &&
                (!item.value || item.value === 'NaN undefined NaN') ? (
                  <CircularProgress size={12} />
                ) : (
                  <Typography>{item.value}</Typography>
                )}
              </>
            )}

            {item.title === 'Progress' && (
              <LinearProgressWithLabelReusable
                displayTitle="none"
                progressCount={item.progress ? item.progress : 0}
                display="block"
              />
            )}

            {(role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR') && <>{item.select && item.select}</>}
          </ListItem>
        ))}
      </List>

      <Stack spacing={1}>
        <Typography variant="h6">Description</Typography>
        <Typography sx={{ color: 'grey' }}>{currentTask?.taskDetails?.description}</Typography>
      </Stack>
    </Stack>
  );
};

export default ViewTaskHeader;
