import React, { useEffect, useState } from 'react';
import {
  Button,
  Popover,
  TextField,
  List,
  Divider,
  ListItem,
  Typography,
  ListItemButton,
  ListSubheader,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TaskAPI } from '../../../api/requests/tasks/taskAPI';
import { blueGrey } from '@mui/material/colors';

const DropdownWithSearch = ({ assigneeUserName, setAssigneeUserName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const searchUsers = async () => {
    let response = await TaskAPI.getAllUsers(searchText);
    setUsers(response);
  };
  useEffect(() => {
    searchText.length > 0 && searchUsers(searchText);
  }, [searchText]);
  return (
    <div style={{ height: '150px' }}>
      <Typography variant="subtitle2" sx={{ ml: 1.5, color: 'grey' }}>
        Assignee
      </Typography>
      <Button
        sx={{ width: '200px', textTransform: 'none' }}
        variant="contained"
        onClick={handleClick}
      >
        {assigneeUserName?.length > 0 ? assigneeUserName : 'Select Assignee +'}
        <KeyboardArrowDownIcon />
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ width: '230px', height: '150px' }}>
          <List
            sx={{
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                display: 'block',
                width: '7px',
              },
              '&::-webkit-scrollbar-thumb': {
                display: 'block',
                borderRadius: '30px',
                backgroundColor: blueGrey[50],
                boxShadow: 'box-shadow: 16px 4px 28px 0px rgba(0, 0, 0, 0.10) inset',
              },
            }}
            fullWidth
          >
            <ListSubheader>
              <TextField
                fullWidth
                placeholder="Search users"
                variant="outlined"
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon style={{ marginRight: '8px' }} />,
                }}
              />
            </ListSubheader>
            {users?.map((option, index) => (
              <>
                <ListItem fullWidth sx={{ padding: '0px', height: '35px' }}>
                  <ListItemButton
                    onClick={() => setAssigneeUserName(option?.username)}
                    selected={option?.username === assigneeUserName}
                    key={index}
                  >
                    {option.username}
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default DropdownWithSearch;
