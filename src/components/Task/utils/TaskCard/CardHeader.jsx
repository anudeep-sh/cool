import { Stack, Typography } from '@mui/material';
import TaskMenu from '../TaskMenu';

const CardHeader = ({ task, isParentTask, role }) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h6">{task?.title}</Typography>
      {isParentTask && (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {(role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR') && (
            <TaskMenu task={task} isParentTask={isParentTask} />
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default CardHeader;
