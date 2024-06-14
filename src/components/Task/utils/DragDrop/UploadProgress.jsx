import { Stack, Typography } from '@mui/material';
import CircularProgressWithLabelReusable from '../../../CircularProgress/CircularProgressWithLabelReusable';

const UploadProgress = ({ progress }) => {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={1}>
      <Typography variant="body1" sx={{ color: 'grey' }}>
        Uploading File
      </Typography>
      <CircularProgressWithLabelReusable progressCount={progress} />
    </Stack>
  );
};

export default UploadProgress;
