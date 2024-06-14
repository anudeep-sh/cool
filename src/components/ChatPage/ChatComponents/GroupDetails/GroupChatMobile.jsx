import { useState, useEffect } from 'react';
import { Box, Menu, MenuItem, useTheme, useMediaQuery, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../chat.css';
import GroupDetails from './GroupDetails';
import { CommonColors } from '../../../../utils/colors';
import GetValidatedTokenData from '../../../../utils/helper';
import { ChatApi } from '../../../../api/requests/chat/ChatApi';
import { getOrgName } from '../../../../utils/appendOrgQuery';
import { handleAlert } from '../../../../utils/handleAlert';
import ChatMessagePanel from '../../../MessageBox/ChatMessagePanel';
import ManualAvatar from '../../../Avatar/Avatar';
import EmojiPicker from 'emoji-picker-react';
import ChatInputField from '../../../InputField/ChatInputField';
import Skeletons from '../../../Skeleton/Skeletons';
import ConfirmationDialog from '../../../Dialogbox/ConfirmationDialog';
import { useNavigate, useParams } from 'react-router-dom';
import BigLoader from '../../../Skeleton/BigLoader';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SearchBar from '../SearchBar';
import ChatMessageLoader from '../../../Skeleton/ChatMessageLoader';
import GroupChatDesktop from '../../../../assets/ChatImages/GroupChatDesktop.svg';

export default function GroupChatMobile({
  chat,
  setGroupList,
  groupList,
  socket,
  selectedChat,
  setSelectedChat,
}) {
  const bgColor = CommonColors.primaryBgColor;
  const [messages, setMessages] = useState([]);
  const [confirmationAction, setConfirmationAction] = useState('');
  const [groupDetails, setGroupDetails] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [newMessage, setNewMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const openMenu = Boolean(anchorEl);
  const [isLoader, setIsLoader] = useState(false);

  const url = useParams();
  const navigate = useNavigate();
  const orgName = getOrgName();
  const getGroupDetails = async () => {
    try {
      const response = await ChatApi.getGroupById(
        chat.chatData?.id ? chat.chatData.id : chat.id,
        1
      );
      setGroupDetails(response);
      setIsAdmin(response.isGroupAdmin);
      setShowSearchBar(false);
      setSearchInput('');
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
  const onEmojiClick = (event) => {
    setInputValue((prevInputValue) => prevInputValue + event.emoji);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const updateMessages = (message) => {
    if (
      message.hasOwnProperty('created_at') &&
      message.chat_id === (selectedChat.chatData?.id ? selectedChat.chatData.id : selectedChat.id)
    ) {
      setMessages([...messages, message]);
    }
    setInputValue('');
  };

  useEffect(() => {
    if (newMessage) {
      updateMessages(newMessage);
    }
  }, [newMessage]);

  useEffect(() => {
    setMessages([]);
    setIsLoader(true);
    const getGroupDetails = async () => {
      try {
        const response = await ChatApi.getGroupById(url.id, 1);
        setMessages(response.messages);
        setMembers(response.groupChatMembers);
      } catch (error) {
        handleAlert(error.message, 'error');
      } finally {
        setLoading(false);
        setIsLoader(false);
      }
    };

    const getGroups = async () => {
      try {
        const response = await ChatApi.getGroups();
        setSelectedChat(response.find((group) => group.chatData.id === url.id));
      } catch (error) {
        handleAlert('error.message', 'warning');
      }
      setLoading(false);
    };

    getGroups();
    getGroupDetails();
  }, []);

  const currentUserInfo = GetValidatedTokenData();

  useEffect(() => {}, [selectedChat]);
  useEffect(() => {
    if (!isSmallScreen) {
      navigate(`/org/${orgName}/chat`);
    }
  }, [isSmallScreen]);

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
    if (inputValue.trim() && uploadedFile) return;
    if (socket) {
      let messageData = {
        senderId: currentUserInfo.id,
        message: uploadedFile ? uploadedFile.file.name : inputValue,
        groupId: url.id,
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
  if (loading) {
    return <BigLoader />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid #D3D3D3',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        mt: 2,
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
          <KeyboardArrowLeftIcon onClick={() => navigate(`/org/${orgName}/chat`)} />
          <ManualAvatar chat={selectedChat.chatData && selectedChat.chatData} bgColor={bgColor} />
          <Box>
            {selectedChat.chatData.name && (
              <p style={{ fontSize: '18px' }}>{selectedChat.chatData.name}</p>
            )}
            <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
              {members.length > 0 && (
                <p
                  style={{
                    fontSize: '12px',
                    whiteSpace: 'normal',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '0',
                    maxHeight: 'calc(1.2em * 1)',
                    lineHeight: '1.2em',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {members.map((member, index) =>
                    index < members.length - 1 ? member.username + ', ' : member.username
                  )}
                </p>
              )}
            </div>
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
          position: 'relative',
        }}
      >
        {isLoader ? (
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
            }}
          >
            <img
              src={GroupChatDesktop}
              style={{
                height: '40vh',
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
          chat={selectedChat}
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
