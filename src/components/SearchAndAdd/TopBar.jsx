import { Stack } from '@mui/material';
import SearchResults from './SearchResults';
import SearchBox from './SearchBox';
import { useState } from 'react';

const TopBar = ({ itemType }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  return (
    <Stack
      justifyContent="space-between"
      sx={{
        position: 'relative',
      }}
    >
      <SearchBox input={input} setInput={setInput} setResults={setResults} itemType={itemType} />
      <SearchResults
        itemType={itemType}
        input={input}
        setInput={setInput}
        results={results}
        setResults={setResults}
      />
    </Stack>
  );
};

export default TopBar;