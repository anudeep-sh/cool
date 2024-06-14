import { Box, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import ViewTaskHeader from '../../components/Task/View/ViewTaskHeader';
import TaskStatusTabs from '../../components/Task/utils/TaskTabs/TaskStatusTabs';
import { TaskAPI } from '../../api/requests/tasks/taskAPI';
import SubtasksTab from '../../components/Task/utils/Subtask/SubtasksTab';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GetValidatedTokenData from '../../utils/helper';
import { useParams } from 'react-router-dom';
import getRoleForOrganization from '../../utils/GetUserRoleInOrganization';

const ViewTask = () => {
  const [role, setRole] = useState(null);
  const { id } = useParams();
  const [currentTask, setCurrentTask] = useState();
  const [subTasksData, setSubTasksData] = useState([]);
  const [progressData, setProgressData] = useState();
  const drawerWidth = 200;
  const decoded = GetValidatedTokenData();
  const [loading, setLoading] = useState(true);
  const setSubtasks = async () => {
    try {
      const data = await TaskAPI.getTaskData(id, false, { submission: true });
      setRole(data.taskDetails.userId === decoded.id ? 'ADMIN' : null);
      setCurrentTask(data);
      setSubTasksData(data?.subTaskDetails);
      setLoading(false);
    } catch (err) {}
  };

  const getTaskProgress = async (taskId, userId) => {
    try {
      const data = await TaskAPI.getTaskProgress(taskId, userId);
      const status =
        data?.overAllProgress === null || data?.overAllProgress === 0
          ? 'Not Started'
          : data?.overAllProgress === 100
          ? 'Completed'
          : 'In Progress';
      setProgressData({ ...data, status });
    } catch (err) {}
  };

  useEffect(() => {
    const userId = decoded?.id;
    setSubtasks();
    userId && getTaskProgress(id, userId);
  }, []);

  return (
    <>
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
          spacing={2.5}
          sx={{
            width:
              role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR'
                ? { xs: '100%', lg: '80%', xl: '70%' }
                : '100%',
          }}
        >
          <ViewTaskHeader
            role={role}
            getTaskProgress={getTaskProgress}
            progressData={progressData}
            currentTask={currentTask}
          />
          {role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR' ? (
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <FormatListBulletedIcon sx={{ color: 'grey' }} />
                <Typography variant="h6">Subtasks</Typography>
              </Box>
              <SubtasksTab
                loading={loading}
                isParentTask={true}
                viewMode={true}
                subTasks={subTasksData}
                progressData={progressData}
              />
            </Stack>
          ) : (
            <TaskStatusTabs
              role={role}
              isParentTask={false}
              currentTask={currentTask}
              progressData={progressData}
              getTaskProgress={getTaskProgress}
              id={id}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default ViewTask;
