import { useEffect, useState } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import { GroupAddOutlined } from '@mui/icons-material';
import CreateGroupPopUp from '../PopUp/CreateGroupPopUp';
import GroupChatWindow from './ChatComponents/GroupDetails/GroupChatWindow';
import { ChatApi } from '../../api/requests/chat/ChatApi';
import BigLoader from '../Skeleton/BigLoader';
import { handleAlert } from '../../utils/handleAlert';
import UserChatWindow from './ChatComponents/UserDetails/UserChatWindow';
import UserSearchList from '../SearchAndAdd/UserSearchList';
import { useTheme, useMediaQuery } from '@mui/material';
import ChatListCard from '../Card/ChatListCard';
import { useNavigate, useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

export default function ChatList({
  socket,
  setSelectedChat,
  usersList,
  setUsersList,
  selectedChat,
  groupList,
  setGroupList,
}) {
  const url = useParams();
  const drawerWidth = 200;
  const [open, setOpen] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [groupSearchInput, setGroupSearchInput] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const createGroupClick = () => {
    setOpen(!open);
  };

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    if (isSmallScreen) {
      const groupName = chat.chatData?.name && chat.chatData.name;
      const userName = chat.senderData?.username ? chat.senderData.username : chat.username;
      const groupId = chat.chatData?.id || chat.id;
      const newUrl =
        chat.chatData?.type === 'GROUP'
          ? `/org/${url.orgName}/chat/group/${groupId}/${groupName}`
          : `/org/${url.orgName}/chat/user/${
              chat.senderData?.id ? chat.senderData.id : chat.id
            }/${userName}`;
      navigate(newUrl);
    }
  };

  const handleCreateGroup = (groupData) => {
    setGroupList([groupData, ...groupList]);
    setSelectedChat(groupData);
    if (isSmallScreen) {
      const newUrl =
        groupData.name && `/org/${url.orgName}/chat/group/${groupData.id}/${groupData.name}`;
      navigate(newUrl);
    }
  };

  const getAllGroups = async () => {
    try {
      const response = await ChatApi.getGroups();
      setGroupList(response);
    } catch (error) {
      handleAlert('Something went wrong', 'error');
    }
    setLoading(false);
  };

  const getAllUsers = async () => {
    try {
      const response = await ChatApi.getUsers();
      setUsersList(response);
    } catch (error) {
      handleAlert(error.message, 'warning');
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllGroups();
  }, []);

  socket.on('chat', (msg) => {
    if (msg?.refetchUserChats) {
      getAllUsers();
      getAllGroups();
    }
  });

  useEffect(() => {
    const isInvalid = /^[, ]+$/.test(input) || input === '';
    if (isInvalid) {
      setInput('');
      setSearchedUsers([]);
      return;
    }

    const searchUsers = async () => {
      try {
        const response = await ChatApi.searchUser(input.toLowerCase());
        const lowerCaseInput = input.toLowerCase();
        const filteredUsers = response.filter((user) =>
          user.username.toLowerCase().includes(lowerCaseInput)
        );
        setSearchedUsers(filteredUsers);
      } catch (error) {
        handleAlert(error.message, 'warning');
      }
    };

    searchUsers();
  }, [input]);

  const handleAddition = (user) => {
    const isUserPresent = usersList.find((u) => u.senderData.id === user.id);
    if (isUserPresent) {
      setSelectedChat(isUserPresent);
      setInput('');
      return;
    }
    const isSearchedUser = searchedUsers.find((searchedUser) => searchedUser.id === user.id);
    if (isSearchedUser) {
      setUsersList((prevUsers) => [user, ...prevUsers.filter((u) => u.senderData.id !== user.id)]);
    }
    setInput('');
  };
  const filteredGroupList = groupList.filter((group) =>
    (group.chatData?.name ? group.chatData?.name : group.id)
      .toLowerCase()
      .includes(groupSearchInput.toLowerCase())
  );

  if (loading) {
    return (
      <Box>
        <BigLoader />
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 0,
        width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        height: isSmallScreen ? '90vh' : '100vh',
        borderBottom: '0.800px solid #D3D3D3',
      }}
      overflow={'hidden'}
    >
      <Box
        display="flex"
        padding={'0'}
        width="100%"
        height={'100vh'}
        border={'0.800px solid #D3D3D3'}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          height={'100%'}
          border={'0.800px solid #D3D3D3'}
          sx={{
            width: {
              xs: '100%',
              sm: 'auto',
            },
          }}
        >
          <UserSearchList
            input={input}
            setInput={setInput}
            searchedUsers={searchedUsers}
            handleChatClick={handleChatClick}
            handleAddition={handleAddition}
            height={'30px'}
            width={(xs) => (xs ? '90%' : 'auto')}
          />
          {/* Render filtered chatData */}
          <Box
            width="100%"
            height={{ xs: '35%', sm: '40%' }}
            borderBottom={'0.800px solid #D3D3D3'}
            sx={{
              p: 1,
            }}
          >
            <Box
              sx={{
                overflowY: 'auto',
                paddingX: {
                  xs: '10px',
                  sm: '0px',
                },
              }}
              height={'100%'}
              width="100%"
              display="flex"
              flexDirection={'column'}
            >
              {usersList &&
                usersList.map((chat, index) => (
                  <ChatListCard
                    key={index}
                    chat={chat}
                    handleChatClick={handleChatClick}
                    selectedChat={selectedChat}
                    name={chat.senderData ? chat.senderData.username : chat.username}
                    profilePhotoLink={
                      chat.senderData ? chat.senderData.profilePhotoLink : chat.profilePhotoLink
                    }
                    latestMessage={
                      chat.lastMessageData
                        ? chat.lastMessageData.message
                        : chat.latestMessage
                        ? chat.latestMessage
                        : null
                    }
                    unreadMessagesCount={chat.unreadMessagesCount ? chat.unreadMessagesCount : 0}
                  />
                ))}
            </Box>
          </Box>
          <Box width="100%" height={'55%'}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              padding={'11px 11px'}
            >
              <Box display={'flex'} alignItems={'center'} sx={{ color: 'grey' }}>
                Groups
              </Box>
              <GroupAddOutlined
                sx={{ fontSize: '1.5rem', marginLeft: 'auto', cursor: 'pointer', color: 'grey' }}
                onClick={createGroupClick}
              />
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <TextField
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '30px',
                    fontSize: '15px',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '20px',
                  },
                  width: '90%',
                }}
                fullWidth
                placeholder="Search Groups"
                value={groupSearchInput}
                onChange={(e) => setGroupSearchInput(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                overflowY: 'auto',
                paddingX: {
                  xs: '10px',
                  sm: '0px',
                },
              }}
              height={{ xs: '70%', sm: '90%' }}
              width="100%"
              display="flex"
              flexDirection={'column'}
            >
              {filteredGroupList &&
                filteredGroupList.map((chat, index) => (
                  <ChatListCard
                    key={index}
                    chat={chat}
                    handleChatClick={handleChatClick}
                    selectedChat={selectedChat}
                    name={chat.chatData ? chat.chatData.name : chat.name}
                    latestMessage={
                      chat.lastMessageData ? chat.lastMessageData.message : chat.latestMessage
                    }
                    unreadMessagesCount={chat.unreadMessagesCount ? chat.unreadMessagesCount : 0}
                  />
                ))}
            </Box>
          </Box>
        </Box>
        {!isSmallScreen ? (
          <Box width="100%" position={'relative'}>
            {selectedChat ? (
              selectedChat.chatData ? (
                selectedChat.chatData.type === 'GROUP' ? (
                  <GroupChatWindow
                    chat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    groupList={groupList}
                    setGroupList={setGroupList}
                    socket={socket}
                  />
                ) : (
                  <UserChatWindow
                    selectedChat={selectedChat}
                    chat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    userList={usersList}
                    setUserList={setUsersList}
                    socket={socket}
                  />
                )
              ) : selectedChat.name ? (
                <GroupChatWindow
                  chat={selectedChat}
                  setSelectedChat={setSelectedChat}
                  groupList={groupList}
                  setGroupList={setGroupList}
                  socket={socket}
                />
              ) : (
                <UserChatWindow
                  selectedChat={selectedChat}
                  chat={selectedChat}
                  setSelectedChat={setSelectedChat}
                  userList={usersList}
                  setUserList={setUsersList}
                  socket={socket}
                />
              )
            ) : (
              <Box
                sx={{
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  height: '100%',
                  color: '#888',
                }}
              >
                <p>Tap to open a chat</p>
              </Box>
            )}
            {open && (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <CreateGroupPopUp
                  groupList={groupList}
                  setGroupList={setGroupList}
                  isSaved={true}
                  groupMembers={groupMembers}
                  setGroupMembers={setGroupMembers}
                  setOpen={setOpen}
                  open={open}
                  onCreateGroup={handleCreateGroup}
                />
              </Box>
            )}
          </Box>
        ) : (
          open && (
            <Box
              sx={{
                width: '100%',
                height: '90%',
                position: 'absolute',
              }}
            >
              <CreateGroupPopUp
                groupList={groupList}
                setGroupList={setGroupList}
                isSaved={true}
                groupMembers={groupMembers}
                setGroupMembers={setGroupMembers}
                setOpen={setOpen}
                open={open}
                onCreateGroup={handleCreateGroup}
              />
            </Box>
          )
        )}
      </Box>
    </Box>
  );
}
