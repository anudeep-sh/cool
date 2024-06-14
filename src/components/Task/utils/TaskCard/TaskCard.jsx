import { Stack, Divider } from '@mui/material';
import CardContent from './CardContent';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';
import { useNavigate } from 'react-router-dom';
import { getOrgName } from '../../../../utils/appendOrgQuery';

const TaskCard = ({
  task,
  isParentTask,
  subtaskCount,
  role,
  progressData,
  getTaskProgress,
  id,
}) => {
  const navigate = useNavigate();
  const orgName = getOrgName();
  const handleNavigate = () => {
    if (isParentTask && !role) {
      navigate(`/org/${orgName}/task/${task.id}`);
    }
  };
  return (
    <Stack
      onClick={handleNavigate}
      spacing={2.2}
      sx={{
        bgcolor: '#fff',
        boxShadow: 3,
        borderRadius: '10px',
        padding: 3,
        margin: 2,
        height: '100%',
        cursor: !role && isParentTask && 'pointer',
      }}
    >
      <CardHeader role={role} isParentTask={isParentTask} task={task} />
      <CardContent
        isParentTask={isParentTask}
        task={task}
        subtaskCount={subtaskCount}
        progressData={progressData}
        orgName={orgName}
        getTaskProgress={getTaskProgress}
        id={id}
      />
      <Divider />
      <CardFooter isParentTask={isParentTask} task={task} />
    </Stack>
  );
};

export default TaskCard;
