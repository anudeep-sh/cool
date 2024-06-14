import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSubtask({ type, setType, editMode, subtaskData }) {
  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <FormControl required sx={{ width: 250 }}>
      <InputLabel>Subtask Type</InputLabel>
      <Select
        sx={{
          boxShadow: 'none',
          '& .MuiSelect-select': {
            borderRadius: '6px',
            border: 'none',
          },

          '.MuiOutlinedInput-notchedOutline': { border: '2px solid #e0e0e0' },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: '2px solid #e0e0e0',
          },
        }}
        value={type}
        label="Subtask Type"
        onChange={handleChange}
      >
        <MenuItem
          disabled={editMode && subtaskData?.type.toLowerCase() !== 'course' ? true : false}
          value="course"
        >
          Course
        </MenuItem>
        <MenuItem
          disabled={editMode && subtaskData?.type.toLowerCase() !== 'contest' ? true : false}
          value="contest"
        >
          Contest
        </MenuItem>
        <MenuItem
          disabled={editMode && subtaskData?.type.toLowerCase() !== 'text' ? true : false}
          value="text"
        >
          Text
        </MenuItem>
      </Select>
    </FormControl>
  );
}
