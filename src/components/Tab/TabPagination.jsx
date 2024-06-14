import React from 'react';
import { Box, Button } from '@mui/material';

const TabPagination = ({ page, setPage, maxPage }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
        position: 'fixed',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 2,
        backgroundColor: 'white',
      }}
    >
      <Button
        disabled={page === 1 || maxPage === 0}
        onClick={() => setPage((prev) => prev - 1)}
        sx={{ mr: 1 }}
      >
        Previous
      </Button>
      <Button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === maxPage || maxPage === 0}
      >
        Next
      </Button>
    </Box>
  );
};

export default TabPagination;
