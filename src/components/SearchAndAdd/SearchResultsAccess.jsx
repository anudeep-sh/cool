import {
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemIcon,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { manipulateAccessUsers } from '../../Redux/AssignAccess/AssignAccess-Action';
import { ADD_ACCESS_USER } from '../../Redux/AssignAccess/AssignAccess-Constants';
import GetValidatedTokenData from '../../utils/helper';

function SearchResultsAccess({ itemType, input, setInput, results, setResults, courseId }) {
  const dispatch = useDispatch();
  const currUser = GetValidatedTokenData();
  const { accessUsersMapping } = useSelector((state) => state.AssignAccessReducer);
  const accessUsers = accessUsersMapping[courseId] || [];
  const items = accessUsers;
  let isDuplicate = false;
  const key = 'username';
  const isDuplicateItem = (result) => {
    isDuplicate = items.some((item) => item[key] === result[key]);
    return isDuplicate;
  };

  const handleClick = (result) => {
    dispatch(manipulateAccessUsers(ADD_ACCESS_USER, { courseId, user: result }));
    setInput('');
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
              disabled={result.username === currUser.username || isDuplicateItem(result)}
              onClick={() => handleClick(result)}
              sx={{
                paddingY: '4px !important',
                borderRadius: '6px',
                gap: '2px',
              }}
            >
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

              <ListItemText
                sx={{ overflow: 'hidden' }}
                primary={result.firstName + ' ' + result.lastName}
                secondary={result.username}
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

export default SearchResultsAccess;
