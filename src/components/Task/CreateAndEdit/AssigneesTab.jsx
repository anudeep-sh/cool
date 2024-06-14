import { useState, useEffect } from 'react';
import {
  Stack,
  Typography,
  TextField,
  Chip,
  Avatar,
  Box,
  Select,
  FormControl,
  MenuItem,
} from '@mui/material';
import style from '../utils/TaskForm/FormInput.module.css';
import SearchAndAdd from '../../SearchAndAdd';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_ALL_ASSIGNEES, DELETE_ASSIGNEE } from '../../../Redux/Task/Task-Constants';
import { manipulateTask } from '../../../Redux/Task/Task-Action';
import ButtonAddAssignees from './ButtonAddAssignees';
import { TaskAPI } from '../../../api/requests/tasks/taskAPI';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircleIcon from '../../../assets/circle.svg';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const AssigneesTab = ({
  isSaved,
  setUserIdentifierType,
  userIdentifierType,
  subTaskAssignees,
  setSubTaskAssignees,
  subtaskId,
  handleClose,
}) => {
  const [isAssignSuccess, setIsAssignSuccess] = useState(false);
  const handleAssignmentSuccess = () => {
    setIsAssignSuccess(true);
  };
  const handleDelete = (identifierToDelete) => {
    const updatedAssignees = subTaskAssignees.filter(
      (assignee) => assignee.identifier !== identifierToDelete
    );
    setSubTaskAssignees(updatedAssignees);
  };
  const { id } = useParams();
  const getTaskAssignees = async () => {
    try {
      if (subtaskId) {
        const { data } = await TaskAPI.getTaskAssignees(`${id}?subTaskId=${subtaskId}`);

        if (data.length > 0) data?.map((user) => (user.identifier = user?.[userIdentifierType]));
        setSubTaskAssignees(data);
      } else {
        const { data } = await TaskAPI.getTaskAssignees(id);
        if (data.length > 0) data?.map((user) => (user.identifier = user?.[userIdentifierType]));
        setSubTaskAssignees(data);
      }
    } catch (err) {}
  };

  const getAssigneesList = async () => {
    try {
      const data = await TaskAPI.getAssigneesList();
      const filteredData = data.filter(
        (element) => element.list.length > 0 && element.type === userIdentifierType
      );
      setSavedUsers(filteredData);
    } catch (err) {}
  };
  const [input, setInput] = useState('');
  const [savedTitle, setSavedTitle] = useState('');
  const [savedUsers, setSavedUsers] = useState();
  const [title, setTitle] = useState('');
  const [invalidIdentifiers, setInvalidIdentifiers] = useState([]);
  const [openTitleDiag, setOpenTitleDiag] = useState(false);
  useEffect(() => {
    if (isSaved) getTaskAssignees();
    getAssigneesList();
  }, [userIdentifierType]);
  useEffect(() => {
    const isInvalid = /^[, ]+$/.test(input) || input === '';
    if (isInvalid) {
      setInput('');
      return;
    }
    if (userIdentifierType === 'email' && !isValidEmail(input)) {
      setInvalidIdentifiers([...invalidIdentifiers, input]);
    }
    if (input.includes(',') || input.includes(' ')) {
      input.split(/[ ,]+/).map((element) => handleAddition(element.trim()));
      setInput('');
    }
  }, [input]);
  const deleteItemFromList = (idToDelete, itemToDelete) => {
    const updatedList = savedUsers.map((item) => {
      if (item.id === idToDelete) {
        const updatedList = item.list.filter((item) => item.identifier !== itemToDelete);
        return { ...item, list: updatedList };
      }
      return item;
    });
    setSavedUsers(updatedList);
  };
  function isValidEmail(email) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      return false;
    }
    return true;
  }

  const handleKeyStroke = (e) => {
    if (e.key === ' ' || e.key === ',' || e.key === 'Enter') {
      input.length > 0 && handleAddition(input);
      setInput('');
    }
    if (e.key === 'Backspace' && input.length === 0) {
      subTaskAssignees.length > 0 && setSubTaskAssignees(subTaskAssignees.slice(0, -1));
    }
  };
  const handleAddition = (identifier) => {
    setSubTaskAssignees([...subTaskAssignees, { identifier }]);
  };
  const handleClearAll = () => {
    setSubTaskAssignees([]);
    setInput('');
  };
  const addAssigneeList = (key) => {
    const newAssigneesList = [];
    savedUsers[key].list.map((element) => {
      newAssigneesList.push({ identifier: element.identifier });
    });
    setSubTaskAssignees(newAssigneesList);
  };
  const handleSaveAsList = async () => {
    setSavedTitle(title);

    const newList = await TaskAPI.createAssigneesList({
      title: title,
      type: userIdentifierType,
      identifiers: subTaskAssignees.map((assignee) => assignee?.identifier),
    });
    setInvalidIdentifiers([...invalidIdentifiers, ...newList.invalidData]);
    setSavedUsers([
      {
        id: newList.id,
        type: userIdentifierType,
        title,
        list: subTaskAssignees?.map((user) => {
          if (!newList?.invalidData?.includes(user?.identifier)) {
            return { identifier: user?.identifier };
          }
        }),
      },
      ...savedUsers,
    ]);
    setSavedTitle('');
    setTitle('');
    setOpenTitleDiag(false);
  };
  return (
    <Stack pt={0} spacing={0.5} sx={{ width: '100%' }}>
      <Typography
        sx={{
          color: 'grey',
          fontFamily: 'Roboto',
          fontSize: '0.875rem',
          fontStyle: 'normal',
          marginLeft: '12px',
        }}
        variant="subtitle2"
      >
        Choose Identifier
      </Typography>
      <Stack spacing={2}>
        <Stack flexWrap="wrap" direction="row" justifyContent="space-between" alignItems="center">
          {/* <SearchAndAdd itemType="users" /> */}

          <Select
            sx={{ width: { xs: '100%', md: '20%', sm: '30%' } }}
            value={userIdentifierType}
            onChange={(e) => {
              setUserIdentifierType(e.target.value);
              handleClearAll();
            }}
          >
            <MenuItem value="username">Username</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
          {/* <select
                value={userIdentifierType}
                onChange={(e) => {
                  setUserIdentifierType(e.target.value);
                  handleClearAll();
                }}
                className={style.formInput}
              >
                <option value="email">Email</option>
                <option value="username">Username</option>
              </select> */}

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              width: { xs: '100%', sm: '50%' },
              margin: { xs: '12px', md: '0px' },
              justifyContent: 'flex-end',
              verticalAlign: 'center',
              gap: 1,
            }}
          >
            <Button
              sx={{
                width: { xs: '40px', md: 'auto' },
              }}
              variant="contained"
              onClick={handleClearAll}
            >
              Clear
            </Button>
            <Box>
              <Button
                sx={{
                  width: { xs: '100%', md: 'auto' },
                }}
                variant="contained"
                onClick={() => setOpenTitleDiag(true)}
              >
                Save Users
              </Button>
              <Dialog
                open={openTitleDiag}
                onClose={() => setOpenTitleDiag(false)}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Enter a title for the list of users
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="name"
                    label="Title"
                    type="text"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenTitleDiag(false)} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleSaveAsList} color="primary">
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Stack>
        <Stack
          direction="row"
          sx={{
            p: 1,
            height: '220px',
            overflowY: 'scroll',
            border: '2px solid #e0e0e0',
            bgColor: '#f5f5f5',
            borderRadius: '6px',
            alignContent: 'flex-start',
            gap: '6px',
            flexWrap: 'wrap',
          }}
        >
          {subTaskAssignees?.map((user) => (
            <Chip
              color={invalidIdentifiers.includes(user?.identifier) ? 'error' : 'default'}
              sx={{ alignSelf: 'start' }}
              onDelete={() => handleDelete(user.identifier)}
              avatar={<Avatar src={user?.image} />}
              label={user?.identifier}
              IconComponent={<HighlightOffIcon />}
            />
          ))}
          <input
            autoFocus={true}
            value={input}
            onKeyDown={handleKeyStroke}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            style={{
              padding: '.5em 0',
              border: 'none',
              outline: 'none',
              flexGrow: 1,
              color: '#656565',
              fontFamily: 'Poppins',
              fontSize: '15px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
            }}
            placeholder={`Paste one or more ${userIdentifierType} for subtask assignment.`}
            title="Press Enter or space after typing to add the user."
          />
        </Stack>
        {isSaved && (
          <ButtonAddAssignees
            userIdentifierType={userIdentifierType}
            assignees={subTaskAssignees}
            subtaskId={subtaskId}
            setInvalidIdentifiers={setInvalidIdentifiers}
            setInput={setInput}
            onSuccessAssignment={handleClose}
          />
        )}
      </Stack>
      <Typography
        variant="h6"
        sx={{
          color: 'grey',
          fontFamily: 'Roboto',
          fontSize: '0.875rem',
          fontStyle: 'normal',
          paddingTop: '14px',
        }}
      >
        Recent Assignees List
      </Typography>
      <Stack
        sx={{
          padding: '12px',
          margin: '35px',
          width: '100%',
          overflowY: 'scroll',
          border: '2px solid #e0e0e0',
          bgColor: '#f5f5f5',
          borderRadius: '6px',
          alignContent: 'flex-start',
          gap: '6px',
          flexWrap: 'wrap',
          display: 'flex',
          gap: '20px',
          justifyContent: 'space-evenly',
        }}
      >
        {savedUsers
          ?.filter((elem) => elem?.list?.length > 0)
          .map((savedUsersItem, key) => (
            <Stack
              sx={{
                padding: '12px',
                border: '2px solid #e0e0e0',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '5px',
                }}
              >
                {savedUsersItem?.title && (
                  <Typography variant="h6">{savedUsersItem?.title} :</Typography>
                )}
                {savedUsersItem?.list?.slice(0, 3).map((element, key) => (
                  <Chip
                    sx={{ alignSelf: 'start', alignItems: 'center' }}
                    // onDelete={() => {
                    //   deleteItemFromList(savedUsersItem?.id, element?.identifier);
                    // }}
                    onClick={() => handleAddition(element.identifier)}
                    avatar={<Avatar src={element?.identifier?.image} />}
                    label={element?.identifier}
                  />
                ))}
              </Box>

              <Button
                variant="contained"
                onClick={() => addAssigneeList(key)}
                sx={{
                  padding: '4px 10px',
                }}
              >
                use
              </Button>
            </Stack>
          ))}
        {(!savedUsers || savedUsers.every((elem) => elem?.list?.length === 0)) && (
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              margin: '5px',
              color: '#656565',
              fontFamily: 'Poppins',
              fontSize: '15px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
            }}
          >
            No saved users.
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default AssigneesTab;
