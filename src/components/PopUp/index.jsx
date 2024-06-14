import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function Popup({
  open,
  handleClose,
  heading,
  tesxtFieldLabel,
  onClickFunction,
  setTextFiledValue,
}) {
  const handleInputChange = (e) => {
    setTextFiledValue(e.target.value);
  };

  const handleSubmit = () => {
    onClickFunction();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              mb: 3,
            }}
          >
            {heading}
          </Typography>

          <TextField
            fullWidth
            required
            id="outlined-required"
            label={tesxtFieldLabel}
            onChange={handleInputChange}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 4,
            }}
          >
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
