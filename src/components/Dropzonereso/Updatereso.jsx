import React from 'react';
import { Box, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { courseUploadAPI } from '../../api/requests/courses/courseUploadAPI';
import handleFileUpload from '../../api/axios/fileUpload';
import axios from 'axios';

const Updatereso = ({ resoid, resoindex, setresoLoading, setresoLoaderindex }) => {
  const [Id, setId] = useState();
  const [duration, setDuration] = useState();
  const [resoloaderindex, setResoloaderindex] = useState();
  const [cancelToken, setCancelToken] = useState(null);

  const {
    getRootProps: getRootupdateresoProps,
    getInputProps: getInputupdateresoProps,
    open,
    acceptedFiles,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: true,
    useFsAccessApi: false,
    accept: {
      'text/html': ['.pdf'],
    },
  });
  const [cancelLoading, setCancelLoading] = useState(false);
  const videoUploadHandler = async (event) => {
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      setresoLoading(true);
      setCancelLoading(true);
      const video = event.target.files[0];
      const reference = 'ORGANIZATION_DATA';
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const url = await handleFileUpload(video, source.token, reference);
      acceptedFiles.push(event.target.files);
      setResoloaderindex(resoindex);
      if (url) {
        const postdata = {
          videoTitle: event?.name,
          videoUrl: url,
          fileSize: event?.size,
        };
        setCancelLoading(false);
        return postdata;
      }
    }
  };
  const handleCancelUpload = (event = { preventDefault: () => {} }) => {
    event.preventDefault();
    if (cancelToken) {
      cancelToken.cancel('Upload cancelled by the user');
    }
  };
  const normal = async (postdata) => {
    try {
      const data = await courseUploadAPI.updateFile(resoid, postdata);
    } catch (err) {}
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
        {...getRootupdateresoProps()}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <input
          {...getInputupdateresoProps()}
          onChange={(event) => {
            uploaddata(event.target.files[0]);
          }}
        />
        <Button
          variant="contained"
          type="button"
          sx={{
            backgroundColor: '#698AFF',
            textTransform: 'capitalize',
            padding: '4px 8px',
          }}
          onClick={() => {
            if (cancelLoading) {
              handleCancelUpload();
            } else {
              open();
            }
          }}
        >
          {cancelLoading ? 'Cancel Upload' : 'Replace file'}
        </Button>
      </Box>
    </Box>
  );
};

export default Updatereso;
