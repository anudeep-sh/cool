import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import TaskStatusTabs from '../../components/Task/utils/TaskTabs/TaskStatusTabs';
import { TaskAPI } from '../../api/requests/tasks/taskAPI';
import getRoleForOrganization from '../../utils/GetUserRoleInOrganization';
import { getOrgName } from '../../utils/appendOrgQuery';

const CreatedTasks = () => {
  const orgName = getOrgName();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [createdTasks, setCreatedTasks] = useState([]);
  const drawerWidth = 200;
  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const data = await TaskAPI.getCreatedTasks(1);
        const userRole = await getRoleForOrganization();
        setRole(userRole);
        const orgTasks = data.filter((task) => task?.orgData[0]?.name === orgName);
        setCreatedTasks(orgTasks);
        // setCreatedTasks(data);
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
          Find all your Created Tasks
        </Typography>
      </Stack>
      <TaskStatusTabs loading={loading} isParentTask={true} role={role} tasks={createdTasks} />
    </Stack>
  );
};

export default CreatedTasks; 
