import { Avatar, Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function UserSearchList({
  input,
  setInput,
  searchedUsers,
  handleChatClick,
  handleAddition,
  width,
  placeholder,
  style,
  height,
  marginTop,
}) {
  return (
    <Box
      marginTop={marginTop || '0'}
      width={width}
      display={'flex'}
      alignItems={'center'}
      marginX={'auto'}
      justifyContent={'center'}
      position={'relative'}
      gap={'10px'}
      sx={{
        pt: 2,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder || 'Search...'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: { height },
            fontSize: '15px',
          },
          '& .MuiSvgIcon-root': {
            fontSize: '20px',
          },
          width: '100%',
        }}
        {...style}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {searchedUsers.length > 0 && (
        <Box
          width={'100%'}
          border={'1px solid #D3D3D3 '}
          maxHeight={'120px'}
          height={'120px'}
          marginTop={'10px'}
          top={'100%'}
          backgroundColor={'white'}
          sx={{ overflowY: 'auto', position: 'absolute', zIndex: 10 }}
        >
          {searchedUsers.map((user, index) => (
            <Box
              display={'flex'}
              flexDirection={'column'}
              marginTop={'4px'}
              alignItems={'start'}
              key={user.id}
              borderBottom={'1px solid #D3D3D3'}
              padding={'4px'}
              sx={{
                cursor: 'pointer',
              }}
            >
              <Box
                display={'flex'}
                gap={1}
                alignItems={'center'}
                fontSize={'14px'}
                onClick={() => {
                  handleChatClick && handleChatClick(user);
                  handleAddition(user);
                }}
              >
                <Avatar
                  src={user.profilePhotoLink}
                  style={{
                    backgroundColor: user.profilePhotoLink ? 'transparent' : '#354150',
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
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
