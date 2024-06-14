import { Stack, Typography, Box } from '@mui/material';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ButtonGoTo from '../../Buttons/ButtonGoTo';
import TextContent from './TextContent';
import CourseContent from './CourseContent';
import ContestContent from './ContestContent';
import ButtonAddText from '../../Buttons/ButtonAddText';
import BtnOpenUpload from '../../Buttons/BtnOpenUpload';
import Tooltip from '@mui/material/Tooltip';
import './CardContent.css';

const CardContent = ({ task, isParentTask, progressData, orgName,getTaskProgress, id }) => {
  const MAX_LENGTH = 20;

  const truncateText = (text) => {
    if (!text) return '';
    if (text.length <= MAX_LENGTH) return text;
    return `${text.substring(0, MAX_LENGTH)}...`;
  };
  return (
    <Stack spacing={2} sx={{ color: 'grey', flexGrow: 1 }}>
      {isParentTask ? (
        <Stack spacing={2}>
          <Stack spacing={1.5} direction="row" alignItems="center">
            <FormatListBulletedOutlinedIcon sx={{ color: '#698AFF', fontSize: '22px' }} />
            <Typography variant="body2">{task?.subTasksCount} subtasks</Typography>
          </Stack>
          <Typography sx={{ color: 'grey' }}>
            <span style={{ color: '#000000DE' }}>Description : </span>
            {task?.description === '' ? ' --' : ` ${task?.description}`}
          </Typography>
        </Stack>
      ) : (
        <Stack spacing={2.5} sx={{ height: '100%' }}>
          <Box
            p={2}
            sx={{
              bgcolor: '#f0f3ff',
              borderRadius: '10px',
              width: '100%',
              minHeight: 120,
            }}
          >
            {task?.type?.toLowerCase() === 'text' && (
              <TextContent task={task} taskProgress={progressData} getTaskProgress={getTaskProgress} id={id} />
            )}
            {task?.type?.toLowerCase() === 'course' && (
              <CourseContent task={task} taskProgress={progressData} />
            )}
            {task?.type?.toLowerCase() === 'contest' && (
              <ContestContent task={task} taskProgress={progressData} />
            )}
          </Box>
          <Typography sx={{ color: 'grey', px: 0, flexGrow: 1 }} style={{ marginBottom: '3px' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="end">
              <Box maxWidth="190px">
                <Tooltip
                  title={task?.description || ''}
                  arrow
                  classes={{ tooltip: 'customTooltip' }}
                >
                  <span>{truncateText(task?.description)}</span>
                </Tooltip>
              </Box>
              <Stack>
                {task?.isFileRequired === 'true' && (
                  <Tooltip
                    title="File submission is required to complete this task"
                    classes={{ tooltip: 'customTooltip' }}
                    arrow
                  >
                    <span
                      style={{
                        marginTop: '0px',
                        color: 'red',
                        fontSize: '20px',
                      }}
                    >
                      *
                    </span>
                  </Tooltip>
                )}
              </Stack>
            </Stack>
          </Typography>

          {task?.type?.toLowerCase() === 'text' && task?.isFileRequired && (
            <Stack spacing={2} direction="row" style={{ marginTop: '0px' }}>
              <ButtonAddText subtaskId={task?.id} taskProgress={progressData} />
              <BtnOpenUpload subtaskId={task?.id} taskProgress={progressData} />
            </Stack>
          )}
          {task.type.toLowerCase() !== 'text' && (
            <ButtonGoTo
              taskType={task?.type?.toLowerCase()}
              courseId={task?.courseId}
              contestId={task?.contestId}
              orgName={orgName}
            />
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default CardContent;
