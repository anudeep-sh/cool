import { Stack } from '@mui/material';
import TopBar from './TopBar';

const SearchAndAdd = ({ itemType }) => {
  return (
    <Stack
      sx={{
        borderRadius: '10px',
        bgcolor: '#fff',
      }}
    >
      <TopBar itemType={itemType} />
    </Stack>
  );
};

export default SearchAndAdd;
