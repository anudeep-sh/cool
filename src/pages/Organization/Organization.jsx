import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { organizationAPI } from '../../api/requests/organization/organizationAPI';
import { IconTextField } from '../../components/TextField';
import Skeletons from '../../components/Skeleton/Skeletons';
import { handleAlert } from '../../utils/handleAlert';
import axios from 'axios';
import handleFileUpload from '../../api/axios/fileUpload';

const Organization = () => {
  const drawerWidth = 240;
  const [imageProgress, setImageProgress] = useState(false);
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [supportMail, setSupportMail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [size, setSize] = useState('');
  const [headquarters, setHeadquarters] = useState('');
  const [address, setAddress] = useState('');
  const [spoc, setSpoc] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [logoLink, setLogoLink] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelToken, setCancelToken] = useState(null);

  const handleThumbnailUpload = async (event) => {
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      setCancelLoading(true);
      const reference = 'ORGANIZATION_DATA';
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const url = await handleFileUpload(event.target.files[0], source.token, reference);
      if (url) {
        setLogoLink(url);
      }
      setCancelLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name,
        domain,
        supportMail,
        phoneNumber,
        size,
        headquarters,
        address,
        SPOC: spoc,
        displayName,
        logoLink: logoLink,
      };
      await organizationAPI.addOrganization(body);
      handleAlert('Organization Added Successfully', 'success');
      setName('');
      setDomain('');
      setPhoneNumber('');
      setSize('');
      setHeadquarters('');
      setAddress('');
      setSpoc('');
      setDisplayName('');
      setLogoLink('');
    } catch (err) {
      handleAlert(err?.message, 'error');
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
        <Typography variant="h5">Organization</Typography>
        <Typography sx={{ color: 'grey' }} variant="subtitle1">
          Add a new organization
        </Typography>
      </Stack>
      <Box
        sx={{
          p: 2,
          width: { xs: '100%', sm: '95%', md: '90%', lg: '75%', xl: '60%' },
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
              autoFocus
              size="small"
              label={'Display Name'}
              required
              type="text"
              fullWidth
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            ></TextField>
            <IconTextField
              size="small"
              type="file"
              inputProps={{ accept: 'image/jpeg,image/x-png' }}
              label={'Upload Logo'}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
              iconEnd={imageProgress ? <Skeletons type="smallCircularLoader" /> : null}
              onChange={(event) => {
                handleThumbnailUpload(event.target.files[0]);
              }}
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
              Add Organization
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Organization;
