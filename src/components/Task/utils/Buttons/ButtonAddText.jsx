import { useState, useEffect } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import TaskModal from '../TaskModal';
import TextEditor from '../TextEditor';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BtnAddTextSubmission from './BtnAddTextSubmission';
import UtilFunctions from '../UtilFunctions';
import getRoleForOrganization from '../../../../utils/GetUserRoleInOrganization';

const ButtonAddText = ({ subtaskId, taskProgress }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      const userRole = await getRoleForOrganization();
      setRole(userRole);
    };
    getUserRole();
  }, []);
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [textSubmitted, setTextSubmitted] = useState(false);

  const progress = UtilFunctions.getSubtaskProgress(subtaskId, taskProgress);
  useEffect(() => {
    if (progress?.submission && progress?.submission?.submission !== null) {
      setTextValue(progress.submission.submission);
      setTextSubmitted(true);
    } else {
      setTextSubmitted(false);
    }
  }, [progress]);

  const onCloseTab = () => {
    setOpen(false);
  };

  const handleTextSubmitted = () => {
    setTextSubmitted(true);
  };
  return (
    <>
      {(role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR') ? (
        <>
          {textSubmitted ? (
            <Button
              onClick={() => setOpen(true)}
              size="small"
              variant="outlined"
              sx={{
                textTransform: 'none !important',
              }}
              endIcon={<ChevronRightIcon />}
            >
              View Text
            </Button>
          ) : (
            <Button
              disabled
              size="small"
              variant="outlined"
              endIcon={<ChevronRightIcon />}
              sx={{
                textTransform: 'none !important',
              }}
              onClick={() => setOpen(true)}
            >
              View Text
            </Button>
          )}
          <TaskModal open={open} setOpen={setOpen} title="View Text">
            <Stack sx={{ height: '100%' }} spacing={2}>
              <Typography
                sx={{
                  px: 0.8,
                  py: 0.2,
                  width: 'fit-content',
                  fontSize: '13px',
                  borderRadius: '4px',
                }}
              ></Typography>

              <TextEditor displayValue={textValue} />
            </Stack>
          </TaskModal>
        </>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Button
            onClick={() => setOpen(true)}
            size="small"
            variant="contained"
            sx={{
              width: '100%',
              textTransform: 'none !important',
            }}
            endIcon={<ChevronRightIcon />}
          >
            {textSubmitted === false ? 'Add Text' : 'Edit Text'}
          </Button>

          <TaskModal open={open} setOpen={setOpen} title="Add Text">
            <Stack sx={{ height: '100%' }} spacing={2}>
              <Typography
                sx={{
                  px: 0.8,
                  py: 0.2,
                  width: 'fit-content',
                  fontSize: '13px',
                  borderRadius: '4px',
                }}
              ></Typography>

              <TextEditor textValue={textValue} setTextValue={setTextValue} />

              <BtnAddTextSubmission
                textValue={textValue}
                subtaskId={subtaskId}
                onCloseTab={onCloseTab}
                onTextSubmitted={handleTextSubmitted}
              />
            </Stack>
          </TaskModal>
        </Box>
      )}
    </>
  );
};

export default ButtonAddText;
