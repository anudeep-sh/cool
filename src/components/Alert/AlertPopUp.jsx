import { Alert } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

function AlertPopUp() {
  const text = useSelector((state) => state.UserReducer.text);
  const type = useSelector((state) => state.UserReducer.type);
  if (text && type) {
    return (
      <Alert
        severity={type}
        sx={{
          position: 'fixed',
          top: '10%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10000,
        }}
      >
        {text}
      </Alert>
    );
  } else {
    return <></>;
  }
}

export default AlertPopUp;
