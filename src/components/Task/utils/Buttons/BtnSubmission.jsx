import { Box, Button } from '@mui/material';

import { TaskAPI } from '../../../../api/requests/tasks/taskAPI';
import { handleAlert } from '../../../../utils/handleAlert';

const BtnSubmission = ({
  subtaskId,
  setOpen,
  fileUrl,
  setUplaoding,
  setUploadCancelled,
  cancelLoading,
}) => {
  
  const handleSubmit = async () => {
    try {
      setUplaoding(true);
      await TaskAPI.submitSubtask(subtaskId, { fileUrl });
      handleAlert('File Submitted Successfully', 'success');
      setOpen(false);
      setUplaoding(false);
    } catch {
      handleAlert('There was some error submitting file', 'error');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Button
        size="small"
        disabled={fileUrl ? false : true}
        sx={{ maxWidth: 'fit-content', minWidth: 'fit-content', px: 2 }}
        variant="contained"
        onClick={cancelLoading ? setUploadCancelled(true) : handleSubmit}
      >
        {cancelLoading ? 'Cancel Submission' : 'Submit'}
      </Button>
    </Box>
  );
};

export default BtnSubmission;
