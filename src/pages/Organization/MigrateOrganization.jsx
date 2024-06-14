import {
  Box,
  Autocomplete,
  TextField,
  Stack,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  InputLabel,
  MenuItem,
  Select,
  DialogContentText,
  Chip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { organizationAPI } from '../../api/requests/organization/organizationAPI';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import { handleAlert } from '../../utils/handleAlert';

const MigrateOrganization = () => {
  const drawerWidth = 240;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [openEmailDialogue, setOpenEmailDialogue] = useState(false);

  const handleClickOpenEdit = () => {
    setName(selectedDomain?.name);
    setDomain(selectedDomain?.domain);
    setSupportMail(selectedDomain?.supportMail);
    setPhoneNumber(selectedDomain?.phoneNumber);
    setSize(selectedDomain?.size);
    setHeadquarters(selectedDomain?.headquarters);
    setAddress(selectedDomain?.address);
    setSpoc(selectedDomain?.SPOC);

    setOpenEdit(true);
  };

  const handleOpenEmailDialogue = () => {
    setOpenEmailDialogue(true);
  };

  const handleCloseEmailDialogue = () => {
    setOpenEmailDialogue(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseDeleteDialog = () => [setOpenDeleteDialog(false)];

  const [selectedDomain, setSelectedDomain] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [changeStatusDialogue, setChangeStatusDialogue] = useState(false);
  const [viewStatus, setViewStatus] = useState('');

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleClickOpen = () => {
    setChangeStatusDialogue(true);
  };

  const handleClose = () => {
    setChangeStatusDialogue(false);
  };

  const getAllOrganizations = async () => {
    try {
      const data = await organizationAPI.searchOrganization('');
      setOrganizations(data);
    } catch (err) {}
  };

  useEffect(() => {
    getAllOrganizations();
  }, []);

  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [supportMail, setSupportMail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [size, setSize] = useState('');
  const [headquarters, setHeadquarters] = useState('');
  const [address, setAddress] = useState('');
  const [spoc, setSpoc] = useState('');
  const [userEmails, setUserEmails] = useState([]);

  const migrateToPublic = async () => {
    if (selectedDomain) {
      try {
        const data = await organizationAPI.migrateOrganizationToPublic(selectedDomain.id);
        handleAlert('Migrated To Public', 'success');
      } catch (err) {
        handleAlert('Could not migrate to public', 'error');
      }
    } else {
      handleAlert('Please Select An Organization First', 'error');
    }
  };

  const migrateToOrganization = async () => {
    if (selectedDomain) {
      try {
        const data = await organizationAPI.migrateToOrganization(selectedDomain.id);
        handleAlert('Migrated To Organization', 'success');
      } catch (err) {
        handleAlert('Could not Migrate To Organization', 'error');
      }
    } else {
      handleAlert('Please Select An Organization First', 'error');
    }
  };

  const checkOrganizationStatus = async () => {
    if (selectedDomain) {
      try {
        const data = await organizationAPI.verifyOrganization(selectedDomain.domain);
        handleAlert(`The Organization Is ${data.status}`, 'success');
      } catch (err) {
        handleAlert('Organization Not Found', 'error');
      }
    } else {
      handleAlert('Please Select An Organization First', 'error');
    }
  };

  const handleDeleteDialog = (type) => {
    setOpenDeleteDialog(true);
    setType(type);
  };

  const changeOrganizationStatus = async () => {
    if (selectedDomain) {
      try {
        const body = {
          status: status,
        };
        const change = await organizationAPI.changeOrganizationStatus(selectedDomain.id, body);
        setChangeStatusDialogue(false);
        handleAlert('Organization Status Changed', 'success');
      } catch (err) {
        handleAlert('Could Not Change Status', 'error');
      }
    } else {
      handleAlert('Please Select An Organization First', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDomain) {
      try {
        const body = {
          name: name,
          domain: domain,
          supportMail: supportMail,
          phoneNumber: phoneNumber,
          size: size,
          headquarters: headquarters,
          address: address,
          SPOC: spoc,
        };
        const data = await organizationAPI.editOrganizationDetails(selectedDomain.id, body);
        setOpenEdit(false);
        handleAlert('Organization Edited Successfully', 'success');
      } catch (err) {
        handleAlert('Could not edit organization', 'error');
      }
    } else {
      handleAlert('Please Select An Organization First', 'error');
    }
  };

  const migrateByEmails = async (e) => {
    e.preventDefault();
    if (selectedDomain) {
      try {
        const body = {
          emails: userEmails,
        };
        const data = await organizationAPI.migrateByEmails(selectedDomain.id, body);
        setOpenEmailDialogue(false);
        handleAlert('Successfully Migrated Users', 'success');
      } catch (err) {
        handleAlert('Could Not Migrate Users', 'error');
      }
    } else if (userEmails.length === 0) {
      handleAlert('Please enter emails', 'error');
    } else {
      handleAlert('Please Select An Organization First', 'error');
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: '#FAFBFB',
        minHeight: '100vh',
        p: 2,
      }}
    >
      <Stack spacing={1} sx={{ textAlign: 'start', width: '100%' }}>
        <Typography variant="h5">Organization Actions</Typography>
        <Typography sx={{ color: 'grey' }} variant="subtitle1">
          Search an Organization
        </Typography>
      </Stack>

      {viewStatus && (
        <Box>
          <Chip
            color={viewStatus === 'ACTIVE' ? 'success' : 'error'}
            size="small"
            label={`Status: ${viewStatus}`}
            variant="outlined"
            sx={{ ml: 2, mt: 2, mb: 1 }}
          />
        </Box>
      )}

      <Box
        sx={{
          p: 2,
          width: { xs: '100%', sm: '95%', md: '90%', lg: '75%', xl: '60%' },
        }}
      >
        <Autocomplete
          onChange={(event, value) => {
            setSelectedDomain(value);
            setViewStatus(value?.status);
          }}
          options={organizations}
          getOptionLabel={(option) => option.domain}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search an organization"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Box>
      <Box>
        <Stack>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h5">
            Organization Tools
          </Typography>
        </Stack>

        <Box
          sx={{
            p: 2,
            width: { xs: '100%', sm: '95%', md: '90%', lg: '75%', xl: '60%' },
          }}
        >
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
            }}
          >
            <Button
              sx={{ width: 'auto', flexGrow: { xs: '1', sm: '0' } }}
              variant="contained"
              size="small"
              onClick={() => handleDeleteDialog('public')}
            >
              Migrate To Public
            </Button>
            <Button
              sx={{ width: 'auto', flexGrow: { xs: '1', sm: '0' } }}
              variant="contained"
              size="small"
              onClick={handleOpenEmailDialogue}
            >
              Migrate By Emails
            </Button>
          </Box>
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
            }}
          >
            <Button
              sx={{ width: 'auto', flexGrow: { xs: '1', sm: '0' } }}
              variant="contained"
              size="small"
              onClick={() => handleDeleteDialog('organization')}
            >
              Migrate To Organization
            </Button>
            <Button
              sx={{ width: 'auto', flexGrow: { xs: '1', sm: '0' } }}
              variant="contained"
              size="small"
              onClick={() => checkOrganizationStatus()}
            >
              Check Organization Status
            </Button>
          </Box>
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
            }}
          >
            <Button
              sx={{ width: 'auto', flexGrow: { xs: '1', sm: '0' } }}
              variant="contained"
              size="small"
              onClick={handleClickOpen}
            >
              Change Organization Status
            </Button>
            <Button
              sx={{ width: 'auto', flexGrow: { xs: '1', sm: '0' } }}
              variant="contained"
              size="small"
              onClick={handleClickOpenEdit}
            >
              Edit Organization Data
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={openDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <DialogTitle id="alert-dialog-title">{'Do you really want to migrate?'}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              type === 'organization' ? migrateToOrganization() : migrateToPublic();
              handleCloseDeleteDialog();
            }}
          >
            Yes
          </Button>
          <Button onClick={handleCloseDeleteDialog}>No</Button>
        </DialogActions>
      </Dialog>

      {/* Change Status Dialogue */}
      <Dialog
        open={changeStatusDialogue}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Change organization status'}</DialogTitle>
        <DialogContent>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select value={status} onChange={handleChangeStatus} required fullWidth>
            <MenuItem value={'ACTIVE'}>ACTIVE</MenuItem>
            <MenuItem value={'INACTIVE'}>INACTIVE</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={changeOrganizationStatus} autoFocus>
            Change Status
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Organization Dialogue */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogContent>
          <DialogTitle>Edit Organization Details</DialogTitle>
          <Box
            sx={{
              p: 2,
            }}
          >
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 2,
                }}
              >
                <TextField
                  autoFocus
                  size="small"
                  label={'Name'}
                  required
                  type="text"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></TextField>
                <TextField
                  size="small"
                  label={'Domain'}
                  type="text"
                  required
                  fullWidth
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                ></TextField>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 2,
                }}
              >
                <TextField
                  size="small"
                  label={'Support Mail'}
                  type="email"
                  fullWidth
                  required
                  value={supportMail}
                  onChange={(e) => setSupportMail(e.target.value)}
                />
                <TextField
                  size="small"
                  label={'Phone Number'}
                  type="tel"
                  fullWidth
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 2,
                }}
              >
                <TextField
                  size="small"
                  label={'size'}
                  type="number"
                  fullWidth
                  required
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
                <TextField
                  size="small"
                  label={'Headquarters'}
                  type="text"
                  fullWidth
                  required
                  value={headquarters}
                  onChange={(e) => setHeadquarters(e.target.value)}
                />
              </Box>
              <Box sx={{ mb: 2, display: 'flex' }}>
                <TextField
                  size="small"
                  id="outlined-textarea"
                  label={'Address'}
                  multiline
                  rows={3}
                  fullWidth
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 2,
                }}
              >
                <TextField
                  size="small"
                  type="text"
                  label={'SPOC'}
                  fullWidth
                  required
                  value={spoc}
                  onChange={(e) => setSpoc(e.target.value)}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', sm: 'flex-end' },
                  mt: 3,
                }}
              >
                <Button
                  sx={{ width: 'auto', flexGrow: { xs: '1', sm: '0' } }}
                  variant="contained"
                  size="small"
                  type="submit"
                >
                  Edit Organization
                </Button>
              </Box>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Migrate by Emails Dialogue */}
      <Dialog open={openEmailDialogue} onClose={handleCloseEmailDialogue}>
        <DialogContent>
          <DialogTitle>Migrate Users To Organization</DialogTitle>
          <DialogContentText sx={{ ml: 3 }}>
            Enter the email ids of the users you wish to migrate
          </DialogContentText>
          <Box
            sx={{
              p: 2,
            }}
          >
            <form onSubmit={migrateByEmails}>
              <ReactMultiEmail
                placeholder="Input your Email Address"
                emails={userEmails}
                required
                onChange={(_emails) => {
                  setUserEmails(_emails);
                }}
                getLabel={(email, index, removeEmail) => {
                  return (
                    <div data-tag key={index}>
                      {email}
                      <span data-tag-handle onClick={() => removeEmail(index)}>
                        ×
                      </span>
                    </div>
                  );
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', sm: 'flex-end' },
                  mt: 3,
                }}
              >
                <Button
                  sx={{ width: 'auto', flexGrow: { xs: '1', sm: '0' } }}
                  variant="contained"
                  size="small"
                  type="submit"
                >
                  Migrate
                </Button>
              </Box>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MigrateOrganization;
