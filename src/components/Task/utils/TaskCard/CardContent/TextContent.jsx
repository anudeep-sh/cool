import { Stack } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ButtonViewText from '../../Buttons/ButtonViewText';
import SubtaskProgress from '../../Subtask/SubtaskProgress';
import SelectStatus from './SelectStatus';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { manipulateTask } from '../../../../../Redux/Task/Task-Action';
import { FILE_POST_DATA } from '../../../../../Redux/Task/Task-Constants';
import BtnViewFile from '../../Buttons/BtnViewFile';
import UtilFunctions from '../../UtilFunctions';

const TextContent = ({ task, taskProgress, getTaskProgress,id }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      manipulateTask(FILE_POST_DATA, {
        subtaskId: task?.id,
        description: task?.description,
      })
    );
  }, []);

  return (
    <Stack alignItems="flex-start" direction="row">
      <Stack spacing={3} sx={{ width: '100%' }}>
        <Stack
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
          direction="row"
          alignItems="center"
        >
          <Stack direction="row" spacing={1}>
            <DescriptionOutlinedIcon sx={{ color: '#698Aff', mt: 0.5 }} />

            <ButtonViewText fileRequired={task?.isFileRequired} displayValue={task?.textEditor} />
          </Stack>

          <SubtaskProgress subtaskId={task?.id} taskProgress={taskProgress} />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={3}>

          <SelectStatus
            subtaskId={task?.id}
            fileRequired={task?.isFileRequired}
            taskProgress={taskProgress}
            getTaskProgress={getTaskProgress}
            id = {id}
          />

          {UtilFunctions.getSubtaskProgress(task?.id, taskProgress)?.submission?.fileUrl && (
            <BtnViewFile
              btnText="View File"
              url={UtilFunctions.getSubtaskProgress(task?.id, taskProgress)?.submission?.fileUrl}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TextContent;
