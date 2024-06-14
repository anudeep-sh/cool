import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Typography } from '@mui/material';

export default function UserDetails({ user, setOpenDetails, currentUserInfo }) {
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
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        height: 'auto',
        alignItems: 'center',
        zIndex: '1',
        pr: 5,
        pl: 5,
      }}
    >
      <CloseIcon
        onClick={() => setOpenDetails(false)}
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
        }}
      />
      {user ? (
        <Avatar
          src={user.profilePhotoLink}
          style={{
            backgroundColor: user.profilePhotoLink ? 'transparent' : '#354150',
            color: user.profilePhotoLink ? 'black' : 'white',
            height: '80px',
            width: '80px',
            borderRadius: '50%',
          }}
        >
          {user.username.charAt(0).toUpperCase()}
        </Avatar>
      ) : user.profilePhotoLink ? (
        <Avatar
          src={user.profilePhotoLink}
          style={{
            backgroundColor: user.profilePhotoLink ? 'transparent' : '#354150',
            color: user.profilePhotoLink ? 'black' : 'white',
            height: '100px',
            width: '100px',
            borderRadius: '50%',
          }}
        >
          {user.username.charAt(0).toUpperCase()}
        </Avatar>
      ) : (
        <Avatar
          style={{
            backgroundColor: user.profilePhotoLink ? 'transparent' : '#354150',
            color: user.profilePhotoLink ? 'black' : 'white',
            height: '80px',
            width: '80px',
            borderRadius: '50%',
          }}
        >
          {user.username.charAt(0).toUpperCase()}
        </Avatar>
      )}
      <Typography
        sx={{
          mt: 1,
        }}
      >
        {user.senderData ? user.senderData.username : user.username}
      </Typography>
    </Box>
  );
}
