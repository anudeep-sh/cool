import { Button } from '@mui/material';

import { TaskAPI } from '../../../api/requests/tasks/taskAPI';
import { handleAlert } from '../../../utils/handleAlert';

const ButtonAddAssignees = ({
  userIdentifierType,
  assignees,
  subtaskId,
  setInvalidIdentifiers,
  setInput,
  onSuccessAssignment,
}) => {
  const handleSave = async () => {
    try {
      setInput('');
      if (subtaskId) {
        const body = {
          subtaskIds: [subtaskId],
          userIdentifierType: userIdentifierType,
          userIdentifiers: assignees.map((user) => user?.identifier),
        };
        const res = await TaskAPI.assignTask(body);
        if (res !== 'OK') {
          setInvalidIdentifiers(res?.invalidData);
          handleAlert('The highlighted users do not belong to this organization', 'error');
        } else {
          handleAlert('Subtask Assigned Successfully', 'success');
          onSuccessAssignment();
        }
      } else {
        const id = window.location.href.split('/')[window.location.href.split('/').length - 1];
        const body = {
          taskId: [id],
          userIdentifierType: userIdentifierType,
          userIdentifiers: assignees.map((user) => user?.identifier),
        };
        const res = await TaskAPI.assignTask(body);
        if (res !== 'OK') {
          setInvalidIdentifiers(res?.invalidData);
          handleAlert('The highlighted users do not belong to this organization', 'error');
        } else {
          handleAlert('Task Assigned Successfully', 'success');
          onSuccessAssignment();
        }
      }
    } catch (err) {
      handleAlert('Failed to Assign Task', 'error');
    }
  };

  return (
    <Button
      sx={{
        width: { xs: '40%', sm: '15%' },
      }}
      disabled={!assignees?.length > 0}
      variant="contained"
      disableRipple
      onClick={handleSave}
    >
      Assign
    </Button>
  );
};

export default ButtonAddAssignees;
