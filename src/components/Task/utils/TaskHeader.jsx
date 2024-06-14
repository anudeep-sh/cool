import { Stack, Typography } from '@mui/material';

const TaskHeader = ({ title, subtitle }) => {
  return (
    <Stack direction="row">
      <Stack>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle1" sx={{ color: 'grey' }}>
          {subtitle}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default TaskHeader;
