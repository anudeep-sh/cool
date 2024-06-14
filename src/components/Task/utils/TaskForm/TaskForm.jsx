import { useState } from 'react';
import FormInput from './FormInput';
import inputs from './InputList';
import { Grid, Stack, Typography, Button, Box, TextField, Autocomplete } from '@mui/material';
import style from './FormInput.module.css';
import { TaskAPI } from '../../../../api/requests/tasks/taskAPI';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import SelectSubtask from '../../CreateAndEdit/SelectSubtask';
import TextEditor from '../TextEditor';
import SelectOptions from '../../CreateAndEdit/SelectOptions';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import UtilFunctions from '../UtilFunctions';
import { handleAlert } from '../../../../utils/handleAlert';
import AssigneesTab from '../../CreateAndEdit/AssigneesTab';
import { getOrgName } from '../../../../utils/appendOrgQuery';

const TaskForm = ({ editMode, isParentTask, taskData, subtaskData, setOpen }) => {
  const [active, setActive] = useState('taskForm');
  const selectedOrganization = getOrgName();
  const [userIdentifierType, setUserIdentifierType] = useState('username');

  const navigate = useNavigate();
  const parseEpochDate = (value) => {
    const date = new Date(value * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const year = date.getFullYear().toString();
    const parsedDate = `${year}-${month}-${day}`;
    return parsedDate;
  };
  const [subTaskAssignees, setSubTaskAssignees] = useState(subtaskData?.assignees ?? []);

  const [durationType, setDurationType] = useState(() => {
    // if (editMode) {
    //   if (taskData?.duration >= 86400) {
    //     return 'days';
    //   } else if (taskData?.duration >= 3600) {
    //     return 'hours';
    //   } else {
    //     return 'minutes';
    //   }
    // }
    return 'minutes';
  });

  const [type, setType] = useState('');

  const [contestsData, setContestsData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  const [selectedContest, setSelectedContest] = useState(
    !isParentTask && editMode ? subtaskData?.contestId : ''
  );
  const [selectedCourse, setSelectedCourse] = useState(
    !isParentTask && editMode ? subtaskData?.courseId : ''
  );

  const [selectedSections, setSelectedSections] = useState(
    !isParentTask && editMode ? subtaskData?.sectionIds : []
  );
  const [textValue, setTextValue] = useState(
    !isParentTask && editMode ? subtaskData?.textEditor : ''
  );
  const [isFileRequired, setIsFileRequired] = useState(
    !isParentTask && editMode ? (subtaskData?.isFileRequired === 'true' ? true : false) : false
  );

  const [minScore, setMinScore] = useState(!isParentTask && editMode ? subtaskData?.minScore : '');

  const [description, setDescription] = useState(
    editMode && isParentTask
      ? taskData?.description
      : editMode && !isParentTask
      ? subtaskData?.description
      : ''
  );

  const [details, setDetails] = useState({
    title:
      editMode && isParentTask
        ? taskData?.title
        : editMode && !isParentTask
        ? subtaskData?.title
        : '',
    duration:
      editMode && isParentTask
        ? taskData?.duration / 60
        : editMode && !isParentTask
        ? subtaskData?.duration / 60
        : '',
    startDate:
      editMode && isParentTask
        ? parseEpochDate(taskData?.startsAt)
        : editMode && !isParentTask
        ? parseEpochDate(subtaskData?.startsAt)
        : null,
    startTime:
      editMode && isParentTask
        ? UtilFunctions.parseEpochTime(taskData?.startsAt)
        : editMode && !isParentTask
        ? UtilFunctions.parseEpochTime(subtaskData?.startsAt)
        : null,
  });
  const handleChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    // if (!isNaN(value)) {
    //   value = parseFloat(value).toFixed(2);
    // }

    setDetails((details) => ({ ...details, [name]: value }));
  };

  const getAllContests = async () => {
    const allContests = await TaskAPI.getAllContests();
    setContestsData(allContests);
  };

  const getAllCourses = async () => {
    const allCourses = await TaskAPI.getAllCourses();
    setCoursesData(allCourses);
  };
  function getCurrentTimeIn24HrFormat() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }
  function getCurrentDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  // const handleSaveAssignees = async (subTaskId) => {
  //   try {
  //     const body = {
  //       subtaskIds: [subTaskId],
  //       userIdentifierType: userIdentifierType,
  //       userIdentifiers: subTaskAssignees.map((assignee) => assignee?.identifier),
  //     };
  //     await TaskAPI.assignTask(body);
  //     handleAlert('SubTask Assigned Successfully', 'success');
  //   } catch (err) {
  //     handleAlert('Failed to Assign SubTask', 'error');
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isParentTask && !editMode) {
      const epochStartAt = moment(`${details.startDate + ', ' + details.startTime}`).unix();

      const body = {
        title: details.title,
        duration:
          durationType === 'days'
            ? details.duration * 86400
            : durationType === 'hours'
            ? details.duration * 3600
            : details.duration * 60,
        description: description,
        startsAt: epochStartAt,
      };

      try {
        const data = await TaskAPI.createTask(body);
        handleAlert('Task Created Successfully', 'success');
        selectedOrganization
          ? navigate(`/org/${selectedOrganization}/task/edit/${data?.id}`)
          : navigate(`/task/edit/${data?.id}`);
        setOpen(false);
      } catch (err) {
        handleAlert('Failed to Create Task', 'error');
      }
    } else if (isParentTask && editMode) {
      const epochStartAt = moment(`${details.startDate + ', ' + details.startTime}`).unix();

      const body = {
        title: details.title,
        duration:
          durationType === 'days'
            ? details.duration * 86400
            : durationType === 'hours'
            ? details.duration * 3600
            : details.duration * 60,
        description: description,
        startsAt: epochStartAt,
      };
      const taskId = taskData?.id;

      try {
        await TaskAPI.editTask(body, taskId);
        handleAlert('Task Edited Successfully', 'success');
        setOpen(false);
      } catch (err) {
        handleAlert('Failed to Edit Task', 'error');
      }
      window.location.reload();
    } else if ((!isParentTask && !editMode) || (!isParentTask && editMode)) {
      getAllContests();
      getAllCourses();
    }
  };
  // Subtask Submit Function
  const validateDuration = async () => {
    if (details.startTime === null) details.startTime = getCurrentTimeIn24HrFormat();
    if (details.startDate === null) {
      details.startDate = getCurrentDate();
    }

    if (
      details.duration.toString().split('.')[1]?.length > 2 ||
      details.duration.toString().split('.').length > 2
    ) {
      return handleAlert('Please enter a valid duration', 'error');
    }
    const duration =
      durationType === 'days'
        ? details.duration * 86400
        : durationType === 'hours'
        ? details.duration * 3600
        : details.duration * 60;
    if (
      details.title === '' ||
      details.duration === '' ||
      details.startDate === null ||
      details.startTime === null
    ) {
      handleAlert('Please fill all the fields', 'error');
      setActive('taskForm');
      return;
    }

    if (!isParentTask) {
      const epochStartAt = moment(`${details.startDate + ', ' + details.startTime}`).unix();
      const epochCurrent = moment(
        `${getCurrentDate() + ',' + getCurrentTimeIn24HrFormat()}`
      ).unix();
      if (!editMode && epochStartAt < epochCurrent) {
        return handleAlert('Subtask start time should be greater than current time', 'error');
      }
      const id = window.location.href.split('/')[window.location.href.split('/').length - 1];
      try {
        const taskData = await TaskAPI.getTaskData(id);
        const taskCreateEpoch = taskData?.taskDetails?.startsAt;
        const taskDuration = taskData?.taskDetails?.duration;
        const taskEndEpoch = taskCreateEpoch + taskDuration;

        const subtaskCreateEpoch = epochStartAt;
        const subtaskDuration = duration;
        const subtaskEndEpoch = subtaskCreateEpoch + subtaskDuration;

        if (subtaskCreateEpoch < taskCreateEpoch || subtaskCreateEpoch > taskEndEpoch) {
          handleAlert(
            'Subtask Start Time should be between Task Start Time and Task End Time',
            'error'
          );
          setActive('taskForm');
          return;
        }
        if (subtaskEndEpoch < taskCreateEpoch || subtaskEndEpoch > taskEndEpoch) {
          handleAlert(
            'Subtask End Time should be between Task Start Time and Task End Time',
            'error'
          );
          setActive('taskForm');
          return;
        }
        setActive('subtaskDetails');
      } catch (err) {
        handleAlert(err?.message, 'error');
      }
    }
  };
  const handleSubtaskSubmit = async () => {
    if (type === 'text' && textValue === '')
      return handleAlert('Please enter value in texteditor', 'error');
    if (type === 'course' && selectedSections.length === 0)
      return handleAlert('Please choose course sections', 'error');
    if (!editMode) {
      const epochStartAt = moment(`${details.startDate + ', ' + details.startTime}`).unix();

      const id = window.location.href.split('/')[7];
      const body = {
        title: details.title,
        duration:
          durationType === 'days'
            ? details.duration * 86400
            : durationType === 'hours'
            ? details.duration * 3600
            : details.duration * 60,
        description: description,
        startsAt: epochStartAt,
        type: type.toUpperCase(),
        contestId: type === 'contest' ? selectedContest : '',
        minScore: type === 'contest' ? minScore : '',
        courseId: type === 'course' ? selectedCourse : '',
        sectionIds: type === 'course' ? selectedSections : '',
        textEditor: type === 'text' ? textValue : '',
        isFileRequired: isFileRequired === true ? 'true' : 'false',
        userIdentifierType: userIdentifierType,
        userIdentifiers: subTaskAssignees.map((assignee) => assignee?.identifier),
      };
      if (body.type === '') {
        handleAlert('Please choose a category', 'error');
        return;
      }

      try {
        await TaskAPI.createSubTask(body, id);
        handleAlert('Subtask Created Successfully', 'success');
        setOpen(false);
        window.location.reload();
      } catch (err) {
        handleAlert('Failed to Create Subtask', 'error');
      }
    } else if (editMode) {
      const epochStartAt = moment(`${details.startDate + ', ' + details.startTime}`).unix();

      const id = subtaskData?.id;
      const body = {
        id: subtaskData?.id,
        title: details.title,
        duration:
          durationType === 'days'
            ? details.duration * 86400
            : durationType === 'hours'
            ? details.duration * 3600
            : details.duration * 60,
        description: description,
        startsAt: epochStartAt,
        type: type.toUpperCase(),
        contestId: type === 'contest' ? selectedContest : '',
        minScore: type === 'contest' ? minScore : '',
        courseId: type === 'course' ? selectedCourse : '',
        sectionIds: type === 'course' ? selectedSections : '',
        textEditor: type === 'text' ? textValue : '',
        isFileRequired: isFileRequired === true ? 'true' : 'false',
        userIdentifierType: userIdentifierType,
        userIdentifiers: subTaskAssignees.map((assignee) => assignee?.identifier),
      };
      if (body.type === '') {
        handleAlert('Please choose a category', 'error');
        return;
      }
      try {
        await TaskAPI.editSubTask(body, id);
        handleAlert('Subtask Edited Successfully', 'success');
        setOpen(false);
      } catch (err) {
        handleAlert(err?.message, 'error');
      }
    }
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {active === 'taskForm' && (
        <>
          <Grid container spacing={2}>
            {inputs.map((input, i) => (
              <Grid item xs={12} md={6} key={i}>
                <FormInput
                  {...input}
                  value={details[input.name]}
                  onChange={handleChange}
                  durationType={durationType}
                  setDurationType={setDurationType}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Stack spacing={0.5}>
                <Typography variant="subtitle2" sx={{ ml: 1.5, color: 'grey' }}>
                  Description
                </Typography>
                <textarea
                  className={style.formInput}
                  style={{ height: '100px', fontSize: '16px' }}
                  placeholder="What is this task about?"
                  name="description"
                  value={description}
                  // required
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {/* {!isParentTask && !editMode && assignForm && (
                  <Box
                    sx={{
                      paddingTop: '16px',
                    }}
                  >
                    <AssigneesTab
                      userIdentifierType={userIdentifierType}
                      setUserIdentifierType={setUserIdentifierType}
                      isSaved={false}
                      subTaskAssignees={subTaskAssignees}
                      setSubTaskAssignees={setSubTaskAssignees}
                    />
                  </Box>
                )}  */}
              </Stack>
            </Grid>
          </Grid>
          <Stack marginTop={3} alignItems="flex-end">
            <Stack direction="row" spacing={4}>
              {isParentTask && editMode && (
                <Button
                  variant="contained"
                  onClickCapture={() =>
                    selectedOrganization
                      ? navigate(`/org/${selectedOrganization}/task/edit/${taskData?.id}`)
                      : navigate(`/task/edit/${taskData?.id}`)
                  }
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  Edit Subtasks
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                sx={{ width: { xs: '100%', sm: 'auto' } }}
                onClick={validateDuration}
              >
                {isParentTask && editMode ? 'Save' : 'Save and Proceed'}
              </Button>
            </Stack>
          </Stack>
        </>
      )}

      {active === 'subtaskDetails' && (
        <Box sx={{ height: '80%' }}>
          <Stack spacing={3} sx={{ height: '100%' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="subtitle1">Choose the subtask type :</Typography>
              <SelectSubtask
                type={type}
                setType={setType}
                editMode={editMode}
                subtaskData={subtaskData}
              />
              {type === 'text' && (
                <FormControlLabel
                  control={
                    <Checkbox
                      value={isFileRequired ? 'True' : 'False'}
                      checked={isFileRequired}
                      onChange={(e) => {
                        setIsFileRequired(e.target.checked);
                      }}
                    />
                  }
                  label="File Required"
                />
              )}
            </Stack>
            {type === 'contest' ? (
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={2}>
                  <Box sx={{ width: 320 }}>
                    <Autocomplete
                      onChange={(event, value) => setSelectedContest(value?.id)}
                      options={contestsData}
                      defaultValue={
                        editMode === true
                          ? contestsData.filter(
                              (contest) => contest.id === subtaskData?.contestId
                            )[0]
                          : null
                      }
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search a Contest"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </Box>
                  <TextField
                    sx={{
                      '& .MuiInputBase-input': {
                        height: '27.2px',
                        padding: '12px',
                      },
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#698aff',
                        },
                      },
                    }}
                    required
                    label="Minimum Score"
                    value={minScore}
                    onChange={(e) => setMinScore(e.target.value)}
                  />
                </Stack>
              </Stack>
            ) : type === 'course' ? (
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={2}>
                  <Box sx={{ width: 320 }}>
                    <Autocomplete
                      onChange={(event, value) => setSelectedCourse(value?.id)}
                      options={coursesData}
                      defaultValue={
                        editMode === true
                          ? coursesData.filter((course) => course.id === subtaskData?.courseId)[0]
                          : null
                      }
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search a Course"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </Box>
                  <SelectOptions
                    selectedSections={selectedSections}
                    setSelectedSections={setSelectedSections}
                    courseSelected={selectedCourse}
                  />
                </Stack>
              </Stack>
            ) : type === 'text' ? (
              <TextEditor textValue={textValue} setTextValue={setTextValue} />
            ) : (
              ''
            )}
          </Stack>
          <Stack mt={5} alignItems="flex-end">
            <Stack direction="row" spacing={1}>
              <Button onClick={() => setActive('taskForm')} variant="outlined" disableRipple>
                Back
              </Button>
              {/* {!isParentTask && !editMode && (
                <Button onClick={() => setActive('assignForm')} variant="outlined" disableRipple>
                  Assign Users
                </Button>
              )} */}
              <Button type="submit" variant="contained" disableRipple onClick={handleSubtaskSubmit}>
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
      {active === 'assignForm' && (
        <Box sx={{ height: '80%' }}>
          <Box sx={{ paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '2' }}>
            <AssigneesTab
              userIdentifierType={userIdentifierType}
              setUserIdentifierType={setUserIdentifierType}
              isSaved={false}
              subTaskAssignees={subTaskAssignees}
              setSubTaskAssignees={setSubTaskAssignees}
            />
            <Box display={'flex'} justifyContent={'flex-end'} gap={2} mt={2}>
              <Button variant="outlined" onClick={() => setActive('subtaskDetails')}>
                {' '}
                Back
              </Button>
              <Button variant="contained" onClick={() => setActive('subtaskDetails')}>
                {' '}
                Assign
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </form>
  );
};

export default TaskForm;
