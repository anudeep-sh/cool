import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const DeleteDialog = ({
  openDeleteDialog,
  handleClose,
  handleCloseDeleteDialog,
  handleDelete,
  username,
}) => {
  return (
    <Dialog
      open={openDeleteDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <DialogTitle id="alert-dialog-title">
        {'Do you really want to remove user access?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Revoke the course access from this user?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleDelete(username)}>Yes</Button>
        <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
