import { Stack, Box } from '@mui/material';
import TaskHeader from '../TaskHeader';
import ButtonAddNew from '../../CreateAndEdit/ButtonAddNew';
import SubtaskList from './SubtaskList';
import { CircularProgress } from '@mui/material';
import ButtonAssignAll from '../../CreateAndEdit/ButtonAssignAll';
const SubtasksTab = ({ loading, isParentTask, viewMode, subTasks, progressData, taskTitle }) => {
  const typeColors = {
    course: {
      color: '#ba68c8',
      border: '#f3e5f5',
    },
    contest: {
      color: '#ffc107',
      border: '#ffecb3',
    },
    text: {
      color: '#f06292',
      border: '#fce4ec',
    },
  };

  if (loading) {
    return (
      <Stack sx={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Stack>
    );
  }
  return (
    <Stack spacing={{ xs: 2, md: 2.5 }}>
      {!viewMode && (
        <Stack
          mb={2}
          direction={{ xs: 'column-reverse', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ md: 'center' }}
          sx={{
            paddingTop: '5px',
            paddingBottom: '5px',
            gap:0.5,
          }}
        >
          <Box sx={{ display: { md: 'block' } }}>
            <TaskHeader subtitle="Here is a list of all the subtasks you've created" />
          </Box>
          <Box sx={{ display: 'flex', gap:1}}>
            <ButtonAssignAll display={'flex'} isParentTask={isParentTask} />
            <ButtonAddNew display="flex" isParentTask={isParentTask} taskTitle={taskTitle} />
          </Box>
        </Stack>
      )}
      <SubtaskList
        isParentTask={isParentTask}
        subTasksData={subTasks}
        typeColors={typeColors}
        viewMode={viewMode}
        progressData={progressData}
      />
    </Stack>
  );
};

export default SubtasksTab;
