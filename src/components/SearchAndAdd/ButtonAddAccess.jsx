import { Button } from '@mui/material';
import { manipulateuserdata } from '../../Redux/UserData/User-Action';
import { SET_ALERT_DATA } from '../../Redux/UserData/User-Constants';
import { useDispatch, useSelector } from 'react-redux';
import { courseAPI } from '../../api/requests/courses/courseAPI';

const ButtonAddAccess = ({ courseId, setOpenManageAccessDialog }) => {
  const dispatch = useDispatch();

  const { accessUsersMapping } = useSelector((state) => state.AssignAccessReducer);
  const accessUsers = accessUsersMapping[courseId] || [];

  const ALERT_TIME = 5000;
  const handlealert = (text, type) => {
    dispatch(
      manipulateuserdata(SET_ALERT_DATA, {
        text: text,
        type: type,
      })
    );
    setTimeout(() => {
      dispatch(manipulateuserdata(SET_ALERT_DATA, { text: '', type: '' }));
    }, ALERT_TIME);
  };

  const handleSave = async () => {
    try {
      const usersArr = [];
      for (let i = 0; i < accessUsers?.length; i++) {
        usersArr.push(accessUsers[i].username);
      }
      const body = {
        usernames: usersArr,
        courseId: courseId,
      };
      const assignedAccess = await courseAPI.assignAccessToUser(body);
      handlealert('Access assigned Successfully', 'success');
      setOpenManageAccessDialog(false);
    } catch (err) {
      handlealert('Failed to Assign access', 'error');
    }
  };

  return (
    <Button
      sx={{
        width: { xs: 'auto', md: 'auto' },
      }}
      disabled={!accessUsers.length > 0}
      variant="contained"
      disableRipple
      onClick={handleSave}
    >
      Save
    </Button>
  );
};

export default ButtonAddAccess;
