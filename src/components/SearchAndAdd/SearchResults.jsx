import {
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemIcon,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { manipulateTask } from '../../Redux/Task/Task-Action';
import { ADD_ASSIGNEE, SET_SELECTED_SUBTASK } from '../../Redux/Task/Task-Constants';

function SearchResults({ itemType, input, setInput, results, setResults }) {
  const dispatch = useDispatch();
  const { subtasks, taskAssignees } = useSelector((state) => state.TaskReducer);
  const items = itemType === 'users' ? taskAssignees : subtasks[itemType];
  let isDuplicate = false;
  const key = itemType === 'users' ? 'username' : 'title';

  const isDuplicateItem = (result) => {
    isDuplicate = items.some((item) => item[key] === result[key]);
    return isDuplicate;
  };

  const handleClick = (result) => {
    if (itemType === 'users') {
      dispatch(manipulateTask(ADD_ASSIGNEE, { identifier: result.username }));
      setInput('');
    } else {
      dispatch(manipulateTask(SET_SELECTED_SUBTASK, result));
      setInput(result[key]);
    }
    setResults([]);
  };

  return (
    <List
      disablePadding
      sx={{
        position: 'absolute',
        top: '60px',
        bgcolor: '#fff',
        borderRadius: '6px',
        width: '100%',
        zIndex: '5',
        maxHeight: '300px',
        overflow: 'scroll',
        boxShadow: 3,
      }}
    >
      {input &&
        results.map((result) => {
          return (
            <ListItemButton
              key={result.id}
              disabled={itemType === 'users' ? isDuplicateItem(result) : false}
              onClick={() => handleClick(result)}
              sx={{
                paddingY: '4px !important',
                borderRadius: '6px',
                gap: '2px',
              }}
            >
              {itemType === 'users' ? (
                <ListItemAvatar>
                  <Avatar>
                    {result.image && (
                      <img
                        style={{
                          objectFit: 'cover',
                          maxWidth: '100%',
                          maxHeight: '100%',
                        }}
                        src={result.image}
                        alt=""
                      />
                    )}
                  </Avatar>
                </ListItemAvatar>
              ) : (
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
              )}

              <ListItemText
                sx={{ overflow: 'hidden' }}
                primary={
                  itemType === 'users' ? result.firstName + ' ' + result.lastName : result.title
                }
                secondary={itemType === 'users' ? result.username : ''}
              />
              {isDuplicate && (
                <ListItemIcon>
                  <CheckCircleIcon sx={{ opacity: '70%', ml: 2 }} />
                </ListItemIcon>
              )}
            </ListItemButton>
          );
        })}
    </List>
  );
}

export default SearchResults;
