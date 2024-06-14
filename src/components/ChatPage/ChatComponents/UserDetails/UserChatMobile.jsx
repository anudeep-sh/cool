import React, { useState, useEffect } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../chat.css';
import { Typography } from '@mui/material';
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
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Menu, MenuItem, useTheme, useMediaQuery } from '@mui/material';
import BigLoader from '../../../Skeleton/BigLoader';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ConfirmationDialog from '../../../Dialogbox/ConfirmationDialog';
import SearchBar from '../SearchBar';
import { ParseMessageWithEmojis, isOnlyEmojis } from '../../../../utils/emojiChecker';
import ChatMessageLoader from '../../../Skeleton/ChatMessageLoader';
import UserChatImage from '../../../../assets/ChatImages/UserChat.svg';

export default function UserChatMobile({
  socket,
  setUserList,
  setUsersList,
  selectedChat,
  setSelectedChat,
}) {
  const url = useParams();
  const userName = url.name;
  const orgName = getOrgName();
  const bgColor = CommonColors.primaryBgColor;
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  const openMenu = Boolean(anchorEl);
  const onEmojiClick = (event) => {
    setInputValue((prevInputValue) => prevInputValue + event.emoji);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const updateMessages = (message) => {
    if (message.hasOwnProperty('created_at') && message.sender_id === currentUserInfo.id) {
      setMessages([...messages, message]);
    }
  };

  useEffect(() => {
    if (newMessage) {
      updateMessages(newMessage);
    }
  }, [newMessage]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isSmallScreen) {
      navigate(`/org/${orgName}/chat`);
    }
  }, [isSmallScreen]);
  useEffect(() => {
    if (selectedChat !== undefined && selectedChat !== null) {
      const userChatDetails = async () => {
        try {
          const response = await ChatApi.getUserChatDetails(
            selectedChat.chatData?.id ? selectedChat.chatData.id : selectedChat.id,
            1
          );
          if (response.message !== 'No chat found with this user') {
            setMessages(response.messages.reverse());
          }
          setShowSearchBar(false);
          setSearchInput('');
        } catch (error) {
          handleAlert(error.message, 'error');
        }
        setLoading(false);
      };
      userChatDetails();
    }
  }, [selectedChat]);

  useEffect(() => {
    setMessages([]);
    setIsLoader(true);
    const chatDetails = async () => {
      try {
        const response = await ChatApi.getUsers();
        const newChat = response.find(
          (user) => (user.senderData?.id ? user.senderData.id : user.id) === url.id
        );
        if (newChat) {
          setSelectedChat(newChat);
        }
      } catch (error) {
        handleAlert('Something went wrong', 'error');
      } finally {
        setLoading(false);
        setIsLoader(false);
      }
    };

    chatDetails();
  }, [url.id]);
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
      let receiverId = url.id;
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

          <ManualAvatar chat={selectedChat} bgColor={bgColor} />
          <Box>
            <p style={{ fontSize: '18px' }}>{userName}</p>
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
          user={selectedChat.senderData}
          setOpenDetails={setOpenDetails}
          currentUserInfo={currentUserInfo.id}
        />
      )}
    </Box>
  );
}
