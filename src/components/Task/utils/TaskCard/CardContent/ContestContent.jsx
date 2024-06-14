import { Stack, Box, Typography } from '@mui/material';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import SubtaskProgress from '../../Subtask/SubtaskProgress';

const ContestContent = ({ task, taskProgress }) => {
  return (
    <Stack direction="row" alignItems="flex-start" spacing={2}>
      <ComputerOutlinedIcon sx={{ color: '#698Aff', mt: 0.3 }} />

      <Stack sx={{ width: '100%' }} spacing={0.5}>
        <Typography color="text.secondary" variant="body1">
          {task?.info?.title}
        </Typography>
        <Stack
          sx={{ width: '100%', flexWrap: 'wrap', gap: '2px' }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" sx={{ gap: '8px' }} alignItems="center">
            <Typography color="text.secondary" sx={{ fontSize: '12.8px' }} variant="body1">
              {task?.info?.code?.toUpperCase()}
            </Typography>
            <Typography
              sx={{
                color: '#4DB6AC',
                border: '1px solid #e0f2f1',
                width: 'fit-content',
                fontSize: '12.8px',
                px: 0.8,
                py: 0.2,
              }}
              variant="body1"
            >
              {task?.info?.type?.toUpperCase()}
            </Typography>
          </Stack>
          <SubtaskProgress subtaskId={task?.id} taskProgress={taskProgress} />
        </Stack>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <Typography variant="body2" sx={{ color: 'grey' }}>
            Min Score: {task.minScore}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'grey',
            }}
          >
            Your Score: {task?.score ? task.score : 'N/A'}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ContestContent;
