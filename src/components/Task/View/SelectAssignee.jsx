import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskAPI } from '../../../api/requests/tasks/taskAPI';
import { CircularProgress } from '@mui/material';

const SelectAssignee = ({ getTaskProgress, userId }) => {
  const [assignees, setAssignees] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [currentAssignee, setCurrentAssignee] = useState(userId);
  const navigate = useNavigate();

  const getTaskAssignees = async () => {
    try {
      const { data } = await TaskAPI.getTaskAssignees(id);
      setAssignees(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTaskAssignees();
  }, []);

  useEffect(() => {
    userId && getTaskProgress(id, userId);
  }, [userId]);

  useEffect(() => {
    if (userId && assignees) {
      const userMatchesAssignee = assignees.some((assignee) => assignee.id === userId);
      if (!userMatchesAssignee) {
        navigate('/page-not-found');
      }
    }
  }, [userId, assignees]);

  const handleChange = (event) => {
    const newAssignee = event.target.value;
    setCurrentAssignee(newAssignee);
    const pathParts = window.location.pathname.split('/');
    pathParts[pathParts.length - 1] = newAssignee;
    const newPath = pathParts.join('/');
    navigate(newPath);
  };

  return (
    <>
      {loading ? (
        <CircularProgress size={12} />
      ) : (
        <FormControl size="small" sx={{ m: 1, minWidth: 120, width: '25%' }}>
          <Select
            sx={{ width: '100%' }}
            value={currentAssignee}
            onChange={handleChange}
            displayEmpty
          >
            {/* <MenuItem sx={{ maxWidth: '100%' }} value={null}>
              <em>None</em>
            </MenuItem> */}
            {assignees?.map((assignee) => (
              <MenuItem key={assignee.id} value={assignee.id}>
                {assignee.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default SelectAssignee;
