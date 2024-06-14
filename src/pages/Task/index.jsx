import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import TaskStatusTabs from '../../components/Task/utils/TaskTabs/TaskStatusTabs';
import { TaskAPI } from '../../api/requests/tasks/taskAPI';
import getRoleForOrganization from '../../utils/GetUserRoleInOrganization';

const Task = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      const userRole = await getRoleForOrganization();
      setRole(userRole);
    };
    getUserRole();
  }, []);
  const [loading, setLoading] = useState(true);
  const drawerWidth = 200;
  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const data =
          (role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR')
            ? await TaskAPI.getCreatedTasks(1)
            : await TaskAPI.getAssignedTasks();

        setLoading(false);
      } catch (err) {}
    };
    getAllTasks();
  }, []);

  return (
    <Stack
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: '#FAFBFB',
        minHeight: '100vh',
        p: 2,
      }}
    >
      <Stack spacing={1} sx={{ textAlign: 'start', width: '100%' }}>
        <Typography variant="h5">Tasks</Typography>
        <Typography sx={{ color: 'grey' }} variant="subtitle1">
          Find all your Assigned Tasks
        </Typography>
      </Stack>
      <TaskStatusTabs loading={loading} isParentTask={true} role={role} />
    </Stack>
  );
};

export default Task;
