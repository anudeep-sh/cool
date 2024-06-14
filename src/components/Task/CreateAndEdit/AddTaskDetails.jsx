import TaskForm from '../utils/TaskForm/TaskForm';
import { Stack, Divider, Button } from '@mui/material';
import TaskHeader from '../utils/TaskHeader';
import { useState } from 'react';
import AddSubTask from './AddSubTask';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const AddTaskDetails = ({ setOpen, editMode, isParentTask, taskData, subtask, taskTitle }) => {
  const [active, setActive] = useState('taskForm');
  const title = isParentTask
    ? editMode
      ? 'Edit Task'
      : 'Create Task'
    : editMode
    ? 'Edit Subtask'
    : 'Create Subtask';
  const subtitle = isParentTask
    ? editMode
      ? 'Edit the details of the task'
      : 'Assign new task to the participants here'
    : editMode
    ? 'Edit the subtask details for current task'
    : 'Add subtask details for the current task';
    // <span dangerouslySetInnerHTML={{__html: `Edit the details for <strong>${subtask?.title}</strong>`}} />
    // : <span dangerouslySetInnerHTML={{__html: `Subtask details for <strong>${taskTitle}</strong>`}} />;

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <TaskHeader title={title} subtitle={subtitle} />
        <CloseOutlinedIcon
          onClick={() => setOpen(false)}
          sx={{ color: 'grey', cursor: 'pointer' }}
        />
      </Stack>
      <Divider />
      {active === 'taskForm' && (
        <TaskForm
          editMode={editMode}
          isParentTask={isParentTask}
          taskData={taskData}
          subtaskData={subtask}
          setOpen={setOpen}
        />
      )}
      {active === 'subtaskDetails' && (
        <>
          <AddSubTask />
          <Stack mt={5} alignItems="flex-end">
            <Stack direction="row" spacing={1}>
              <Button onClick={() => setActive('taskForm')} variant="outlined" disableRipple>
                Back
              </Button>
              <Button type="submit" variant="contained" disableRipple>
                Submit
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default AddTaskDetails;
