import React, { useState, useEffect } from 'react';
import { Box, Menu, MenuItem, useTheme, useMediaQuery, Typography, Select } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiPicker from 'emoji-picker-react';
import { CommonColors } from '../../../../utils/colors';
import GetValidatedTokenData from '../../../../utils/helper';
import { ChatApi } from '../../../../api/requests/chat/ChatApi';
import { getOrgName } from '../../../../utils/appendOrgQuery';
import { handleAlert } from '../../../../utils/handleAlert';
import ChatMessagePanel from '../../../MessageBox/ChatMessagePanel';
import ManualAvatar from '../../../Avatar/Avatar';
import ChatInputField from '../../../InputField/ChatInputField';
import Skeletons from '../../../Skeleton/Skeletons';
import GroupDetails from './GroupDetails';
import ConfirmationDialog from '../../../Dialogbox/ConfirmationDialog';
import { useNavigate } from 'react-router-dom';
import BigLoader from '../../../Skeleton/BigLoader';
import SearchBar from '../SearchBar';
import '../chat.css';
import GroupChatDesktop from '../../../../assets/ChatImages/GroupChatDesktop.svg';
import ChatMessageLoader from '../../../Skeleton/ChatMessageLoader';

export default function GroupChatWindow({
  chat,
  setGroupList,
  groupList,
  setSelectedChat,
  socket,
}) {
  const bgColor = CommonColors.primaryBgColor;
  const [confirmationAction, setConfirmationAction] = useState('');
  const [loading, setLoading] = useState(false);
  const [groupDetails, setGroupDetails] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [newMessage, setNewMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [members, setMembers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const orgName = getOrgName();
  const [isLoading, setIsLoading] = useState(false);

  const group = {
    name: chat.name ? chat.name : chat.chatData.name,
    description: chat.description
      ? chat.description
      : chat.chatData?.description
      ? chat.chatData?.description
      : null,
    chatId: chat.id ? chat.id : chat.chatData.id,
  };
  const getGroupDetails = async () => {
    try {
      const response = await ChatApi.getGroupById(
        chat.chatData?.id ? chat.chatData.id : chat.id,
        1
      );
      setGroupDetails(response);
      setIsAdmin(response.isGroupAdmin);
    } catch (error) {
      handleAlert(error.message, 'warning');
    }
  };

  useEffect(() => {
    setLoading(true);
    getGroupDetails().finally(() => setLoading(false));
  }, [chat]);

  const handleGroupChatDelete = async () => {
    setLoading(true);
    try {
      await ChatApi.handleGroupChatDeletion(groupDetails.groupChatData.id);
      const getUpdatedGroupList = groupList.filter(
        (group) => group.chatData.id !== groupDetails.groupChatData.id
      );
      setGroupList(getUpdatedGroupList);
      setSelectedChat(null);
      setOpenDetails(false);
      if (isSmallScreen) {
        navigate(`/org/${orgName}/chat`);
      }
    } catch (error) {
      handleAlert(error.message, 'warning');
    } finally {
      setLoading(false);
    }
  };
  const onEmojiClick = (event) => {
    setInputValue((prevInputValue) => prevInputValue + event.emoji);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const updateMessages = (message) => {
    if (
      message.hasOwnProperty('created_at') &&
      message.chat_id === (chat.chatData?.id ? chat.chatData.id : chat.id)
    ) {
      setMessages([...messages, message]);
      setGroupList((prevGroupList) =>
        prevGroupList.map((group) => {
          if (
            (group.chatData ? group.chatData.id : group.id) ===
            (chat.chatData ? chat.chatData.id : chat.id)
          ) {
            return {
              ...group,
              lastMessageData: {
                ...group.lastMessageData,
                message: message.message,
              },
            };
          }
          return group;
        })
      );
    }
  };

  useEffect(() => {
    if (newMessage) {
      updateMessages(newMessage);
    }
  }, [newMessage]);

  useEffect(() => {
    setMessages([]);
    setIsLoading(true);
    const getGroupDetails = async () => {
      try {
        const response = await ChatApi.getGroupById(chat.chatData ? chat.chatData.id : chat.id, 1);
        setMembers(response.groupChatMembers);
        setMessages(response.messages);
        setShowSearchBar(false);
        setSearchInput('');
      } catch (error) {
        handleAlert(error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };
    getGroupDetails();
  }, [chat]);

  const currentUserInfo = GetValidatedTokenData();

  useEffect(() => {
    socket.on('message', (msg) => {
      setNewMessage(msg[0]);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });
  }, []);

  const handleOpenDetails = () => {
    setAnchorEl(null);
    setOpenDetails(!openDetails);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() && !uploadedFile) return;
    if (socket) {
      let messageData = {
        senderId: currentUserInfo.id,
        message: uploadedFile ? uploadedFile.file.name : inputValue,
        groupId: group.chatId,
        organization: getOrgName(),
      };

      if (uploadedFile) {
        messageData = {
          ...messageData,
          type: 'FILE',
          url: uploadedFile.url,
        };
      }
      socket.emit('message', messageData);
      updateMessages(messageData);
      setInputValue('');
      setUploadedFile(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleChatUpdate = (updatedName, updatedDescription) => {
    setSelectedChat((prevChat) => ({
      ...prevChat,
      name: updatedName,
      description: updatedDescription,
    }));
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
    setAnchorEl(null);
  };

  const handleCancelSearch = () => {
    setShowSearchBar(false);
    setSearchInput('');
  };

  const handleLeaveGroup = async () => {
    setLoading(true);
    try {
      await ChatApi.leaveGroup(groupDetails.groupChatData.id);
      setSelectedChat(null);
      setOpenDetails(false);
      if (isSmallScreen) {
        navigate(`/org/${orgName}/chat`);
      }
    } catch (error) {
      handleAlert(error.message, 'warning');
    }
    setLoading(false);
  };
  const handleGroupDelete = async () => {
    setLoading(true);
    try {
      await ChatApi.handleGroupDeletion(groupDetails.groupChatData.id);
      const getUpdatedGroupList = groupList.filter(
        (group) => group.chatData.id !== groupDetails.groupChatData.id
      );
      setGroupList(getUpdatedGroupList);
      setSelectedChat(null);
      setOpenDetails(false);
      if (isSmallScreen) {
        navigate(`/org/${orgName}/chat`);
      }
    } catch (error) {
      handleAlert(error.message, 'error');
    }
    setLoading(false);
  };
  const handleAction = async () => {
    if (confirmationAction === 'delete') {
      handleGroupDelete();
    } else if (confirmationAction === 'leave') {
      handleLeaveGroup();
    } else if (confirmationAction === 'delete chat') {
      handleGroupChatDelete();
    }
    setShowConfirmation(false);
  };
  const handleConfirmation = (action) => {
    setConfirmationAction(action);
    setShowConfirmation(true);
  };
  if (loading)
    return (
      <Box>
        <BigLoader />
      </Box>
    );
  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid #D3D3D3',
        height: isSmallScreen ? '90%' : '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #D3D3D3',
          backgroundColor: '#8ca4f8',
          pointerEvents: openDetails || uploadLoader ? 'none' : 'auto',
          opacity: openDetails || uploadLoader ? 0.5 : 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ManualAvatar chat={chat} bgColor={bgColor} />
          <Box maxWidth={'100%'} overflowX={'auto'} whiteSpace={'nowrap'}>
            <Box display={'flex'}>
              {group.name && (
                <p
                  style={{
                    fontSize: '18px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    maxWidth: '20vw',
                  }}
                >
                  {group.name}
                </p>
              )}
              <Select
                sx={{
                  padding: '0px',
                  height: '20px',
                  border: 'none',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: '50vh',
                      overflowY: 'auto',
                    },
                  },
                }}
              >
                {members.length > 0 &&
                  members.map((member, index) => (
                    <MenuItem
                      key={index}
                      style={{ padding: '5px', backgroundColor: 'transparent' }}
                    >
                      {member.username}
                    </MenuItem>
                  ))}
              </Select>
            </Box>
            {members && <p>{members.length} member</p>}
          </Box>
        </Box>
        <Box>
          <MoreVertIcon
            sx={{ fontSize: { uxl: '28px' }, cursor: 'pointer' }}
            onClick={handleMenuClick}
          />
          <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
            <MenuItem onClick={handleSearchClick}>Search</MenuItem>
            <MenuItem onClick={handleOpenDetails}>Chat Info</MenuItem>
            <MenuItem onClick={() => handleConfirmation('leave')}>Leave</MenuItem>
            <MenuItem onClick={() => handleConfirmation('delete chat')}>Delete for Me</MenuItem>
            {isAdmin && (
              <MenuItem onClick={() => handleConfirmation('delete')}>Delete for Everyone</MenuItem>
            )}
          </Menu>
          <ConfirmationDialog
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            onConfirm={handleAction}
            title={
              confirmationAction === 'delete'
                ? 'Delete Group'
                : confirmationAction === 'delete chat'
                ? 'Delete group for yourself'
                : 'Leave Group'
            }
            message={
              confirmationAction === 'delete'
                ? 'Are you sure you want to delete this group? This action cannot be undone.'
                : confirmationAction === 'delete chat'
                ? 'Are you sure you want to delete the chat of this group?'
                : 'Are you sure you want to leave this group?'
            }
          />
        </Box>
      </Box>
      {showSearchBar && (
        <SearchBar
          handleCancelSearch={handleCancelSearch}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      )}
      <Box
        sx={{
          padding: 2,
          flexGrow: 1,
          overflowY: openDetails || uploadLoader ? 'hidden' : 'auto',
          margin: 0,
          width: '100%',
          position: 'relative',
        }}
      >
        {isLoading ? (
          <ChatMessageLoader />
        ) : messages && messages.length === 0 ? (
          <Box
            sx={{
              marginBottom: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              flexDirection: 'column',
              gap: {
                xs: '10px',
                sm: '20px',
              },
            }}
          >
            <img
              src={GroupChatDesktop}
              style={{
                height: '50vh',
              }}
            />
            <Typography
              sx={{
                textAlign: 'center',
                maxWidth: {
                  xs: '100%',
                  sm: '80%',
                },
                marginBottom: 'auto',
                borderRadius: '5px',
                padding: '10px',
                backgroundColor: '#f5f5f5',
              }}
            >
              Welcome to the group! 🎉 We're excited to have you here. Feel free to introduce
              yourselves, share your thoughts, and start the conversation. Let's make this a great
              space for everyone!
            </Typography>
          </Box>
        ) : (
          messages.map((message, index) => (
            <ChatMessagePanel
              key={index}
              message={message}
              prevMessage={index > 0 ? messages[index - 1] : null}
              isCurrentUser={message.sender_id === currentUserInfo.id}
              style={{
                pointerEvents: openDetails || uploadLoader ? 'none' : 'auto',
                opacity: openDetails || uploadLoader ? 0.5 : 1,
              }}
            />
          ))
        )}
      </Box>
      {uploadLoader ? (
        <Box display={'flex'} position={'absolute'} top={'50%'} left={'50%'}>
          <Skeletons type={'LazySmallCircularLoader'} />
        </Box>
      ) : (
        uploadedFile && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginRight: 'auto',
              padding: '10px',
              borderBottom: '1px solid #D3D3D3',
            }}
          >
            <img
              src={uploadedFile.url}
              alt={uploadedFile.file.name}
              style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
            />
            <span>{uploadedFile.file.name}</span>
          </Box>
        )
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        sx={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          pointerEvents: openDetails || uploadLoader ? 'none' : 'auto',
          opacity: openDetails || uploadLoader ? 0.5 : 1,
        }}
      >
        {/* {
                    toBeTagged.length > 0 && (
                        toBeTagged.map((name, index) => (
                            <Box key={index} sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <p>{name}</p>
                            </Box>
                        ))
                    )
                } */}
        <ChatInputField
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          setShowEmojiPicker={setShowEmojiPicker}
          showEmojiPicker={showEmojiPicker}
          setUploadedFile={setUploadedFile}
          setUploadLoader={setUploadLoader}
        />
      </form>
      {showEmojiPicker && (
        <div style={{ position: 'absolute', bottom: '60px', right: '20px' }}>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
      {openDetails && (
        <GroupDetails
          chat={chat}
          setOpenDetails={setOpenDetails}
          setGroupList={setGroupList}
          groupList={groupList}
          handleChatUpdate={handleChatUpdate}
          groupMembers={members}
          setGroupMembers={setMembers}
        />
      )}
    </Box>
  );
}
