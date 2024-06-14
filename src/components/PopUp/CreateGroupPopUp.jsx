import React, { useEffect, useState } from 'react';
import { TextField, Avatar, Box, Button } from '@mui/material';
import { handleAlert } from '../../utils/handleAlert';
import { ChatApi } from '../../api/requests/chat/ChatApi';
import { HighlightOffOutlined } from '@mui/icons-material';
import BigLoader from '../Skeleton/BigLoader';
import { validateSearchInput } from '../../utils/validateSearchInput';
import UserSearchList from '../SearchAndAdd/UserSearchList';

const CreateGroupPopUp = ({ setGroupMembers, setOpen, open, setGroupList, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [input, setInput] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const setBoxStatus = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!groupName) {
      handleAlert('Group name is required', 'error');
      setLoading(false);
      return;
    }
    try {
      const createGroupRequestBody = {
        name: groupName,
        description: groupDescription,
        userIds: userIds,
      };
      const response = await ChatApi.createGroup(createGroupRequestBody);
      setGroupList((prevGroupList) => [...prevGroupList, response]);
      onCreateGroup(response);
      setGroupName('');
      setGroupDescription('');
      handleAlert('Group created successfully', 'success');
      setGroupMembers([]);
    } catch (error) {
      handleAlert(error.message, 'error');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleAddition = (user) => {
    if (selectedUsers.some((u) => u.id === user.id)) {
      handleAlert(
        `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()} has already been selected.`,
        'warning'
      );
    } else if (!selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
      setUserIds([...userIds, user.id]);
      setInput('');
    }
  };

  const handleRemove = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    setUserIds(userIds.filter((id) => id !== user.id));
  };

  useEffect(() => {
    const validInputs = validateSearchInput(input);
    if (validInputs.length === 0) {
      setInput('');
      setSearchedUsers([]);
      return;
    }
    const searchUsers = async () => {
      try {
        const response = await ChatApi.searchUser(validInputs[0].toLowerCase());
        const lowerCaseInput = input.toLowerCase();
        const filteredUsers = response.filter((user) =>
          user.username.toLowerCase().includes(lowerCaseInput)
        );
        setSearchedUsers(filteredUsers);
      } catch (error) {
        handleAlert(error.message, 'error');
      }
    };

    searchUsers();
  }, [input]);

  if (loading)
    return (
      <Box>
        <BigLoader />
      </Box>
    );

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.35)',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: { xs: '55%', md: '50%' },
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        minWidth: '100px',
        height: 'auto',
        alignItems: 'center',
        zIndex: '1',
        p: 3,
      }}
    >
      <form
        style={{
          color: 'black',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={handleSubmit}
      >
        <Box>
          <TextField
            label="Enter Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            sx={{ marginBottom: '10px', marginRight: '10px' }}
          />
          <TextField
            label="Enter Group Description"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
          />
        </Box>

        <Box width={'100%'} height={'200px'} position={'relative'}>
          <UserSearchList
            input={input}
            setInput={setInput}
            searchedUsers={searchedUsers}
            selectedUsers={selectedUsers}
            handleAddition={handleAddition}
            setSearchedUsers={setSearchedUsers}
            width={'100%'}
            placeholder="Enter username to add to your group"
            height={'40px'}
          />
          {/* <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="search"
            style={{
              width: '100%',
            }}
            placeholder="Enter username to add to your group"
          />

          {searchedUsers.length > 0 && (
            <Box
              width={'100%'}
              border={'1px solid #D3D3D3 '}
              maxHeight={'120px'}
              height={'120px'}
              marginTop={'10px'}
              backgroundColor={'white'}
              sx={{ overflowY: 'auto', position: 'absolute', zIndex: 10 }}
            >
              {searchedUsers.map((user, index) => (
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  marginTop={'4px'}
                  alignItems={'start'}
                  key={user.id}
                  borderBottom={'1px solid #D3D3D3'}
                  padding={'4px'}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    onClick={() => handleAddition(user)}
                    display={'flex'}
                    gap={1}
                    alignItems={'center'}
                  >
                    <Avatar
                      src={user.profilePhotoLink}
                      style={{
                        backgroundColor: user.profilePhotoLink ? 'transparent' : '#354150',
                        color: user.profilePhotoLink ? 'black' : 'white',
                        width: '30px',
                        height: '30px',
                      }}
                    >
                      {user.firstName.charAt(0).toUpperCase()}
                    </Avatar>
                    <p>
                      {`${user.firstName} ${user.lastName}`.toUpperCase()} {`(${user.username})`}
                    </p>
                  </Box>
                </Box>
              ))}
            </Box>
          )} */}

          {selectedUsers.length > 0 && (
            <Box
              width={'100%'}
              border={'1px solid #D3D3D3 '}
              height={'70%'}
              marginTop={'10px'}
              sx={{ overflowY: 'auto', position: 'absolute', zIndex: 1 }}
            >
              {selectedUsers.map((user, index) => (
                <Box
                  key={index}
                  display={'flex'}
                  gap={1}
                  marginTop={'4px'}
                  alignItems={'center'}
                  borderBottom={'1px solid #D3D3D3'}
                  padding={'4px'}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <Avatar
                    src={user.profilePhotoLink}
                    style={{
                      backgroundColor: user.profilePhotoLink ? 'transparent' : '#354150',
                      color: user.profilePhotoLink ? 'black' : 'white',
                      width: '30px',
                      height: '30px',
                    }}
                  >
                    {user.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                  <p>
                    {`${user.firstName} ${user.lastName}`.toUpperCase()} {`(${user.username})`}
                  </p>
                  <HighlightOffOutlined style={{}} onClick={() => handleRemove(user)} />
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            marginTop: 'auto',
            justifyContent: 'space-between',
            mt: 4,
          }}
        >
          <Button
            onClick={setBoxStatus}
            sx={{ border: '1px solid #d3d3d3', margin: '2px', marginLeft: '0' }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{ border: '1px solid #d3d3d3', margin: '2px', marginLeft: '0' }}
            // onClick={handleSubmit}
          >
            Create
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateGroupPopUp;
