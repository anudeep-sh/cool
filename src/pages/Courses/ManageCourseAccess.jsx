import { Stack, Typography, Chip, Avatar, Grid, Box } from '@mui/material';
import SearchAndAdd from '../../components/SearchAndAdd';
import ButtonAddAccess from '../../components/SearchAndAdd/ButtonAddAccess';
import SearchAndAddAccess from '../../components/SearchAndAdd/SearchAndAddAccess';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { manipulateAccessUsers } from '../../Redux/AssignAccess/AssignAccess-Action';
import {
  ADD_ACCESS_USER,
  REMOVE_ACCESS_USER,
} from '../../Redux/AssignAccess/AssignAccess-Constants';
import { courseAPI } from '../../api/requests/courses/courseAPI';
import { userAPI } from '../../api/requests/users/userAPI';
import DeleteDialog from '../../components/Dialogbox/DeleteDialog';
import { SET_ALERT_DATA } from '../../Redux/UserData/User-Constants';
import { manipulateuserdata } from '../../Redux/UserData/User-Action';

const ManageCourseAccess = ({ courseId, handleClose }) => {
  const { accessUsersMapping } = useSelector((state) => state.AssignAccessReducer);
  const accessUsers = accessUsersMapping[courseId] || [];

  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const dispatch = useDispatch();
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

  const handleDelete = async (username) => {
    setOpenDeleteDialog(false);
    try {
      const data = await courseAPI.deleteAccessAssignee(username, courseId);
      if (data !== 'success') throw new Error('Failed to delete access');
      dispatch(manipulateAccessUsers(REMOVE_ACCESS_USER, { courseId, username }));
    } catch (error) {
      handlealert('Failed to delete access', 'error');
    }
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  useEffect(() => {
    if (!courseId) return;
    if (accessUsersMapping[courseId]) return;
    const fetchAccessUsers = async () => {
      try {
        const usernames = await courseAPI.getAccessAssignees(courseId);
        for (const user of usernames) {
          dispatch(manipulateAccessUsers(ADD_ACCESS_USER, { courseId, user }));
        }
      } catch (error) {}
    };
    fetchAccessUsers();
  }, []);

  return (
    <Stack spacing={0.5} sx={{ width: '100%', height: '100%' }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box sx={{ width: { xs: '100%', md: 350 } }}>
            <SearchAndAddAccess itemType="users" courseId={courseId} />
          </Box>
        </Stack>
        <Stack
          direction="row"
          sx={{
            p: 1,
            height: '220px',
            overflowY: 'scroll',
            border: '2px solid #e0e0e0',
            bgColor: '#f5f5f5',
            borderRadius: '6px',
            alignContent: 'flex-start',
            gap: '6px',
            flexWrap: 'wrap',
          }}
        >
          {accessUsers.length > 0 ? (
            accessUsers.map((user) => (
              <>
                <Chip
                  sx={{ alignSelf: 'start' }}
                  onDelete={() => {
                    setOpenDeleteDialog(true);
                    setSelectedUser(user.username);
                  }}
                  avatar={<Avatar src={user.image} />}
                  label={user.username}
                />
                <DeleteDialog
                  openDeleteDialog={openDeleteDialog}
                  handleCloseDeleteDialog={handleCloseDeleteDialog}
                  handleDelete={handleDelete}
                  username={selectedUser}
                />
              </>
            ))
          ) : (
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ color: 'grey', width: '100%', height: '100%' }}
            >
              Search above to provide access
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ManageCourseAccess;
