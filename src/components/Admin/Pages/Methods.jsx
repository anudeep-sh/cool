import React, { useState } from 'react';
import { Typography, TextField, Stack, Box, Modal, Fade, Tooltip, IconButton } from '@mui/material';
import MethodSelectorTable from './MethodSelector';
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import { handleAlert } from '../../../utils/handleAlert';
const baseUrl = process.env.REACT_APP_BASE_URL;
function CustomTable({ endpointData, backendId }) {
  const methodData = [
    { id: 1, name: 'GET' },
    { id: 2, name: 'POST' },
    { id: 4, name: 'DELETE' },
    { id: 3, name: 'PATCH' },
  ];
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(baseUrl);
    handleAlert('Url copied to clipboard', 'success');
  };
  const handleCopyToClipboardBackendId = () => {
    navigator.clipboard.writeText(backendId);
    handleAlert('Backend Id copied to clipboard', 'success');
  };
  const [openModal, setOpenModal] = useState(false);
  const [selectedEndpoints, setSelectedEndpoints] = useState({});

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleEndpointChange = (event, methodId) => {
    const selectedEndpointId = event.target.value;
    setSelectedEndpoints((prevSelectedEndpoints) => ({
      ...prevSelectedEndpoints,
      [methodId]: selectedEndpointId,
    }));
  };

  return (
    <>
      <Stack spacing={2.5}>
        <Box textAlign="left" mt={5} mb={10}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'black', mb: 2 }}>
            Here are the Available Endpoints
          </Typography>
          {/* <Typography variant="h6" gutterBottom sx={{ color: 'black' }} mt={1}>
            Choose from the available methods and endpoints or create your own!
          </Typography> */}
          <Stack alignItems="center" direction="row" spacing={1} mb={2}>
            <Typography variant="h6" sx={{ color: 'black' }}>
              Base Url :
            </Typography>
            <Stack
              sx={{
                borderRadius: '16px',
                border: '0.5px solid',
                borderColor: 'text.light',
                bgcolor: 'background.paper',
                px: 1,
                py: 0.4,
                width: 'fit-content',
                overflow: 'hidden',
                height: '2.2rem',
              }}
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              spacing={0}
            >
              <Typography variant="h6">{baseUrl}</Typography>
            </Stack>
            <Tooltip title="Copy to Clipboard">
              <IconButton sx={{ p: 0 }} onClick={handleCopyToClipboard}>
                <ContentPasteTwoToneIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={1} mb={1}>
            <Typography variant="h6" sx={{ color: 'black' }}>
              Backend Id :
            </Typography>
            <Stack
              sx={{
                borderRadius: '16px',
                border: '0.5px solid',
                borderColor: 'text.light',
                bgcolor: 'background.paper',
                px: 1,
                py: 0.4,
                width: 'fit-content',
                overflow: 'hidden',
                height: '2.2rem',
              }}
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              spacing={0}
            >
              <Typography variant="h6">{backendId}</Typography>
            </Stack>
            <Tooltip title="Copy to Clipboard">
              <IconButton sx={{ p: 0 }} onClick={handleCopyToClipboardBackendId}>
                <ContentPasteTwoToneIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Stack>

      <MethodSelectorTable
        methodData={methodData}
        endpointData={endpointData}
        selectedEndpoints={selectedEndpoints}
        handleEndpointChange={handleEndpointChange}
      />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        closeAfterTransition
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        <Fade in={openModal}>
          <div>
            <TextField variant="outlined" label="Custom Endpoint Logic" fullWidth />
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default CustomTable;
