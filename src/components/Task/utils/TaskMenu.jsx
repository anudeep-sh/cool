import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Divider, ListItemIcon, ListItemText } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useState } from 'react';
import AddTaskDetails from '../CreateAndEdit/AddTaskDetails';
import TaskModal from './TaskModal';
import { TaskAPI } from '../../../api/requests/tasks/taskAPI';
import { useNavigate } from 'react-router-dom';
import { handleAlert } from '../../../utils/handleAlert';
import { getOrgName } from '../../../utils/appendOrgQuery';

export default function TaskMenu({ task, isParentTask, subtask }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const [clicked, setClicked] = useState('');
  const navigate = useNavigate();
  const orgName = getOrgName();
  const isOrgRoute = orgName != null;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTask = async () => {
    handleClose();
    if (isParentTask) {
      try {
        await TaskAPI.deleteTask(task.id);
        handleAlert('Task Deleted Successfully', 'success');
        window.location.reload();
      } catch (err) {
        handleAlert('Failed to Delete Task', 'error');
      }
    } else if (!isParentTask) {
      try {
        await TaskAPI.deleteSubTask(subtask.id);
        window.location.reload();
        handleAlert('Subtask Deleted Successfully', 'success');
      } catch (err) {
        handleAlert('Failed to Subtask Task', 'error');
      }
    }
  };

  const handleViewTask = () => {
    handleClose();
    if (isParentTask) {
      isOrgRoute
        ? navigate(`/org/${orgName}/task/progress/${task.id}`, {
            state: {
              id: task.id,
            },
          })
        : navigate(`/task/progress/${task.id}`, {
            state: {
              id: task.id,
            },
          });
    } else {
      setOpenModal(true);
      setClicked('view');
    }
  };

  const handleEditTask = () => {
    handleClose();
    setOpenModal(true);
    setClicked('edit');
  };

  return (
    <div>
      <Button
        disableRipple
        style={{ maxWidth: 'fit-content', minWidth: 'fit-content', padding: 0 }}
        onClick={handleClick}
      >
        {isParentTask ? (
          <MoreHorizIcon sx={{ color: 'grey' }} />
        ) : (
          <>
            <MoreVertOutlinedIcon sx={{ display: { md: 'none' }, color: 'grey' }} />
            <MoreHorizIcon sx={{ color: 'grey', display: { xs: 'none', md: 'block' } }} />
          </>
        )}
      </Button>
      <Menu
        elevation={4}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isParentTask && (
          <MenuItem sx={{ color: 'grey' }} onClick={handleViewTask}>
            <ListItemIcon>
              <VisibilityOutlinedIcon sx={{ color: 'grey' }} />
            </ListItemIcon>
            <ListItemText>View Progress</ListItemText>
          </MenuItem>
        )}

        <MenuItem sx={{ color: 'grey' }} onClick={handleEditTask}>
          <ListItemIcon>
            <EditOutlinedIcon sx={{ color: 'grey' }} />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteTask} sx={{ color: '#e57373' }}>
          <ListItemIcon>
            <DeleteOutlinedIcon sx={{ color: '#e57373' }} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      <TaskModal
        modalWidth={clicked === 'view' && 'auto'}
        modalHeight={clicked === 'view' && 'auto'}
        open={openModal}
        setOpen={setOpenModal}
      >
        {clicked === 'edit' && (
          <AddTaskDetails
            setOpen={setOpenModal}
            editMode={true}
            isParentTask={isParentTask}
            taskData={task}
            subtask={subtask}
          />
        )}
      </TaskModal>
    </div>
  );
}
