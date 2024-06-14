import { Stack, Box, TextField } from '@mui/material';
import SearchAndAdd from '../../SearchAndAdd';
import TextEditor from '../utils/TextEditor';
import SelectOptions from './SelectOptions';

const SubtaskType = ({ type, selectedSections, setSelectedSections }) => {
  return (
    <Stack sx={{ width: '100%', height: '100%' }} spacing={2}>
      <Stack sx={{ height: '100%' }} spacing={3}>
        <Stack sx={{ height: '100%' }} spacing={0.5}>
          {type !== 'text' ? (
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2}>
                <Box sx={{ width: 320 }}>
                  <SearchAndAdd itemType={type} />
                </Box>
                {type === 'course' ? (
                  <SelectOptions
                    selectedSections={selectedSections}
                    setSelectedSections={setSelectedSections}
                  />
                ) : (
                  <TextField
                    sx={{
                      '& .MuiInputBase-input': {
                        height: '27.2px',
                        padding: '12px',
                      },
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#698aff',
                        },
                      },
                    }}
                    required
                    label="Minimum Score"
                  />
                )}
              </Stack>
            </Stack>
          ) : (
            <TextEditor />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SubtaskType;
