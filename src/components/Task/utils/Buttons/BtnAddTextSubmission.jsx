import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { TaskAPI } from '../../../../api/requests/tasks/taskAPI';

import { handleAlert } from '../../../../utils/handleAlert';

const BtnAddTextSubmission = ({ textValue, subtaskId, onCloseTab, onTextSubmitted }) => {
  const [open, setOpen] = useState(true);
  

  const handleSubmit = async () => {
    const body = { submission: textValue };

    try {
      await TaskAPI.submitSubtask(subtaskId, body);
      handleAlert('Text Submitted Successfully', 'success');
      setOpen(false);
      onCloseTab();
      onTextSubmitted();
    } catch {
      handleAlert('There was some error submitting the text', 'error');
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
        sx={{ maxWidth: 'fit-content', minWidth: 'fit-content', px: 2 }}
        variant="contained"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default BtnAddTextSubmission;
