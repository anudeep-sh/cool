import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CERTIFICATE from '../../assets/certificate_dialogue.svg';
import { Button } from '@mui/material';

export default function GetCertificate({ courseTitle, coursePercentage }) {
  const [openDialogue, setOpenDialogue] = useState(false);

  const handleCertificateClick = () => {
    setOpenDialogue(true);
  };

  const handleClose = () => {
    setOpenDialogue(false);
  };
  return (
    <div>
      <Button
        variant="contained"
        size="small"
        disabled={coursePercentage === 100 ? false : true}
        onClick={handleCertificateClick}
        sx={{ marginLeft: '2.5rem' }}
      >
        Get Certificate
      </Button>
      <Dialog
        open={openDialogue}
        sx={{
          textAlign: 'center',
        }}
      >
        <DialogContent
          sx={{
            paddingBottom: '0',
            paddingTop: '0',
          }}
        >
          <img
            style={{
              width: '50%',
              height: '50%',
              textAlign: 'center',
            }}
            src={CERTIFICATE}
            alt=""
          />
        </DialogContent>
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            paddingTop: '0px',
            fontSize: '25px',
          }}
        >
          CONGRATULATIONS! 🎉🎊
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            {`You have successfully completed the course ${courseTitle} !`}
          </DialogContentText>
          <DialogContentText
            sx={{
              textAlign: 'center',
              paddingTop: '20px',
              fontSize: '17px',
              color: 'rgba(0, 0, 0, 0.70)',
            }}
          >
            Your certificate will be mailed to you within 24 hours. In case of delay, please reach
            out to us at &nbsp;
            <a
              style={{
                color: 'rgba(0, 0, 0, 0.70)',
              }}
              href="mailto:support@optigrit.com"
            >
              support@optigrit.com
            </a>
            .
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialogue(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
