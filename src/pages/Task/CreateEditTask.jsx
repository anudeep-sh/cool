import { Stack, Typography } from '@mui/material';
import TaskHeader from '../../components/Task/utils/TaskHeader';
import TaskSubTabs from '../../components/Task/CreateAndEdit/TaskSubTabs';
import { useState, useEffect } from 'react';
import { TaskAPI } from '../../api/requests/tasks/taskAPI';
import { useParams } from 'react-router-dom';
import UtilFunctions from '../../components/Task/utils/UtilFunctions';
import Skeleton from '@mui/material/Skeleton';
import SideBarResponsive from '../../components/SideBarResponsive';
import { getDuration } from '../../utils/getDuration';

const CreateEditTask = () => {
  const drawerWidth = 200;
  const { id } = useParams();
  const [taskData, setTaskData] = useState([]);
  const [subTaskData, setSubTaskData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTaskData = async () => {
      try {
        const data = await TaskAPI.getTaskData(id);
        setTaskData(data?.taskDetails);
        setSubTaskData(data?.subTaskDetails);
        setLoading(false);
      } catch (err) {}
    };
    getTaskData();
  }, []);

  return (
    <>
      <SideBarResponsive />
      <Stack
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: '#fff',
          minHeight: '100vh',
          p: 2,
        }}
      >
        <Stack sx={{ width: { xs: '100%', lg: '85%', xl: '70%' } }}>
          <TaskHeader
            title={
              !taskData?.title ? (
                <Skeleton variant="rectangular" width={150} height={25} />
              ) : (
                taskData?.title
              )
            }
            subtitle={
              taskData.length === 0 ? (
                <Skeleton variant="rectangular" width={150} height={50} />
              ) : (
                taskData?.description
              )
            }
          />
          <Stack
            mt={2}
            sx={{ gap: '8px' }}
            direction={{ md: 'row' }}
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2">Duration : </Typography>
              {!taskData.duration ? (
                <Skeleton variant="rectangular" width={150} height={25} />
              ) : (
                <Typography variant="body2" sx={{ color: 'grey' }}>
                  {getDuration(taskData).day > 1
                    ? `${getDuration(taskData).day.toFixed(2)} days `
                    : getDuration(taskData).day === 1
                    ? `${getDuration(taskData).day.toFixed(2)} day `
                    : ''}
                  {getDuration(taskData).hour > 1
                    ? `${getDuration(taskData).hour.toFixed(2)} hours `
                    : getDuration(taskData).hour === 1
                    ? `${getDuration(taskData).hour.toFixed(2)} hour `
                    : ''}
                  {getDuration(taskData).minute > 1
                    ? `${getDuration(taskData).minute.toFixed(2)} minutes `
                    : getDuration(taskData).minute === 1
                    ? `${getDuration(taskData).minute.toFixed(2)} minute `
                    : ''}
                  {/* {UtilFunctions.convertDuration(taskData?.duration)}{' '}
                  {taskData?.duration === 86400
                    ? 'day'
                    : taskData?.duration > 86400
                    ? 'days'
                    : taskData?.duration === 3600
                    ? 'hour'
                    : taskData?.duration > 3600
                    ? 'hours'
                    : taskData?.duration > 60
                    ? 'minutes'
                    : 'minute'} */}
                </Typography>
              )}
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2">Starts At : </Typography>
              {!taskData.startsAt ? (
                <Skeleton variant="rectangular" width={150} height={25} />
              ) : (
                <Typography variant="body2" sx={{ color: 'grey' }}>
                  {UtilFunctions.parseEpochTime(taskData?.startsAt)} (
                  {UtilFunctions.parseEpochDate(taskData?.startsAt)})
                </Typography>
              )}
            </Stack>
          </Stack>
          <TaskSubTabs loading={loading} taskData={taskData} subTaskData={subTaskData} />
        </Stack>
      </Stack>
    </>
  );
};

export default CreateEditTask;
