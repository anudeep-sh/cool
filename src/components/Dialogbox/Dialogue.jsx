import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Dialogue = ({
  opendia,
  setOpendia,
  title,
  content,
  handleChange,
  i,
  id,
  children,
  maxWidth,
  add,
}) => {
  return (
    <Dialog
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: { maxWidth }, // Set your width here
          },
        },
      }}
      open={opendia}
    >
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      {content ? (
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
        </DialogContent>
      ) : null}
      {children}
      <DialogActions>
        <Button
          onClick={() => {
            setOpendia(false);
          }}
        >
          Cancel
        </Button>
        {handleChange ? (
          <Button
            onClick={() => {
              handleChange(i, id);
            }}
          >
            OK
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default Dialogue;
