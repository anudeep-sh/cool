import { Stack, Typography } from '@mui/material';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import ButtonViewSections from '../../Buttons/ButtonViewSections';
import SubtaskProgress from '../../Subtask/SubtaskProgress';

const CourseContent = ({ task, taskProgress }) => {
  return (
    <Stack direction="row" alignItems="flex-start" spacing={2}>
      {task?.type?.toLowerCase() === 'course' && (
        <PlayCircleOutlinedIcon sx={{ color: '#698Aff', mt: 0.3 }} />
      )}

      <Stack sx={{ width: '100%' }} spacing={0.5}>
        <Typography color="text.secondary" variant="body1">
          {task?.info?.title}
        </Typography>
        <Stack
          sx={{ width: '100%', flexWrap: 'wrap', gap: '8px' }}
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          <Typography variant="body2" sx={{ color: 'grey' }}>
            {task?.info?.sections?.length} sections assigned
          </Typography>
          <ButtonViewSections sections={task?.info?.sections} />
        </Stack>
        <SubtaskProgress subtaskId={task?.id} taskProgress={taskProgress} />
      </Stack>
    </Stack>
  );
};

export default CourseContent;
