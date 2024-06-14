import { Stack, Typography } from '@mui/material';
import SelectSubtask from './SelectSubtask';
import { useState } from 'react';
import SubtaskType from './SubTaskType';

const AddSubTask = () => {
  const [type, setType] = useState('');
  const [selectedSections, setSelectedSections] = useState([]);

  return (
    <Stack spacing={3} sx={{ height: '100%' }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="subtitle1">Choose the subtask type :</Typography>
        <SelectSubtask type={type} setType={setType} />
      </Stack>
      {type.length > 0 && (
        <SubtaskType
          setSelectedSections={setSelectedSections}
          selectedSections={selectedSections}
          type={type}
        />
      )}
    </Stack>
  );
};

export default AddSubTask;
