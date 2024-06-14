import React from 'react';
import { Box, Button } from '@mui/material';

export default function SearchBar({ handleCancelSearch, searchInput, setSearchInput }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderBottom: '1px solid #D3D3D3',
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <Button variant="contained" sx={{ marginLeft: '10px' }}>
        Search
      </Button>
      <Button variant="outlined" sx={{ marginLeft: '10px' }} onClick={handleCancelSearch}>
        Cancel
      </Button>
    </Box>
  );
}
