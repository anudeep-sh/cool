import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { organizationAPI } from '../../../api/requests/organization/organizationAPI';
import { Clear, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function OrgListComponent({ setOpen, Align }) {
  const orgOption = [
    {
      id: 1,
      value: 'Owned',
    },
    {
      id: 2,
      value: 'Joined',
    },
  ];
  const url = window.location.href.split('?')[1]?.split('=')[1];
  const [orgData, setOrgData] = useState(null);
  const [joined, setJoined] = useState(0);
  const [owned, setOwned] = useState(0);
  const [org, setOrg] = useState(
    url ? url.charAt(0).toUpperCase() + url.slice(1) : orgOption[0].value
  );
  const [orgName, setOrgName] = useState('');
  const [orgError, setOrgError] = useState(null);

  const navigate = useNavigate();

  function validateName(e) {
    if (e.length === 0) {
      setOrgName(e);
      return;
    }
    setOrgError('');
    var re = new RegExp('^[a-zA-z_]+$');
    if (re.test(e)) {
      setOrgName(e);
    } else {
      setOrgError('Capital and small letters, along with underscores, are allowed');
    }
  }

  const handleOrgPresentOrNot = (res) => {
    if (res.length === 0) {
      setOrgError('No organizations to show here');
    }
  };

  async function getOrgData() {
    setOrgError('');
    setOrgName('');
    setOpen(true);
    try {
      await organizationAPI.getOrganizations().then((res) => {
        setOrgData(res);
        setOwned(res.filter((x) => x.isCreator));
        setJoined(res.filter((x) => !x.isCreator));
        handleOrgPresentOrNot(res);
        setOpen(false);
      });
    } catch (err) {
      setOrgError(err.message);
      setOpen(false);
    }
  }
  
  async function getOrgSearch(name) {
    setOpen(true);
    try {
      const res = await organizationAPI.getOrganizations();
      const data = res.filter((x) => x.name === name);
      setOrgData(data);
      handleOrgPresentOrNot(data);
      setOpen(false);
    } catch (err) {
      setOrgError(err.message);
      setOpen(false);
    }
  }

  useEffect(() => {
    getOrgData();
  }, []);

  return (
    <Stack
      sx={{
        flexDirection: Align ? Align : { xs: 'column', md: 'row' },
        gap: '20px',
        alignItems: 'flex-start',
      }}
    >
      <Stack
        sx={{
          alignItems: { xs: 'flex-start', sm: Align ? 'center' : 'flex-start' },
          flexDirection: { xs: 'column', sm: Align ? 'row' : 'column' },
          '@media (min-width: 800px) and (max-width:1025px)': {
            marginLeft: '-88px'
          },
        }}
      >
        <FormControl>
          <Select
            defaultValue={org}
            onChange={(e) => setOrg(e.target.value)}
            MenuProps={{
              PaperProps: {
                style: {
                  borderRadius: '16px',
                },
              },
            }}

            sx={{
              '@media (min-width: 1025px) and (max-width:1200px)': {
                fontSize: '4vw',
              },
              '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none' },
              '.MuiSvgIcon-root ': {
                fill: 'white !important',
                marginRight: '-18px',
                fontSize: '56px',
              },
              '& .MuiPaper-root': {
                backgroundColor: 'lightblue',
              },
              color: 'white',
              fontSize: { xs: '36px', sm: '56px' },
            }}
          >
            {orgOption.map((x) => (
              <MenuItem value={x.value} key={x.id} sx={{
                fontSize: '50px',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                '@media (min-width: 1025px) and (max-width:1200px)': {
                  fontSize: '4vw',
                },
                '@media (max-width: 600px)': {
                  fontSize: '36px',
                },
              }}
              >
                {x.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography
          sx={{
            padding: '0px 14px 0px 14px', color: 'white', fontSize: { xs: '36px', sm: '48px' },
            '@media (min-width: 1025px) and (max-width:1200px)': {
              fontSize: '4vw',
            },
            '@media (min-width: 1025px) and (max-width:1047px)': {
              padding: '0px 14px 0px 0px',
            },
          }}
        >
          Organization
        </Typography>
      </Stack>
      <Stack gap={'16px'} alignItems={'center'} sx={{ width: '100%' }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between', padding: '8px', gap: '12px', width: '100%',
            '@media (min-width: 1025px)': {
              marginLeft: '8px',
            },
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Enter Organization Name..."
            value={orgName}
            onChange={(e) => validateName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                getOrgSearch(orgName);
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment>
                  <Clear
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setOrgName('');
                      getOrgData();
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.20)',
              background: '#FFF',
              borderRadius: '16px',
              border: 'none',
              '& fieldset': { border: 'none' },
            }}
            fullWidth
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FFF',
              color: '#698AFF',
              fontSize: { xs: '14px', sm: '16px' },
              fontWeight: '600',
              '&:focus': {
                backgroundColor: '#FFF',
              },
              '&:hover': {
                backgroundColor: '#FFF',
              },
              textTransform: 'none',
              borderRadius: '16px',
              width: '120px',
              padding: { xs: '4px', sm: '8px' },
            }}
            onClick={() => getOrgSearch(orgName)}
          >
            Search
          </Button>
        </Stack>


        <Stack
          gap={'12px'}
          sx={{ overflowY: 'scroll', height: '390px', alignItems: 'center', width: '100%' }}
        >
          {orgData &&
            orgData.map((x) => {
              if (org === 'Owned' && x.isCreator) {
                return (
                  <Stack
                    sx={{
                      flexDirection: 'row',
                      borderRadius: '20px',
                      background: '#FFFFFF',
                      height: '120px',
                      width: '100%',
                      cursor: 'pointer',
                    }}
                    key={x.id}
                    onClick={() => {
                      localStorage.setItem('orgName', x.name);
                      navigate(`/org/${x.name}/dashboard`);
                    }}
                  >
                    <Stack
                      sx={{
                        background: '#DFE6FF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        borderRadius: '20px',
                        width: '150px',
                      }}
                    >
                      {x.logoLink ? (
                        <Avatar src={x.logoLink} sx={{ height: '50px', width: '50px' }} />
                      ) : (
                        <Avatar sx={{ height: '50px', width: '50px' }}>{x.name.charAt(0)}</Avatar>
                      )}
                    </Stack>
                    <Stack sx={{ width: '100%' }}>
                      <Box
                        sx={{
                          borderBottom: '1px solid #E7E7E7',
                          padding: '8px',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>
                          {x.name}
                        </Typography>
                        <Chip label={x.planName} variant="outlined" color="primary" />
                      </Box>
                      <Stack sx={{ padding: '8px', gap: '8px' }}>
                        <Typography
                          sx={{ color: 'rgba(0, 0, 0, 0.50)' }}
                        >{`${x.creatorData.firstName} ${x.creatorData.lastName}`}</Typography>
                        <Stack sx={{ flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
                          <Stack direction={'row'} gap={'4px'}>
                            {x.usersData?.slice(0, 3).map((user, index) =>
                              user.profilePhotoLink ? (
                                <Avatar
                                  src={user.profilePhotoLink}
                                  sx={{ width: '25px', height: '25px' }}
                                  key={index}
                                />
                              ) : (
                                <Avatar sx={{ width: '25px', height: '25px' }} key={index}>
                                  {user.firstName.charAt(0)}
                                </Avatar>
                              )
                            )}
                          </Stack>
                          {x.usersData.length > 3 && (
                            <Typography>+{x.usersData.length - 3} More</Typography>
                          )}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                );
              }
              if (org === 'Joined' && !x.isCreator) {
                return (
                  <Stack
                    sx={{
                      flexDirection: 'row',
                      borderRadius: '20px',
                      background: '#FFFFFF',
                      height: '120px',
                      width: '100%',
                    }}
                    key={x.id}
                    onClick={() => {
                      localStorage.setItem('orgName', x.name);
                      navigate(`/org/${x.name}/dashboard`);
                    }}
                  >
                    <Stack
                      sx={{
                        background: '#DFE6FF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        borderRadius: '20px',
                        width: '150px',
                      }}
                    >
                      {x.logoLink ? (
                        <Avatar src={x.logoLink} sx={{ height: '50px', width: '50px' }} />
                      ) : (
                        <Avatar sx={{ height: '50px', width: '50px' }}>{x.name.charAt(0)}</Avatar>
                      )}
                    </Stack>
                    <Stack sx={{ width: '100%' }}>
                      <Stack sx={{ borderBottom: '1px solid #E7E7E7', padding: '8px' }}>
                        <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>
                          {x.name}
                        </Typography>
                      </Stack>
                      <Stack sx={{ padding: '8px', gap: '8px' }}>
                        <Typography
                          sx={{ color: 'rgba(0, 0, 0, 0.50)' }}
                        >{`${x.creatorData.firstName} ${x.creatorData.lastName}`}</Typography>
                        <Stack sx={{ flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
                          <Stack direction={'row'} gap={'4px'}>
                            {x.usersData?.slice(0, 3).map((user, index) =>
                              user.profilePhotoLink ? (
                                <Avatar
                                  src={user.profilePhotoLink}
                                  sx={{ width: '25px', height: '25px' }}
                                  key={index}
                                />
                              ) : (
                                <Avatar sx={{ width: '25px', height: '25px' }} key={index}>
                                  {user.firstName.charAt(0)}
                                </Avatar>
                              )
                            )}
                          </Stack>
                          {x.usersData.length > 3 && (
                            <Typography>+{x.usersData.length - 3} More</Typography>
                          )}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                );
              }
            })}
          {org === 'Owned' && !orgError && owned?.length === 0 && (
            <Typography sx={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>
              No organizations to show here
            </Typography>
          )}
          {org === 'Joined' && !orgError && joined?.length === 0 && (
            <Typography sx={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>
              No organizations to show here
            </Typography>
          )}
          {orgError && (
            <Typography sx={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>
              {orgError}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
