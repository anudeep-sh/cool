import TaskHeader from './TaskHeader';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Stack, Box, Modal, Backdrop, Fade } from '@mui/material';

export default function TaskModal({
  open,
  setOpen,
  children,
  modalWidth,
  borderRadius,
  title,
  subtitle,
}) {
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: modalWidth
      ? modalWidth
      : {
          xs: '100vw',
          sm: '75vw',
          md: '85vw',
          lg: '70vw',
          xl: '65vw',
          xxl: '55vw',
        },
    maxHeight: '80vh',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    boxShadow: { sm: 24 },
    p: 4,
    borderRadius: borderRadius ? borderRadius : { sm: '10px' },
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Stack sx={{ display: 'flex', flexDirection: 'column', ...style }} spacing={2}>
            {title && (
              <Stack direction="row" justifyContent="space-between">
                <TaskHeader title={title} subtitle={subtitle} />
                <CloseOutlinedIcon
                  onClick={() => setOpen(false)}
                  sx={{ color: 'grey', cursor: 'pointer' }}
                />
              </Stack>
            )}
            {children}
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
