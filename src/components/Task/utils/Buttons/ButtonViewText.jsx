import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import TaskModal from '../TaskModal';
import TextEditor from '../TextEditor';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import getRoleForOrganization from '../../../../utils/GetUserRoleInOrganization';
import ButtonAssignOneSubtask from '../../CreateAndEdit/AssignSubtask';

const ButtonViewText = (props) => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      const userRole = await getRoleForOrganization();
      setRole(userRole);
    };
    getUserRole();
  }, []);
  return (
    <Box>
      <Box sx={{display:'flex'}}>
      {(role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR') && <ButtonAssignOneSubtask props={props?.subtask}/>}
      <Button
        variant={(role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR') ? 'outlined' : 'text'}
        sx={{ textTransform: 'none !important' }}
        size="small"
        endIcon={<ChevronRightIcon />}
        onClick={() => setOpen(true)}
      >
        View Text
      </Button>
      </Box>
      <TaskModal open={open} setOpen={setOpen} title="Assignment Details">
        <Stack sx={{ height: '100%' }} spacing={2}>
          <Typography
            sx={{
              border: `0.5px solid ${props.fileRequired ? '#6ad4bc' : '#bdbdbd'}`,
              px: 0.8,
              py: 0.2,
              width: 'fit-content',
              fontSize: '13px',
              borderRadius: '4px',
              color: `${props.fileRequired ? '#6ad4bc' : '#bdbdbd'}`,
            }}
          >
            {props.fileRequired==='true' ? 'File Required' : 'No File Required'}
          </Typography>
          <TextEditor displayValue={props.displayValue} />
        </Stack>
      </TaskModal>
    </Box>
  );
};

export default ButtonViewText;
