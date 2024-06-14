import { useState, useEffect } from 'react';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { manipulateTask } from '../../../../../Redux/Task/Task-Action';
import { CHANGE_POST_DATA } from '../../../../../Redux/Task/Task-Constants';
import { TaskAPI } from '../../../../../api/requests/tasks/taskAPI';
import UtilFunctions from '../../UtilFunctions';
import GetValidatedTokenData from '../../../../../utils/helper';

export default function SelectStatus({ subtaskId, fileRequired, taskProgress, getTaskProgress, id }) {
  const dispatch = useDispatch();
  const { subtaskPostData } = useSelector((state) => state.TaskReducer);
  const options = ['COMPLETED', 'INPROGRESS', 'TODO'];
  const [status, setStatus] = useState('');

  const decoded = GetValidatedTokenData();

  const progress = UtilFunctions.getSubtaskProgress(subtaskId, taskProgress);
  useEffect(() => {
    if (progress) {
      let index = options.indexOf(progress?.submission?.status);
      setStatus(index !== -1 ? index : options.indexOf('TODO'));
    } else {
      setStatus(options.indexOf('TODO'));
    }
  }, [progress]);

  const postSubtaskData = async (postData) => {
    delete postData.submitted;
    await TaskAPI.submitSubtask(subtaskId, postData);
  };

  const handleChange = async (event) => {
    setStatus(event.target.value);
    const item = subtaskPostData?.find((el) => el.subtaskId === subtaskId);
    const postData = {
      ...item,
      status: options[event.target.value]?.toUpperCase(),
    };
    dispatch(manipulateTask(CHANGE_POST_DATA, postData));

    if (fileRequired && !postData.submitted && postData.fileUrl) {
      delete postData.fileUrl;
    }
    await postSubtaskData(postData);
    const userId = decoded.id;
    await getTaskProgress(id, userId);
  };
  return (
    <FormControl size="small" sx={{ width: { xs: '100%', sm: 150 } }}>
      <InputLabel>Select Status</InputLabel>
      <Select
        value={status}
        defaultValue={'TODO'}
        onChange={handleChange}
        sx={{ fontColor: 'grey' }}
        label="Select Status"
      >
        {options.map((item, i) => (
          <MenuItem value={i} key={i}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
