import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';

const ManualAvatar = ({ chat, bgColor, width, height }) => {
  const initials =
    chat &&
    ((chat.name && chat.name.charAt(0)) ||
      (chat.username && chat.username.charAt(0)) ||
      (chat.chatData && chat.chatData.type === 'GROUP'
        ? chat.chatData.name && chat.chatData.name.charAt(0)
        : chat.chatData.username && chat.chatData.username.charAt(0)));

  return (
    <MuiAvatar
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: width || '40px',
        height: height || '40px',
        marginRight: '10px',
        backgroundColor: bgColor,
        color: '#fff',
        fontFamily: 'Poppins',
        fontSize: '19px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 'normal',
        borderRadius: '50%',
        textAlign: 'center',
        textTransform: 'uppercase',
      }}
    >
      {initials}
    </MuiAvatar>
  );
};

export default ManualAvatar;
