import { Stack, Divider } from '@mui/material';
import TaskHeader from '../utils/TaskHeader';
import { useState } from 'react';
import AssigneesTab from './AssigneesTab';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const AssignAll = ({ setOpen }) => {
  const [subTaskAssignees, setSubTaskAssignees] = useState([]);
  const [userIdentifierType, setUserIdentifierType] = useState('username');
  const title = 'Assign all subtasks to users at once';
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Stack spacing={2} sx={{ height: '100%' }}>
      <Stack direction="row" justifyContent="space-between">
        <TaskHeader title={title} />
        <CloseOutlinedIcon
          onClick={() => setOpen(false)}
          sx={{ color: 'grey', cursor: 'pointer' }}
        />
      </Stack>
      <Divider />
      <AssigneesTab
        userIdentifierType={userIdentifierType}
        setUserIdentifierType={setUserIdentifierType}
        isSaved={true}
        subTaskAssignees={subTaskAssignees}
        setSubTaskAssignees={setSubTaskAssignees}
        handleClose={handleClose}
      />
    </Stack>
  );
};

export default AssignAll;
