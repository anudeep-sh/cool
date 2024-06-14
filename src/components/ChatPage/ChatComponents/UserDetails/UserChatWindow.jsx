import React, { useState, useEffect } from 'react';
import { Box, Menu, MenuItem, useTheme, useMediaQuery, Typography } from '@mui/material';
import '../chat.css';
import { getOrgName } from '../../../../utils/appendOrgQuery';
import { ChatApi } from '../../../../api/requests/chat/ChatApi';
import GetValidatedTokenData from '../../../../utils/helper';
import { CommonColors } from '../../../../utils/colors';
import ManualAvatar from '../../../Avatar/Avatar';
import UserDetails from './UserDetails';
import EmojiPicker from 'emoji-picker-react';
import ChatInputField from '../../../InputField/ChatInputField';
import { handleAlert } from '../../../../utils/handleAlert';
import Skeletons from '../../../Skeleton/Skeletons';
import MediaMessageBox from '../../../MessageBox/MediaMessageBox';
import { ParseMessageWithEmojis } from '../../../../utils/emojiChecker';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ConfirmationDialog from '../../../Dialogbox/ConfirmationDialog';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar';
import ChatMessageLoader from '../../../Skeleton/ChatMessageLoader';
import UserChatImage from '../../../../assets/ChatImages/UserChat.svg';

export default function UserChatWindow({
  chat,
  setUserList,
  setSelectedChat,
  socket,
  selectedChat,
}) {
  const bgColor = CommonColors.primaryBgColor;
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [uploadLoader, setUploadLoader] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [newMessage, setNewMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const orgName = getOrgName();
  const [isLoader, setIsLoader] = useState(false);

  const onEmojiClick = (event) => {
    setInputValue((prevInputValue) => prevInputValue + event.emoji);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const updateMessages = (message) => {
    if (message.hasOwnProperty('created_at') && message.sender_id === currentUserInfo.id) {
      setMessages([...messages, message]);
      setUserList((prevUserList) =>
        prevUserList.map((user) => {
          if (
            (user.chatData ? user.senderData.id : user.id) ===
            (chat.chatData ? chat.senderData.id : chat.id)
          ) {
            return {
              ...user,
              lastMessageData: {
                ...user.lastMessageData,
                message: message.message,
              },
            };
          }
          return user;
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
    setIsLoader(true);
    const userChatDetails = async () => {
      try {
        const id = chat.chatData?.id || chat.id;
        const response = await ChatApi.getUserChatDetails(id, 1);
        if (response.message !== 'No chat found with this user') {
          setMessages(response.messages.reverse());
        }
        setShowSearchBar(false);
        setSearchInput('');
      } catch (error) {
        handleAlert(error.message, 'error');
      } finally {
        setIsLoader(false);
      }
    };

    userChatDetails();
  }, [chat]);
  const handleDeleteUserChat = async () => {
    try {
      const response = await ChatApi.deleteUserChat(selectedChat.senderData.id);
      setUserList((prevUsers) =>
        prevUsers.filter((item) => item.senderData.id !== selectedChat.senderData.id)
      );
      setOpenDetails(false);
      handleAlert(response.message, 'success');
      setSelectedChat(null);
      navigate(`/org/${orgName}/chat`);
    } catch (error) {
      handleAlert('Something went wrong', 'error');
    }
  };
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
        organization: getOrgName(),
      };

      if (uploadedFile) {
        messageData = {
          ...messageData,
          type: 'FILE',
          url: uploadedFile.url,
        };
      }
      const receiverId = chat.senderData ? chat.senderData.id : chat.id;
      messageData.receiverId = receiverId;
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
  const handleConfirmation = (action) => {
    setConfirmationAction(action);
    setShowConfirmation(true);
  };
  const handleAction = async () => {
    if (confirmationAction === 'delete') {
      handleDeleteUserChat();
    }
    setShowConfirmation(false);
  };
  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid #D3D3D3',
        height: isSmallScreen ? '90vh' : '100%',
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
          <Box>
            <p style={{ fontSize: '18px' }}>
              {chat.senderData ? chat.senderData.username : chat.username}
            </p>
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
            <MenuItem onClick={() => handleConfirmation('delete')}>Delete Chat</MenuItem>
          </Menu>
          <ConfirmationDialog
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            onConfirm={handleAction}
            title={confirmationAction === 'delete' && 'Confirm Chat Deletion'}
            message={
              "You'll not be able to access this chat. Are you sure you want to delete this Chat?"
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
        ) : messages.length === 0 ? (
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
              src={UserChatImage}
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
              Send a message to start the chat!
            </Typography>
          </Box>
        ) : (
          messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
                padding: '10px',
                border: '1px solid #D3D3D3',
                borderRadius: '10px',
                width: 'fit-content',
                maxWidth: '50%',
                marginBottom: '4px',
                marginLeft: message.sender_id === currentUserInfo.id ? 'auto' : '0px',
                pointerEvents: openDetails || uploadLoader ? 'none' : 'auto',
                opacity: openDetails || uploadLoader ? 0.5 : 1,
                wordBreak: 'break-word',
              }}
            >
              {message.type === 'FILE' ? (
                <MediaMessageBox message={message} />
              ) : (
                <ParseMessageWithEmojis message={message.message} />
              )}
            </Box>
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
              marginLeft: 'auto',
              padding: '10px',
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
        <UserDetails
          user={chat.senderData}
          setOpenDetails={setOpenDetails}
          currentUserInfo={currentUserInfo.id}
        />
      )}
    </Box>
  );
}
