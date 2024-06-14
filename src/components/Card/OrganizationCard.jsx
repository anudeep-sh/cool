import { DeleteForever, EditNote, UploadFile } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Modal,
  Stack,
  Typography,
  TextField,
  CircularProgress,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { handleAlert } from '../../utils/handleAlert';
import { v4 } from 'uuid';
import { organizationAPI } from '../../api/requests/organization/organizationAPI';
import { useRef } from 'react';
import getRoleForOrganization from '../../utils/GetUserRoleInOrganization';
import { useNavigate } from 'react-router-dom';
import handleFileUpload from '../../api/axios/fileUpload';
import axios from 'axios';

export default function OragnizationCard({
  Name,
  Desc,
  Logo,
  Id,
  Visibility,
  fetchData,
  setorgImageStatus,
  orgImageStatus,
}) {
  const [title, setTitle] = useState(Name);
  const [desc, setDesc] = useState(Desc);
  const [visiblity, setVisibilty] = useState(Visibility);
  const [imageProgress, setImageProgress] = useState(false);
  const [imageUrl, setImageUrl] = useState(Logo);
  const [imageUrlByFileUpload, setImageUrlByFileUpload] = useState(Logo);
  const [orgNameError, setOrgNameError] = useState('');
  const [userRole, setUserRole] = useState('USER');
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelToken, setCancelToken] = useState(null);
  const [open, setOpen] = useState(false);
  const [org, setOrg] = useState('');
  const [del, setDel] = useState(true);
  const [noedit, setNoEdit] = useState(true);
  const [openPop, setOpenPop] = useState(false);
  const hiddenInputBtn = useRef(null);

  const navigate = useNavigate();

  const getRoleData = async () => {
    await getRoleForOrganization().then((res) => setUserRole(res));
  };

  function validateName(e) {
    if (e.length === 0) {
      setTitle(e);
      return;
    }
    setOrgNameError('');
    var re = new RegExp('^[a-zA-z_]+$');
    if (re.test(e)) {
      setTitle(e);
      if (e === Name) {
        setNoEdit(true);
        return;
      }
      setNoEdit(false);
    } else {
      setOrgNameError('Capital and small letters, along with underscores, are allowed');
    }
  }

  function checkDelete(value) {
    setDel(true);
    setOrg(value);
    if (value === title) {
      setDel(false);
    }
  }
  const handleThumbnailUpload = async (event) => {
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      setNoEdit(false);
      setCancelLoading(true);
      setImageUrl(event.target.files[0]);
      const reference = 'ORGANIZATION_DATA';
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const url = await handleFileUpload(event.target.files[0], source.token, reference);
      if (url) {
        setImageUrlByFileUpload(url);
      }
      setCancelLoading(false);
      // handleAlert('Image has been uploaded,press', 'success');
    }
  };

  const handleCancelUpload = (event) => {
    event.preventDefault();
    if (cancelToken) {
      cancelToken.cancel('Upload cancelled by the user');
    }
  };
  const updateOrgDetails = async () => {
    setImageProgress(true);
    setNoEdit(true);
    var info = {
      description: desc,
      logoLink: imageUrlByFileUpload,
    };
    if (title != Name) {
      info = { ...info, name: title };
    }
    try {
      const data = await organizationAPI.updateOragnizationDetails(info, Id);
      handleAlert('Organization details updated', 'success');
      await fetchData();
    } catch (error) {
      handleAlert('Failed to update organization details', 'error');
    } finally {
      setImageProgress(false);
    }
  };

  async function deleteOrganization() {
    await organizationAPI.removeOrganization(Id).then((res) => {
      navigate('/organization');
    });
  }

  useEffect(() => {
    getRoleData();
  }, []);
  return (
    <Stack
      sx={{
        width: { xs: '100%', lg: '30%' },
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.35)',
        py: 2.25,
        borderRadius: '30px',
        px: 2,
        gap: '8px',
        justifyContent: 'space-between',
      }}
    >
      <Modal
        open={open}
        onClose={() => {
          setOrg('');
          setOpen(false);
        }}
      >
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { sm: '400px' },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            gap: '8px',
          }}
        >
          <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
            Delete this Organization
          </Typography>
          <Typography>
            Once you delete a organization, there is no going back. Please be certain.
          </Typography>
          <TextField
            helperText={`Enter "${title}" to delete the oragnization`}
            FormHelperTextProps={{ sx: { color: '#FF3E3E' } }}
            value={org}
            onChange={(e) => checkDelete(e.target.value)}
          />
          <Stack direction="row" width="100%" gap="8px">
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: '16px',
                fontSize: { xs: '14px', sm: '16px' },
                textTransform: 'none',
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: '16px',
                fontSize: { xs: '14px', sm: '16px' },
                textTransform: 'none',
                backgroundColor: '#FF3E3E',
                '&:hover': { backgroundColor: '#FF3E3E' },
              }}
              fullWidth
              disabled={del}
              onClick={() => deleteOrganization()}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Modal
        open={openPop}
        onClose={() => {
          setOpenPop(false);
        }}
      >
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { sm: '400px' },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            gap: '16px',
            borderRadius: '20px',
          }}
        >
          <Typography>
            Are you sure want to change the Organization name, this will lead to Signing out?
          </Typography>
          <Stack direction="row" width="100%" gap="8px">
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: '16px',
                fontSize: { xs: '14px', sm: '16px' },
                textTransform: 'none',
              }}
              onClick={() => setOpenPop(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: '16px',
                fontSize: { xs: '14px', sm: '16px' },
                textTransform: 'none',
                backgroundColor: '#93A9FA',
                '&:hover': { backgroundColor: '#93A9FA' },
              }}
              fullWidth
              onClick={() => updateOrgDetails()}
            >
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontSize: { xs: '16px', sm: '20px' }, fontWeight: '600' }}>
          Details
        </Typography>
      </Stack>
      <TextField
        value={title}
        onChange={(e) => validateName(e.target.value)}
        helperText={orgNameError}
        variant="standard"
        label="Organization Name"
        InputLabelProps={{
          sx: {
            fontSize: '20px',
          },
        }}
      />
      <Stack direction="row" justifyContent="space-between">
        <Stack direction={'row'} alignItems={'center'} gap={'8px'} justifyContent={'space-between'}>
          <Avatar src={Logo} sx={{ width: '50px', objectFit: 'contain', height: '50px' }} />
          <Stack direction={'row'} alignItems={'center'} gap={'8px'}>
            <input
              type="file"
              placeholder="Attach File here"
              ref={hiddenInputBtn}
              onChange={(e) => handleThumbnailUpload(e)}
              style={{ display: 'none' }}
            />
            {/* <Typography
              sx={{
                flexWrap: 'wrap',
                maxWidth: '10ch',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {imageUrl?.name}
            </Typography> */}
            {cancelLoading ? (
              <Button
                variant="contained"
                sx={{ textTransform: 'none', borderRadius: '12px', backgroundColor: '#93A9FA' }}
                onClick={handleCancelUpload}
              >
                Cancel Upload
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={<UploadFile />}
                onClick={() => hiddenInputBtn.current.click()}
                sx={{ textTransform: 'none', borderRadius: '12px', backgroundColor: '#93A9FA' }}
              >
                Upload
              </Button>
            )}
          </Stack>
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            backgroundColor: '#61CB8E',
            padding: '4px',
            alignItems: 'center',
            gap: '4px',
            borderRadius: '12px',
            border: '4px solid white',
            boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
          }}
        >
          <Typography sx={{ color: '#fff', textTransform: 'capitalize' }}>{visiblity}</Typography>
          <Box
            sx={{ width: '22px', height: '20px', backgroundColor: '#fff', borderRadius: '4px' }}
          />
        </Stack>
      </Stack>

      <TextField
        variant="standard"
        multiline
        maxRows={3}
        label="Description"
        value={desc}
        onChange={(e) => {
          if (e.target.value == Desc) {
            setNoEdit(true);
          }
          setNoEdit(false);
          setDesc(e.target.value);
        }}
        InputLabelProps={{
          sx: {
            fontSize: '20px',
          },
        }}
      />

      <Stack direction="row" gap="12px">
        {userRole === 'CREATOR' && (
          <Button
            variant="contained"
            sx={{
              borderRadius: '16px',
              fontSize: { xs: '14px', sm: '16px' },
              textTransform: 'none',
              backgroundColor: '#FF3E3E',
              '&:hover': { backgroundColor: '#FF3E3E' },
            }}
            endIcon={<DeleteForever />}
            fullWidth
            onClick={() => setOpen(true)}
          >
            Delete Org
          </Button>
        )}
        <Button
          variant="contained"
          onClick={() => {
            if (title != Name) {
              setOpenPop(true);
              setorgImageStatus(!orgImageStatus);
            } else {
              updateOrgDetails();
              setorgImageStatus(!orgImageStatus);
            }
          }}
          disabled={noedit}
          fullWidth
          startIcon={
            <CircularProgress
              sx={{ color: 'white', display: imageProgress ? 'block' : 'none', height: '16px' }}
            />
          }
          endIcon={<EditNote sx={{ height: '26px' }} />}
          sx={{
            borderRadius: '16px',
            fontSize: { xs: '14px', sm: '16px' },
            textTransform: 'none',
            backgroundColor: '#93A9FA',
          }}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
