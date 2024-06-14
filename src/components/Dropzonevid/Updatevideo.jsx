import React from 'react';
import { Box, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { courseUploadAPI } from '../../api/requests/courses/courseUploadAPI';
import handleFileUpload from '../../api/axios/fileUpload';
import axios from 'axios';

const Updatevideo = ({ setLoading, setLoaderindex, videoid, videoindex, setEditvid }) => {
  const [duration, setDuration] = useState();
  const [uploadCancelled, setUploadCancelled] = useState(false);
  const [cancelToken, setCancelToken] = useState(null);

  const {
    getRootProps: getRootupdateProps,
    getInputProps: getInputupdateProps,
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
  const [cancelLoading, setCancelLoading] = useState(false);
  const videoUploadHandler = async (event) => {
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      setCancelLoading(true);
      // setDotLoader(true);
      const video = event.target.files[0];
      const reference = 'ORGANIZATION_DATA';
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const url = await handleFileUpload(video, source.token, reference);
      acceptedFiles.push(event.target.files);
      const videoDuration = await getVideoDuration(video);
      setLoaderindex(videoindex);
      const postdata = {
        videoTitle: event?.name,
        videoUrl: url,
        videoLength: Math.round(videoDuration),
      };
      setCancelLoading(false);
      // setDotLoader(false);
      return postdata;
    }
  };
  const handleCancelUpload = (event = { preventDefault: () => { } }) => {
    event.preventDefault();
    if (cancelToken) {
      cancelToken.cancel('Upload cancelled by the user');
    }
  };
  const normal = async (postdata) => {
    try {
      const data = await courseUploadAPI.updateVideo(videoid, {
        videoUrl: postdata.videoUrl,
        videoLength: postdata.videoLength,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const uploaddata = async (a) => {
    const postdata = await videoUploadHandler(a);
    if (postdata) {
      normal(postdata);
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
      <Box
        {...getRootupdateProps()}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
      >
        <input {...getInputupdateProps()} onChange={(event) => uploaddata(event)} />
        <Button
          variant="contained"
          type="button"
          sx={{
            backgroundColor: '#698AFF',
            textTransform: 'capitalize',
            padding: '4px 8px',
            minWidth: '145px',
          }}
          onClick={() => {
            if (cancelLoading) {
              handleCancelUpload();
            } else {
              open();
              setEditvid(false);
            }
          }}
        >
          {cancelLoading ? 'Cancel Upload' : 'Replace video'}
        </Button>
      </Box>
    </Box>
  );
};

export default Updatevideo;
