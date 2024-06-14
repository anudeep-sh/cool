import React from 'react';
import { Box } from '@mui/material';
import { CommonColors } from '../../utils/colors';
import ManualAvatar from '../Avatar/Avatar';
import MediaMessageBox from './MediaMessageBox';
import { ParseMessageWithEmojis, isOnlyEmojis } from '../../utils/emojiChecker';

const ChatMessagePanel = ({ message, isCurrentUser, prevMessage, style }) => {
  const bgColor = CommonColors.primaryBgColor;
  const messageTime = new Date(message.created_at);
  const prevMessageTime = prevMessage ? new Date(prevMessage.created_at) : null;

  const isSameUserAndTime = () => {
    if (!prevMessage || prevMessage.sender_id !== message.sender_id) {
      return false;
    }
    return (
      prevMessageTime &&
      messageTime.getMinutes() === prevMessageTime.getMinutes() &&
      messageTime.getHours() === prevMessageTime.getHours()
    );
  };

  const shouldShowAvatar = !isSameUserAndTime() || !prevMessage;
  const isOnlyEmoji = isOnlyEmojis(message.message);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '8px',
        ...style,
      }}
    >
      <Box display={'flex'} flexDirection={'column'} width={'100%'}>
        {message.type === 'INFO' && (
          <Box
            sx={{
              display: 'flex',
              width: 'fit-content',
              maxWidth: '80%',
              height: 'fit-content',
              padding: '4px 10px',
              marginLeft: 'auto',
              marginRight: 'auto',
              wordBreak: 'break-word',
              borderRadius: '21px',
              border: '1px solid #D3D3D3',
              backgroundColor: '#E6E6E6',
              color: '#6E6E6E',
            }}
          >
            {message.message}
          </Box>
        )}
        {isCurrentUser && (
          <Box
            sx={{
              alignSelf: 'flex-end',
              fontSize: '10px',
            }}
          >
            {messageTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Box>
        )}
        {shouldShowAvatar && !isCurrentUser && (
          <Box
            sx={{
              marginLeft: '50px',
              alignSelf: 'flex-start',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {message.username}{' '}
            <span style={{ fontWeight: 'normal', fontSize: '10px' }}>
              {messageTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </Box>
        )}
        <Box display={'flex'}>
          <Box>
            {!isCurrentUser &&
              shouldShowAvatar &&
              (message.profilePhotoLink ? (
                <img
                  src={message.profilePhotoLink}
                  alt="profile"
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
              ) : (
                <ManualAvatar chat={message} bgColor={bgColor} width="40px" height="40px" />
              ))}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              padding: isOnlyEmoji ? '5px' : '10px 15px',
              border: '1px solid #D3D3D3',
              borderRadius: isCurrentUser ? '15px 0 15px 15px ' : '0 15px 15px 15px ',
              width: 'fit-content',
              maxWidth: '50%',
              marginLeft: isCurrentUser ? 'auto' : !shouldShowAvatar ? '50px' : '0px',
              wordBreak: 'break-word',
              backgroundColor: isCurrentUser ? 'white' : 'rgba(140, 164, 248, 0.39)',
            }}
          >
            {message.type === 'FILE' ? (
              <MediaMessageBox message={message} />
            ) : (
              <ParseMessageWithEmojis message={message.message} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessagePanel;
