import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const RankingTopBar = ({ onSearchChange, placeHolder }) => {
  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '90%' },
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          border: 0,
          borderColor: 'white',
        }}
        noValidate
        autoComplete="off"
        margin="auto"
      >
        <TextField
          InputProps={{
            sx: { height: 35, justifyContent: 'center', alignItems: 'center' },
          }}
          sx={{
            borderRadius: 1,
            borderColor: 'white',
            textDecorationColor: 'white',
            border: 0,
          }}
          placeholder={placeHolder}
          variant="outlined"
          onChange={() => {
            onSearchChange();
          }}
        />
      </Box>
    </div>
  );
};

export default RankingTopBar;
