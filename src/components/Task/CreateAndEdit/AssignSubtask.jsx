import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TaskModal from '../utils/TaskModal';
import AssignASubtask from './AssignOneSubtask';

const ButtonAssignOneSubtask = ({ props }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Button
        variant="outlined"
        sx={{ textTransform: 'none !important', margin:'0 8px'}}
        size="small"
        endIcon={<ChevronRightIcon />}
        onClick={() => handleOpen()}
      >
        Assign
      </Button>
      <TaskModal open={open} setOpen={setOpen}>
        <AssignASubtask setOpen={setOpen} title={props?.title} subtaskId={props?.id}/>
      </TaskModal>
    </>
  );
};

export default ButtonAssignOneSubtask;
