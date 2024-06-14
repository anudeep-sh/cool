import { Button, List, ListItem, Box, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import TaskModal from '../TaskModal';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LinearProgressWithLableReusable from '../../../LinearProgress/LinearProgressWithLabelReusable';
import getRoleForOrganization from '../../../../utils/GetUserRoleInOrganization';
import ButtonAssignOneSubtask from '../../CreateAndEdit/AssignSubtask';
import { useParams } from 'react-router-dom';

const ButtonViewSections = ({ sections, id, subtask, progressData }) => {
  const { userId } = useParams();
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
    <Box sx={{ display: 'flex' }}>
      {!progressData && (role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR') && (
        <ButtonAssignOneSubtask props={subtask} />
      )}
      <Button
        endIcon={<ChevronRightIcon />}
        onClick={() => setOpen(true)}
        size="small"
        variant="outlined"
        sx={{
          minWidth: 'fit-content',
          maxWidth: 'fit-content',
          textTransform: 'none !important',
        }}
      >
        {(role === 'ADMIN' || role === 'SUPERADMIN' || role === 'CREATOR') ? 'View Sections' : 'View '}
      </Button>
      <TaskModal
        modalWidth={{ xs: '95vw', sm: '75vw', md: '60vw', lg: '55vw' }}
        modalHeight={{ xs: '95vh', sm: '80vh', md: '70vh', lg: '65vh' }}
        borderRadius="10px"
        open={open}
        setOpen={setOpen}
        title="Section List"
        subtitle="View all the assigned sections for the course"
      >
        <Stack sx={{ height: '100%' }} spacing={2}>
          <List
            sx={{
              height: '100%',
              border: '1.5px solid #e0e0e0',
              borderRadius: '10px',
              my: 2,
              px: 2,
              overflow: 'scroll',
            }}
          >
            {sections?.map((section, i) => (
              <ListItem
                key={i}
                sx={{
                  borderBottom: '1px solid #e0e0e0',
                  py: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TagOutlinedIcon sx={{ color: 'grey', mr: 2.5 }} />
                  <Typography>{section?.sectionTitle}</Typography>
                </Box>
                <Box>
                  {userId && (
                    <LinearProgressWithLableReusable
                      progressCount={section?.progressCount}
                      displayTitle={section?.displayTitle}
                      display={section?.display}
                    />
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        </Stack>
      </TaskModal>
    </Box>
  );
};

export default ButtonViewSections;
