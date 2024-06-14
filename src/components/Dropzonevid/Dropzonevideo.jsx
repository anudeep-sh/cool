import React from 'react';
import { Box, Button, Backdrop, CircularProgress, Stack, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import axios from 'axios';

import { handleAlert } from '../../utils/handleAlert';
import { courseUploadAPI } from '../../api/requests/courses/courseUploadAPI';
import handleFileUpload from '../../api/axios/fileUpload';

const Dropzonevideo = ({ setModules, modules, id, secid, setLoaderindex, setUploadingIndex, setDotLoader, dotLoader, setCancelToken, cancelToken }) => {
  const [Id, setId] = useState();
  const [duration, setDuration] = useState(0);
  const [uploadCancelled, setUploadCancelled] = useState(false);

  const {
    getRootProps: getRootvideoProps,
    getInputProps: getInputvideoProps,
    open,
    acceptedFiles,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: true,
    useFsAccessApi: false,
    accept: {
      'text/html': ['.mp4'],
    },
  });



  const Token = localStorage.getItem('Token');

  const getVideoDuration = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const media = new Audio(reader.result);
        media.onloadedmetadata = () => resolve(media.duration);
      };
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });

  const saveVideoData = async (name, fileName, videoDuration) => {
    try {
      const data = await courseUploadAPI.uploadVideo(secid, {
        videoTitle: name,
        videoUrl: fileName,
        videoLength: videoDuration,
      });
      if (data && data.length > 0) {
        modules[id].videosData[modules[id].videosData.length - 1].id = data[0].id;
        modules[id].videosData[modules[id].videosData.length - 1].extraFiles = [];
        modules[id].videosData[modules[id].videosData.length - 1].sectionId = data[0].sectionId;
        modules[id].videosData[modules[id].videosData.length - 1].videoUrl = data[0].videoUrl;
        modules[id].videosData[modules[id].videosData.length - 1].videoLength = data[0].videoLength;
        handleAlert('Video uploaded!', 'success');
      } else {
        handleAlert('Error uploading video, please upload again!', 'error');
      }
    } catch (err) {
      console.error('Error uploading video:', err);
      handleAlert('Error uploading video, please upload again!', 'error');
    }
  };
  const [cancelLoading, setCancelLoading] = useState(false);
  const videoUploadHandler = async (event) => {
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      setDotLoader(true);
      const video = event.target.files[0];
      setLoaderindex(modules[id].videosData.length);
      setUploadingIndex(modules[id].videosData.length);
      const reference = 'ORGANIZATION_DATA';
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const { name } = video;
      const videoDuration = await getVideoDuration(video);
      modules[id].videosData.push({ videoTitle: name });
      setModules([...modules]);
      acceptedFiles.push(event.target.files);
      const url = await handleFileUpload(video, source.token, reference);
      if (url) {
        await saveVideoData(name, url, Math.round(videoDuration));
      }
      else if(!url){
        modules[id].videosData.pop();
      }
      setDotLoader(false);
    }
  };
  const handleCancelUpload = (event = { preventDefault: () => { } }) => {
    event.preventDefault();
    if (cancelToken) {
      setUploadCancelled(true)
      cancelToken.cancel('Upload cancelled by the user');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Backdrop open={cancelLoading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Stack direction='column' alignItems='center'>
          <CircularProgress color="inherit" />
          <Typography>Uploading</Typography>
        </Stack>
      </Backdrop>
      <Box
        {...getRootvideoProps()}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          width: '100%',
        }}
      >
        <input {...getInputvideoProps()} onChange={videoUploadHandler} />
        <Button
          variant="contained"
          type="button"
          sx={{
            backgroundColor: '#698AFF',
            height: '38px',
            textTransform: 'capitalize',
            padding: '8px 12px 8px 12px',
          }}
          onClick={() => {
            if (dotLoader) {
              handleCancelUpload();
            } else {
              open();
              setId(modules[id].id);
            }
          }}
          fullWidth
        >
          <Typography>Choose Files</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Dropzonevideo;
