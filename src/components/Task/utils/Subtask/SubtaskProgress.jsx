import { Stack, Typography } from '@mui/material';
import CircularProgressWithLabelReusable from '../../../CircularProgress/CircularProgressWithLabelReusable';
import UtilFunctions from '../UtilFunctions';

const SubtaskProgress = ({ subtaskId, taskProgress }) => {
  const progress = UtilFunctions.getSubtaskProgress(subtaskId, taskProgress);
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography color="text.secondary" sx={{ fontSize: '12.8px' }} variant="body1">
        Progress :
      </Typography>
      {progress ? (
        <CircularProgressWithLabelReusable progressCount={progress?.completionPercentage} />
      ) : (
        <CircularProgressWithLabelReusable progressCount={0} />
      )}
    </Stack>
  );
};

export default SubtaskProgress;
