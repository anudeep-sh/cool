import React from 'react';
import { Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import filteredData from './SearchFilters';
import { manipulateAccessUsers } from '../../Redux/AssignAccess/AssignAccess-Action';
import { REMOVE_SELECTED_USER } from '../../Redux/AssignAccess/AssignAccess-Constants';
import { Button } from '@mui/material';

import { useState } from 'react';
import { TaskAPI } from '../../api/requests/tasks/taskAPI';
import { useEffect } from 'react';
import { courseAPI } from '../../api/requests/courses/courseAPI';

function SearchBoxAccess({ itemType, input, setInput, setResults }) {
  const handleSearch = async () => {
    const searchQuery = input.toLowerCase();
    const results = await courseAPI.getUsers(searchQuery);
    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    setResults([]);
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <Stack sx={{ position: 'relative', width: '100%' }}>
      <Stack
        p={1.5}
        spacing={1}
        sx={{
          bgcolor: '#F5F5F5',
          borderRadius: '6px',
          border: '2px solid #e0e0e0',
          color: 'grey',
          flexGrow: 1,
          width: '100%',
        }}
        direction="row"
        alignItems="center"
      >
        <SearchIcon />
        <input
          style={{
            border: 'none',
            outline: 'none',
            backgroundColor: '#F5F5F5',
            width: '100%',
            fontSize: '16px',
          }}
          placeholder={`Search ${itemType} `}
          onChange={(e) => handleChange(e.target.value)}
          value={input}
        ></input>
        {input && <ClearIcon sx={{ cursor: 'pointer' }} onClick={handleClear} />}
        <Button onClick={handleSearch}>Search</Button>
      </Stack>
    </Stack>
  );
}

export default SearchBoxAccess;
