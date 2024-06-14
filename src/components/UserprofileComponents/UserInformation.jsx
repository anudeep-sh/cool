import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Avatar, Badge, Button, Grid, IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import { CircularProgress } from '@mui/material';

import 'react-phone-number-input/style.css';
import { PhotoCamera } from '@mui/icons-material';
import 'react-multi-carousel/lib/styles.css';
import { userAPI } from '../../api/requests/users/userAPI';
import { handleAlert } from '../../utils/handleAlert';
import handleFileUpload from '../../api/axios/fileUpload';
import axios from 'axios';

const UserInformation = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  setAnyChange,
  profilePhotoLink,
  setProfilePhotoLink,
  email,
  username,
  mobile,
}) => {
  const [isPhoto, SetIsPhoto] = useState(false);
  const lastNameRef = useRef(null);
  const dobRef = useRef(null);
  const [imageUpload, setImageUpload] = useState(profilePhotoLink !== null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelToken, setCancelToken] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  

  const imageUploadFileHandler = async (event) => {
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      setCancelLoading(true);
      const reference = 'USER_DATA';
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const url = await handleFileUpload(event.target.files[0], source.token, reference);
      setCancelLoading(false);
      setImageUrl(url);
      SetIsPhoto(true);
    }
  };
  const imageUploadHandler = async (postData) => {
    try {
      setLoading(true);
      const data = await userAPI.uploadUserImage(postData);
      handleAlert('Image updated', 'success');
      setProfilePhotoLink(data[0]?.profilePhotoLink);
      setImageUpload(false);
      setLoading(false);
    } catch (err) {
      handleAlert('Error, please try again!', 'error');
      setLoading(false);
    }
  };
  const handleCancelUpload = (event = { preventDefault: () => {} }) => {
    event.preventDefault();
    if (cancelToken) {
      cancelToken.cancel('Upload cancelled by the user');
    }
  };
  const updateImage = async () => {
    try {
      const postData = {
        profilePhotoLink: imageUrl,
      };
      setImageUpload(true);
      await imageUploadHandler(postData);
    } catch (err) {
      handleAlert('Error, please try again!', 'error');
    }
  };
  useEffect(() => {
    if (isPhoto && imageUrl) {
      updateImage();
      SetIsPhoto(false);
    }
  }, [isPhoto, imageUrl]);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <form>
          <Typography variant="h6">User Information</Typography>
          <Typography variant="h6" sx={{ fontSize: '14px', color: '#787878' }}>
            You can change it any time you want
          </Typography>
          <Grid container>
            <Grid item xs={12} md={6} sx={{ paddingTop: '0px!important', bgcolor: '' }}>
              <Grid container>
                <Grid item xs={6} md={6} sx={{ paddingTop: '0px!important', bgcolor: '' }}>
                  <Box
                    sx={{
                      lg: { mr: 2 },
                      xl: { mr: 2 },
                      xs: { mr: 0 },
                      md: { mr: 0 },
                      mr: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontSize: '17px', mt: 2, mb: 1 }}>
                      First Name
                    </Typography>
                    <TextField
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      fullWidth
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setAnyChange(false);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          lastNameRef.current.focus();
                        }
                      }}
                    ></TextField>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6} sx={{ paddingTop: '0px!important', bgcolor: '' }}>
                  <Box mr={2}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '17px',
                        mt: 2,
                        mb: 1,
                        md: { mr: 1 },
                        lg: { mr: 1 },
                      }}
                    >
                      Last Name
                    </Typography>
                    <TextField
                      inputRef={lastNameRef}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      fullWidth
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setAnyChange(false);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          dobRef.current.focus();
                        }
                      }}
                    ></TextField>
                  </Box>
                </Grid>
                <Grid item>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: '17px', mt: 2, mb: 1 }}>
                      Email
                    </Typography>
                    <Box
                      sx={{
                        border: 1,
                        borderColor: '#e5e5e5',
                        p: 1,
                        backgroundColor: '#e5e5e5',
                        borderRadius: 1,
                      }}
                    >
                      {email}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: '17px', mt: 2, mb: 1 }}>
                      Username
                    </Typography>
                    <Box
                      sx={{
                        border: 1,
                        borderColor: '#e5e5e5',
                        p: 1,
                        backgroundColor: '#e5e5e5',
                        borderRadius: 1,
                      }}
                    >
                      {username}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: '17px', mt: 2, mb: 1 }}>
                      Mobile
                    </Typography>
                    {/* <MuiTelInput
                      inputRef={mobileRef}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      fullWidth
                      value={mobile}
                      InputProps={{readOnly: true, }}
                      onChange={(newPhone) => {
                        setMobile(newPhone);
                        setAnyChange(false);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addressRef.current.focus();
                        }
                      }}
                    /> */}
                    <Box
                      sx={{
                        border: 1,
                        borderColor: '#e5e5e5',
                        p: 1,
                        backgroundColor: '#e5e5e5',
                        borderRadius: 1,
                      }}
                    >
                      {mobile}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                paddingTop: '0px!important',
                bgcolor: '',
                align: 'right',
                md: { mt: 1 },
              }}
            >
              <Grid container m={1} direction={'column'}>
                <Grid item xl={12} lg={12} md={6} xs={6}>
                  <Typography
                    variant="h6"
                    sx={{
                      xs: { mr: 0 },
                      md: { mr: 2 },
                      lg: { mr: 3 },
                      xl: { mr: 3 },
                    }}
                  >
                    Profile Photo
                  </Typography>
                </Grid>
                <Grid item xl={12} lg={12} md={12} xs={6}>
                  <Grid container>
                    <Grid item>
                      <Badge
                        sx={{
                          xs: { ml: 17 },
                          md: { ml: 17 },
                          lg: { ml: 17 },
                          xl: { ml: 17 },
                          mt: 2,
                        }}
                        overlap="circular"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        badgeContent={
                          <IconButton
                            sx={{ width: 48, height: 48 }}
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                          >
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={(event) => {
                                imageUploadFileHandler(event);
                                SetIsPhoto(true);
                                setAnyChange(false);
                              }}
                            />
                            {cancelLoading ? (
                              <Button
                                sx={{
                                  marginTop: '100px',
                                  width: 'fit-content',
                                }}
                                onClick={() => {
                                  handleCancelUpload();
                                }}
                              >
                                Cancel Upload
                              </Button>
                            ) : loading ? (
                              <Button
                                sx={{
                                  marginTop: '100px',
                                  width: 'fit-content',
                                }}
                              >
                                Uploading...
                              </Button>
                            ) : null}

                            <PhotoCamera
                              sx={{
                                // xs: { width: 40, height: 40 },
                                // md: { width: 47, height: 47 },
                                // lg: { width: 56, height: 56 },
                                // xl: { width: 56, height: 56 },
                                width: { xs: 45, md: 50, lg: 56 },
                                height: { xs: 45, md: 50, lg: 56 },
                                backgroundColor: 'white',
                                borderRadius: '100%',
                                p: 0.5,
                              }}
                            />
                          </IconButton>
                          // <CameraAltOutlinedIcon sx={{ width: 48, height: 48, backgroundColor: "#698AFF", p: 1.5, borderRadius: "100%", color: "#ffffff" }} />
                        }
                      >
                        {imageUpload ? (
                          <Box
                            sx={{
                              height: { xs: 110, sm: 120, md: 122, lg: 132 },
                              width: { xs: 110, sm: 120, md: 122, lg: 132 },
                              display: 'flex',
                              justifyContent: 'space-around',
                              alignItems: 'center',
                              backgroundColor: '#DFE6FF',
                              borderRadius: '50%',
                            }}
                          >
                            <CircularProgress />
                          </Box>
                        ) : (
                          <Avatar
                            sx={{
                              fontSize: '50px',
                              color: '#698AFF',
                              backgroundColor: '#DFE6FF',
                              // xs: { height: 130, width: 130 },
                              // md: { height: 300, width: 300 },
                              // lg: { height: 500, width: 500 },
                              // xl: { height: 500, width: 500 },
                              height: { xs: 110, sm: 120, md: 122, lg: 132 },
                              width: { xs: 110, sm: 120, md: 122, lg: 132 },
                            }}
                            src={profilePhotoLink}
                            alt={firstName}
                          />
                        )}
                      </Badge>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default UserInformation;
