import { Typography } from '@mui/material';

const NumberBadge = ({ num, isActive }) => {
  return (
    <Typography
      px={0.9}
      sx={{
        borderRadius: '6px',
        bgcolor: isActive ? '#698AFF' : 'grey',
        color: '#fff',
        ml: 1,
        fontSize: '14px',
      }}
    >
      {num}
    </Typography>
  );
};

export default NumberBadge;
