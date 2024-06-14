import React, { useState } from 'react';
import Joyride from 'react-joyride';
import Dropzonevideo from '../../components/Dropzonevid/Dropzonevideo';
import Dropzonereso from '../../components/Dropzonereso/Dropzonereso';
import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  TextField,
  Fab,
  Tooltip,
  IconButton,
} from '@mui/material';
import Skeletons from '../../components/Skeleton/Skeletons';
import Skeleton from '@mui/material/Skeleton';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SideBarResponsive from '../../components/SideBarResponsive/index';
import { useNavigate, useParams } from 'react-router-dom';
import edit from '../../assets/courseVideosUpload/editvideos.svg';
import EditIcon from '@mui/icons-material/Edit';
import del from '../../assets/courseVideosUpload/delete.svg';
import files from '../../assets/courseVideosUpload/files.svg';
import CloseIcon from '@mui/icons-material/Close';
import loader from '../../assets/courseVideosUpload/loader1.gif';
import { useEffect } from 'react';
import Dialogue from '../../components/Dialogbox/Dialogue';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import Dropzone from 'react-dropzone';
import Updatevideo from '../../components/Dropzonevid/Updatevideo';
import { courseAPI } from '../../api/requests/courses/courseAPI';
import { courseUploadAPI } from '../../api/requests/courses/courseUploadAPI';
import { handleAlert } from '../../utils/handleAlert';
import { getOrgName } from '../../utils/appendOrgQuery';
import axios from 'axios';
import handleFileUpload from '../../api/axios/fileUpload';

const Courseupload = () => {
  const [togglemenu, setTogglemenu] = useState(false);
  const [module, setModule] = useState(false);
  const [editvid, setEditvid] = useState(false);
  const [addmodule, setAddmodule] = useState(false);
  const [title, setTitle] = useState('');
  const [modtitle, setModtitle] = useState('');
  const [editid, setEditid] = useState();
  const [editvidid, setEditvidid] = useState();
  const [vidname, setVidname] = useState();
  const [viddesc, setViddesc] = useState();
  const [chooseid, setChooseid] = useState();
  const [diaid, setDiaid] = useState(); // section dialog id
  const [ddiaid, setDdiaid] = useState(); // video dialog id
  const [choose, setChoose] = useState();
  const [accept, setAccept] = useState([]);
  const [opendia, setOpendia] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [addresoid, setAddresoid] = useState();
  const [videoindex, setVideoindex] = useState();
  const [chooseindex, setChooseindex] = useState();
  const [chooseresoname, setChooseresoname] = useState();
  const [choosename, setChoosename] = useState();
  const [loading, setLoading] = useState(false);
  const [resoloading, setresoLoading] = useState(true);
  const [resoloaderindex, setresoLoaderindex] = useState(null);
  const [loaderindex, setLoaderindex] = useState();
  const [userdata, setUserdata] = useState();
  const [errorFetchedChecker, setErrorFetchedChecker] = useState(false);
  const [modules, setModules] = useState([]);
  const [index, setIndex] = useState(modules?.length - 1);
  const [dotLoader, setDotLoader] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);

  const steps = [
    {
      content: <p>Click on the add icon to add new section to your course</p>,
      locale: { skip: <strong>SKIP</strong> },
      placement: 'right-end',
      target: '#newSection',
      disableBeacon: true,
    },
    {
      content: <p>All uploaded videos will be shown here for a chosen section</p>,
      locale: { skip: <strong>SKIP</strong>, next: <strong>NEXT</strong> },
      placement: 'bottom',
      target: '#videoBox',
      disableBeacon: true,
    },
    {
      content: <p>All uploaded resources will be shown here for a chosen file</p>,
      locale: { skip: <strong>SKIP</strong>, next: <strong>NEXT</strong> },
      placement: 'bottom',
      target: '#resourceFilesBox',
      disableBeacon: true,
    },
    {
      content: <p>Click on this section,then click choose files button to add video</p>,
      locale: { skip: <strong>SKIP</strong> },
      placement: 'bottom',
      target: '#step0',
      disableBeacon: true,
    },
  ];

  const [startTour, setStartTour] = useState(false);

  const navigate = useNavigate();
  const handlemod = (value) => {
    setModule(!module);
    setEditid(value);
    setAddmodule(false);
  };
  const orgPath = getOrgName();

  let { id } = useParams();

  const createSection = async () => {
    if (modtitle.length === 0) {
      handleAlert("Section name should not be empty","error")
      return
    }
    try {
      setAddmodule(false);
      const data = await courseUploadAPI.createSection(id, {
        sectionTitle: modtitle,
        sectionDescription: '',
      });
      const newdata = { ...data[0], videosData: [] };
      setModules([...modules, newdata]);
      if (startTour && modules.length <= 1) {
      }
    } catch (err) { }
  };

  const deleteSection = async () => {
    try {
      await courseUploadAPI.deleteSection(chooseid);
    } catch (err) { }
  };

  const deleteVideo = async () => {
    try {
      await courseUploadAPI.deleteVideo(ddiaid);
    } catch (err) { }
  };

  const handleDelete = (value) => {
    setChoose(false);
    setOpendia(false);
    setChooseindex(null);
    setChoosename('No section selected');
    deleteSection();
    modules.splice(value, 1);
  };

  const handledeleteVideo = (value, index) => {
    setOpendia(false);
    deleteVideo();
    modules[value].videosData.splice(index, 1);
  };
  const [isLoading, setIsLoading] = useState(false);
  // const getdata = async () => {
  //   try {
  //     setIsLoading(true);
  //     const data = await courseAPI.getSpecificCourse(id);
  //     setIsLoading(false);
  //     return data;
  //   } catch (error) {}
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const data = await courseAPI.getSpecificCourse(id);
        updateState(data);
        setIsLoading(false);
      } catch (error) {
        handleAlert('Data Fetching error', 'error');
        setErrorFetchedChecker((c) => !c);
      }
    };

    fetchData();
  }, [errorFetchedChecker]); // Empty dependency array, runs once when component mounts

  useEffect(() => {
    if (modules.length === 0) {
      setStartTour(true);
    }
  }, [modules]);

  const updateState = (data) => {
    setModules(data.data.courseVideos);
    setUserdata(data.data.courseData);
  };

  // useEffect(() => {
  //   getdata().then(
  //     (data) => updateState(data),
  //     () => {
  //       handleAlert('Data Fetching error', 'error');
  //       setErrorFetchedChecker((c) => !c);
  //     }
  //   );
  // }, [errorFetchedChecker]);

  const [fileUpload, setFileUpload] = useState(null);
  const [cancelToken, setCancelToken] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const handleThumbnailUpload = async () => {
    const source = axios.CancelToken.source();
    if (fileUpload) {
      setCancelLoading(true);
      const reference = 'ORGANIZATION_DATA';
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const url = await handleFileUpload(fileUpload, source.token, reference);
      const postdata = {
        fileName: fileUpload?.name,
        fileUrl: url,
        fileSize: fileUpload?.size,
      };
      setCancelLoading(false);
      if (fileUpload === null) {
        return null;
      }
      return postdata;
    }
  };

  const handleCancelUpload = (event) => {
    event.preventDefault();
    if (cancelToken) {
      cancelToken.cancel('Upload cancelled by the user');
    }
  };

  const normal = async (postdata) => {
    try {
      const data = await courseUploadAPI.uploadFile(addresoid, postdata);
      setresoLoading(false);
      modules[chooseindex].videosData[videoindex].extraFiles[
        modules[chooseindex].videosData[videoindex].extraFiles.length - 1
      ].id = data[0].id;
      modules[chooseindex].videosData[videoindex].extraFiles[
        modules[chooseindex].videosData[videoindex].extraFiles.length - 1
      ].fileUrl = data[0].fileUrl;
    } catch (err) {
      handleAlert('Please upload again!', 'error');
      setresoLoading(false);
    }
  };

  const uploaddata = async () => {
    const postdata = await handleThumbnailUpload();
    if (postdata) {
      normal(postdata);
    }
  };

  useEffect(() => {
    uploaddata();
  }, [fileUpload]);

  const updatesection = async () => {
    try {
      await courseUploadAPI.updateSection(chooseid, {
        sectionTitle: title,
      });
    } catch (err) {
      handleAlert('Please update again!', 'error');
    }
  };


  const handleupdate = (index) => {
    setModule(false);
    updatesection();
    modules[index].sectionTitle = title;
  };

  const updatevideos = async () => {
    try {
      await courseUploadAPI.updateVideo(editvidid, {
        videoTitle: vidname,
        videoDescription: viddesc,
      });
    } catch (err) { }
  };

  const handlevidupdate = (index) => {
    setEditvid(false);
    updatevideos();
    modules[chooseindex].videosData[index].videoTitle = vidname;
    handleAlert('Updated Successfully', 'success');
  };
  const handleviddescupdate = (index) => {
    setEditvid(false);
    updatevideos();
    modules[chooseindex].videosData[index].videoDescription = viddesc;
  };

  return isLoading ? (
    <Skeletons type="CircularLoader" />
  ) : (
    <Box p={3}>
      {modules.length === 0 && startTour && <Joyride steps={steps} />}
      <Stack
        spacing={3}
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          gap: '24px',
          maxWidth: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            width: { xs: '100%', md: '75vw' },
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Fab color="primary" sx={{ width: '44px', height: '44px' }}>
              <MenuIcon
                sx={{ cursor: 'pointer', color: 'white' }}
                onClick={() => {
                  setTogglemenu(true);
                }}
              />
            </Fab>
            {togglemenu && (
              <Box
                onClick={() => {
                  setTogglemenu(false);
                }}
              >
                <SideBarResponsive show={togglemenu} />
              </Box>
            )}
          </Box>
          <Box
            onClick={() => {
              setTogglemenu(false);
            }}
            sx={{
              width: '100%',
              border: '1px dashed rgba(0, 0, 0, 0.40)',
              height: '500px',
              borderRadius: '12px',
              position: 'relative',
            }}
            id={'videoBox'}
          >
            <Box
              sx={{
                display: 'flex',
                marginTop: '1rem',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <Stack direction="column" sx={{ alignItems: 'center' }}>
                <Typography variant="h5" sx={{ color: '#292929', fontWeight: '600' }}>
                  Upload your files
                </Typography>
                <Typography sx={{ color: '#A0A0A0' }}>Files should be mp4</Typography>
                <Typography sx={{ color: '#505050' }}>{choosename}</Typography>
              </Stack>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Stack
                  spacing={1}
                  sx={{ overflow: 'scroll', maxHeight: '350px', padding: '8px', width: '100%' }}
                >
                  {modules[chooseindex]?.videosData?.map((file, index) => (
                    <Stack
                      sx={{
                        border: '1px solid rgba(0,0,0,0.06)',
                        backgroundColor: '#FAFAFA',
                        borderRadius: '8px',
                        flexDirection: 'column',
                        padding: '8px',
                        width: '100%',
                      }}
                      onClick={() => {
                        setChooseresoname(file.videoTitle);
                        setVideoindex(index);
                      }}
                    >
                      <Stack
                        sx={{
                          flexDirection: { xs: 'column', sm: 'row' },
                          justifyContent: 'space-between',
                          gap: '16px',
                          alignItems: { xs: 'flex-start', sm: 'center' },
                        }}
                      >
                        {dotLoader && loaderindex === index ? (
                          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "column", md: "row" }, justifyContent: "space-between", width: "100%" }}>
                            <Skeleton animation="wave"
                              style={{
                                width: "25%",
                                height: "38.4px",
                              }} />
                            <Button
                              variant="contained"
                              type="button"
                              sx={{
                                backgroundColor: '#698AFF',
                                textTransform: 'capitalize',
                                padding: '4px 8px',
                                width: '145px',
                                minWidth: '145px',
                                height: '32.5px',
                              }}
                              onClick={(event) => {
                                handleCancelUpload(event);
                              }}
                            >
                              Cancel Upload
                            </Button>
                          </Box>
                        ) : (
                          <Stack direction={'row'} gap={'4px'} alignItems={'center'}>
                            <VideoFileIcon color="primary" sx={{ width: '35px', height: '35px' }} />
                            <Stack gap={'8px'}>
                              <Typography sx={{ fontSize: '12px', color: '#1E1E1E' }}>
                                {file.videoTitle}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: '8px' }}>
                                {dotLoader && loaderindex === index && <img src={loader} alt="" />}
                              </Box>
                            </Stack>
                          </Stack>
                        )}
                        {!(dotLoader && loaderindex === index) && (
                          <Stack direction={'row'} gap={'8px'} alignItems={'flex-start'}>
                            <Updatevideo
                              dotLoader={dotLoader}
                              setDotLoader={setDotLoader}
                              videoindex={index}
                              setModules={setModules}
                              setProgress={setProgress}
                              videoid={file.id}
                              id={chooseindex}
                              modules={modules}
                              secid={chooseid}
                              setLoading={setLoading}
                              setLoaderindex={setLoaderindex}
                              setEditvid={setEditvid}
                            />
                            <Tooltip title="Edit video details">
                              <img
                                src={edit}
                                alt="edit"
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  setEditvid(!editvid);
                                  setEditvidid(file.id);
                                  setVidname(file.videoTitle);
                                  setViddesc(file.videoDescription);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Delete video">
                              <img
                                src={del}
                                alt="edit"
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  setOpendia(true);
                                  setDialog(true);
                                  setDdiaid(file.id);
                                }}
                              />
                            </Tooltip>
                            <Dropzone
                              accept={{ 'text/html': ['.pdf', '.docx'] }}
                              useFsAccessApi={false}
                            >
                              {({ getRootProps, getInputProps, acceptedFiles, open }) => (
                                <Box>
                                  <input
                                    {...getInputProps()}
                                    onChange={(event) => {
                                      setFileUpload(event.target.files[0]);
                                      modules[chooseindex].videosData[videoindex].extraFiles.push({
                                        fileName: event.target.files[0].name,
                                        fileSize: event.target.files[0].size,
                                      });
                                      acceptedFiles.push(event.target.files[0]);
                                      setModules([...modules]);
                                      setresoLoading(true);
                                      setresoLoaderindex(
                                        modules[chooseindex].videosData[videoindex].extraFiles
                                          .length - 1
                                      );
                                    }}
                                  />
                                  {!cancelLoading &&
                                    <Tooltip title="Add resources">
                                      <img
                                        src={files}
                                        alt="edit"
                                        style={{
                                          width: '32px',
                                          height: '32px',
                                          cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                          open();
                                          setAddresoid(file.id);
                                        }}
                                      />
                                    </Tooltip>
                                  }
                                </Box>
                              )}
                            </Dropzone>
                          </Stack>
                        )}
                      </Stack>
                      {dialog && ddiaid === file.id && (
                        <Dialogue
                          opendia={opendia}
                          setOpendia={setOpendia}
                          title={'Delete the video?'}
                          content={'Are you sure you want to delete the video?'}
                          handleChange={handledeleteVideo}
                          i={chooseindex}
                          id={index}
                        />
                      )}
                      {editvid && editvidid === file.id && (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                          }}
                        >
                          <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                            <TextField
                              size="small"
                              value={vidname}
                              onChange={(e) => {
                                setVidname(e.target.value);
                              }}
                              sx={{ width: '100%' }}
                            ></TextField>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                              height: '32px',
                              marginBottom: '10px',
                              width: '100%',
                            }}
                          >
                            <TextField
                              label="Add description"
                              value={viddesc}
                              size="large"
                              multiline
                              rows={1.1}
                              onChange={(e) => {
                                setViddesc(e.target.value);
                              }}
                              sx={{ width: '100%' }}
                            ></TextField>
                          </Stack>
                          <Box
                            sx={{
                              display: 'flex',
                              gap: '5px',
                              marginTop: '10px',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <Button
                              variant="outlined"
                              sx={{
                                height: '38px',
                                textTransform: 'capitalize',
                                padding: 'px',
                              }}
                              onClick={() => {
                                setEditvid(false);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                height: '38px',
                                textTransform: 'capitalize',
                                p: 2,
                                backgroundColor: '#698AFF',
                                fontSize: '12px',
                              }}
                              onClick={() => {
                                handleviddescupdate(index);
                                handlevidupdate(index);
                              }}
                            >
                              Update
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            id={'resourceFilesBox'}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" sx={{ color: '#292929' }}>
                Resources
              </Typography>
              <Typography sx={{ color: '#A0A0A0', fontSize: '12px' }}>
                Files should be in Pdf,Docs
              </Typography>
              <Typography sx={{ color: '#505050' }}>{chooseresoname}</Typography>
            </Box>
            <Dropzonereso
              modules={modules}
              addresoid={chooseindex}
              videoindex={videoindex}
              dialog={dialog}
              resoloading={resoloading}
              loaderindex={resoloaderindex}
              setresoLoading={setresoLoading}
            />
          </Box>
        </Box>
        <Stack
          direction="column"
          spacing={1.5}
          sx={{
            marginTop: '0px !important',
            width: { xs: '100%', md: '25vw' },
            alignItems: 'flex-end',
          }}
        >
          <Paper
            sx={{
              height: '500px',
              width: { xs: '100%', md: '100%' },
              overflow: 'scroll',
              boxShadow: 'none',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              background: ' #FAFAFA',
            }}
            onClick={() => setTogglemenu(false)}
          >
            <Box p={2} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" gutterBottom>
                  {userdata?.title}
                </Typography>
                <Box>
                  <Tooltip title="Edit Course Details">
                    <IconButton>
                      <EditIcon
                        onClick={() => {
                          navigate(`/org/${orgPath}/course/update/${id}`);
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add new section">
                    <IconButton>
                      <AddIcon
                        onClick={() => {
                          setAddmodule(!addmodule);
                          setModule(false);
                          setIndex(index + 1);
                          setChoose(false);
                          setChooseindex(null);
                          setChoosename('');
                        }}
                        id="newSection"
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
              {modules.map((value, i) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    backgroundColor: chooseid === value.id && choose ? '#F5F5F5' : '',
                    padding: '6px',
                    borderRadius: '8px',
                  }}
                  id={`step${i}`}
                  key={value.id}
                  onClick={() => {
                    setChooseindex(i);
                    setChoosename(value.sectionTitle);
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '10px',
                      height: '32px',
                      alignItems: 'center',
                    }}
                    onClick={() => {
                      setChoose(true);
                      setChooseid(value.id);
                      setModule(false);
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#A0A0A0',
                        fontSize: '14px',
                        cursor: 'pointer',
                        width: '8ch',
                      }}
                    >
                      Section {i + 1}:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '13px',
                        width: '150px',
                        cursor: 'pointer',
                      }}
                    >
                      {value.sectionTitle}
                    </Typography>
                  </Box>
                  {module && editid === value.id && (
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        width: '270px',
                        height: '32px',
                        marginBottom: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <TextField
                        label="Edit"
                        value={title}
                        size="small"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      ></TextField>
                      <Button
                        variant="contained"
                        sx={{
                          height: '38px',
                          textTransform: 'capitalize',
                          padding: 'px',
                          backgroundColor: '#698AFF',
                        }}
                        onClick={() => {
                          handleupdate(i);
                        }}
                      >
                        Update
                      </Button>
                      <Box
                        sx={{
                          border: '1px solid #698AFF ',
                          borderRadius: '4px',
                          width: '26px',
                          height: '26px',
                        }}
                      >
                        <ClearIcon
                          color="error"
                          onClick={() => {
                            setModule(false);
                            setAddmodule(false);
                            setEditvid(false);
                          }}
                          sx={{ cursor: 'pointer', color: '#698AFF' }}
                        />
                      </Box>
                    </Stack>
                  )}

                  {choose && chooseid === value.id && (
                    <Stack
                      spacing={0.5}
                      sx={{
                        gap: '4px',
                        justifyContent: { xs: 'normal', md: 'space-evenly' },
                        flexDirection: { xs: 'row', md: 'column', lg: 'row' },
                      }}
                    >
                      {chooseid !== undefined && (
                        <Dropzonevideo
                          cancelToken={cancelToken}
                          setCancelToken={setCancelToken}
                          setUploadingIndex={setUploadingIndex}
                          dotLoader={dotLoader}
                          setDotLoader={setDotLoader}
                          accept={accept}
                          setModules={setModules}
                          setProgress={setProgress}
                          index={index}
                          id={chooseindex}
                          modules={modules}
                          secid={chooseid}
                          setLoading={setLoading}
                          loading={loading}
                          setLoaderindex={setLoaderindex}
                        />
                      )}
                      <Button
                        variant="outlined"
                        type="button"
                        sx={{ height: '38px', textTransform: 'capitalize' }}
                        onClick={() => {
                          handlemod(value.id);
                          setTitle(value.sectionTitle);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        type="button"
                        sx={{ height: '38px', textTransform: 'capitalize' }}
                        onClick={() => {
                          setOpendia(true);
                          setDialog(true);
                          setDiaid(value.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  )}
                  {dialog && diaid === value.id && (
                    <Dialogue
                      opendia={opendia}
                      setOpendia={setOpendia}
                      title={'Delete the section?'}
                      content={'Are you sure you want to delete the section?'}
                      handleChange={handleDelete}
                      i={i}
                    />
                  )}
                </Box>
              ))}

              {addmodule && (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    height: '32px',
                    marginBottom: '10px',
                    alignItems: 'center',
                    paddingLeft: '12px',
                  }}
                >
                  <TextField
                    required
                    label="Add your module..."
                    size="small"
                    onChange={(e) => {
                      setModtitle(e.target.value);
                    }}
                  ></TextField>
                  <Button
                    variant="contained"
                    sx={{
                      height: '38px',
                      textTransform: 'capitalize',
                      backgroundColor: '#698AFF',
                    }}
                    onClick={createSection}
                  >
                    Add
                  </Button>
                  <Box
                    sx={{
                      border: '2px solid #698AFF ',
                      borderRadius: '4px',
                      width: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '38px',
                    }}
                  >
                    <ClearIcon
                      color="error"
                      onClick={() => {
                        setModule(false);
                        setAddmodule(false);
                        setEditvid(false);
                      }}
                      sx={{ cursor: 'pointer', color: '#698AFF' }}
                    />
                  </Box>
                </Stack>
              )}
            </Box>
          </Paper>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
            onClick={() => {
              navigate(`/org/${orgPath}/course/videos/${id}`);
            }}
          >
            <Button variant="contained" fullWidth>
              Go To Course
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Courseupload;
