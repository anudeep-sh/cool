import { Avatar, Box, Button, Typography } from '@mui/material';
import { ChatApi } from '../../../../api/requests/chat/ChatApi';
import { useEffect, useState } from 'react';
import { handleAlert } from '../../../../utils/handleAlert';
import { HighlightOffOutlined } from '@mui/icons-material';
import { CommonColors } from '../../../../utils/colors';
import { validateSearchInput } from '../../../../utils/validateSearchInput';
import UserSearchList from '../../../SearchAndAdd/UserSearchList';

export default function AddMembers({ setOpen, groupDetails, groupMembers, setGroupMembers }) {
  const bgColor = CommonColors.primaryBgColor;
  const [input, setInput] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userIds, setUserIds] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ChatApi.addUserToGroup(groupDetails.groupChatData.id, userIds);
      setGroupMembers((prevMembers) => [...prevMembers, ...selectedUsers]);
    } catch (error) {
      handleAlert(error.message, 'error');
    }
    setOpen(false);
  };

  const handleAddition = (user) => {
    if (selectedUsers.some((u) => u.id === user.id)) {
      handleAlert(
        `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()} has already been selected.`,
        'error'
      );
    } else if (groupMembers.some((member) => member.user_id === user.id)) {
      handleAlert(
        `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()} is already part of the group.`,
        'error'
      );
    } else if (!selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
      setUserIds([...userIds, user.id]);
      setInput('');
    }
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

  const handleRemove = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    setUserIds(userIds.filter((id) => id !== user.id));
  };

  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.35)',
        borderRadius: '20px',
        zIndex: '2',
      }}
    >
      <Typography
        variant="h5"
        style={{
          display: 'flex',
          marginRight: 'auto',
          marginLeft: 'auto',
          marginBottom: '10px',
        }}
      >
        Add Members
      </Typography>

      <form
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <UserSearchList
          input={input}
          setInput={setInput}
          searchedUsers={searchedUsers}
          handleAddition={handleAddition}
          handleRemove={handleRemove}
          placeholder="Enter username to add to your group"
          width={'100%'}
        />
        {selectedUsers.length > 0 && (
          <Box
            width={'100%'}
            height={'60%'}
            marginTop={'60px'}
            sx={{ overflowY: 'auto', position: 'absolute', zIndex: 1 }}
          >
            {selectedUsers.map((user, index) => (
              <Box
                display={'flex'}
                gap={1}
                marginTop={'8px'}
                alignItems={'center'}
                border={'1px solid #D3D3D3'}
                padding={'4px'}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  src={user.profilePhotoLink}
                  style={{
                    backgroundColor: user.profilePhotoLink ? 'transparent' : bgColor,
                    color: user.profilePhotoLink ? 'black' : 'white',
                    width: '30px',
                    height: '30px',
                    fontSize: '19px',
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
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            marginTop: 'auto',
            justifyContent: 'space-between',
          }}
        >
          <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
            Back
          </Button>
          <Button variant="outlined" type="submit" color="primary" onClick={(e) => handleSubmit(e)}>
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
}
