import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import TaskModal from '../utils/TaskModal';
import AssignAll from './AssignAll';

const ButtonAssignAll = ({ isParentTask, display }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        display: display,
        marginRight: '8px',
        alignItems: 'center',
        width: { xs: '100%', md: 'auto' },
      }}
    >
      <Button
        disableRipple
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ width: '100%' }}
      >
        Assign all
      </Button>
      <TaskModal open={open} setOpen={setOpen}>
        <AssignAll setOpen={setOpen} />
      </TaskModal>
    </Box>
  );
};

export default ButtonAssignAll;
