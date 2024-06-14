import { Avatar, Box } from '@mui/material';
import { CommonColors } from '../../utils/colors';

export default function ChatListCard({
  handleChatClick,
  profilePhotoLink,
  name,
  latestMessage,
  chat,
  selectedChat,
  index,
  unreadMessagesCount,
}) {
  const bgColor = CommonColors.primaryBgColor;
  const activeChatBgColor = CommonColors.sideBarBgColor;
  return (
    <Box
      key={index}
      onClick={() => handleChatClick(chat)}
      sx={{
        cursor: 'pointer',
        padding: 1,
        backgroundColor: selectedChat === chat ? activeChatBgColor : '',
        margin: '2px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {profilePhotoLink ? (
        <img
          src={profilePhotoLink}
          alt="profile"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            marginRight: '10px',
          }}
        />
      ) : (
        <Avatar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '40px',
            height: '40px',
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
          {name && name.charAt(0)}
        </Avatar>
      )}
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
        <Box
          style={{
            disBoxlay: 'flex',
            flexDirection: 'column',
            padding: 0,
            width: '100%',
            color: '#0000008c',
          }}
        >
          <Box display={'flex'} justifyContent={'space-between'}>
            <p
              style={{
                fontWeight: 'bold',
              }}
            >
              {name?.length > 12 ? `${name?.slice(0, 12)}...` : name}
            </p>
          </Box>
          <p>
            {latestMessage ? (
              latestMessage.length > 12 ? (
                latestMessage.slice(0, 12) + '...'
              ) : (
                latestMessage
              )
            ) : (
              <>&nbsp;</>
            )}
          </p>
        </Box>
        {unreadMessagesCount > 0 && (
          <span
            style={{
              backgroundColor: '#8ca4f8',
              color: 'white',
              width: '24px',
              height: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              flexShrink: 0,
            }}
          >
            {unreadMessagesCount}
          </span>
        )}
      </Box>
    </Box>
  );
}
