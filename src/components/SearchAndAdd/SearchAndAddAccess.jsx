import { Stack } from '@mui/material';
import SearchResultsAccess from './SearchResultsAccess';
import SearchBoxAccess from './SearchBoxAccess';
import { useState } from 'react';

const SearchAndAddAccess = ({ itemType, courseId }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  return (
    <Stack
      sx={{
        borderRadius: '10px',
        bgcolor: '#fff',
      }}
    >
      <Stack
        justifyContent="space-between"
        sx={{
          position: 'relative',
        }}
      >
        <SearchBoxAccess
          input={input}
          setInput={setInput}
          setResults={setResults}
          itemType={itemType}
          courseId={courseId}
        />
        <SearchResultsAccess
          itemType={itemType}
          input={input}
          setInput={setInput}
          results={results}
          setResults={setResults}
          courseId={courseId}
        />
      </Stack>
    </Stack>
  );
};

export default SearchAndAddAccess;
