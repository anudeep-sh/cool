import React, { useState, useRef } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { IconTextField } from '../../components/TextField';
import Skeletons from '../../components/Skeleton/Skeletons';

import { userAPI } from '../../api/requests/users/userAPI';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { handleAlert } from '../../utils/handleAlert';
import { useEffect } from 'react';
import handleFileUpload from '../../api/axios/fileUpload';
import axios from 'axios';

const AdditionalInformation = ({
  resume,
  setResume,
  githubLink,
  setGithubLink,
  twitterLink,
  setTwitterLink,
  websiteLink,
  setWebsiteLink,
  setAnyChange = { setAnyChange },
}) => {
  const twitterLinkRef = useRef(null);
  const websiteLinkRef = useRef(null);
  const fileInputRef = useRef(null);

  const [resumeProgress, setResumeProgress] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const handleResumeUpload = async (postData) => {
    try {
      const data = await userAPI.uploadUserResume(postData);
      handleAlert('Resume updated', 'success');
    } catch (err) {
      handleAlert('Error, please try again!', 'error');
    }
  };
  const [resumeDocName, setResumeDocName] = useState('');

  function getDocumentNameFromLink(link) {
    try {
      const parts = link.split('/');
      const lastPart = parts[parts.length - 1];
      const decodedName = decodeURIComponent(lastPart);
      const documentName = decodedName.includes('files/')
        ? decodedName.split('files/')[1]
        : decodedName;
      const nameWithoutExtension = documentName.split('.')[0];
      return nameWithoutExtension;
    } catch (error) {
      console.error('Error extracting document name:', error);
      return null;
    }
  }

  useEffect(() => {
    if (resume) {
      const docName = getDocumentNameFromLink(resume);
      setResumeDocName(docName);
    }
  }, [resume]);
  const updateResume = async () => {
    const postData = {
      resumeLink: fileUrl,
    };
    if (postData) {
      handleResumeUpload(postData);
    }
  };
  const [uploadCancelled, setUploadCancelled] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelToken, setCancelToken] = useState(null);

  const handleFileInputChange = async (event) => {
    setCancelLoading(true);
    setResume(event.target.files[0]);
    const file = event.target.files[0];
    const reference = 'USER_DATA';
    const source = axios.CancelToken.source();
    setCancelToken(source);
    const url = await handleFileUpload(file, source.token, reference);
    setFileUrl(url);
    setAnyChange(false);
    setCancelLoading(false);
  };
  const handleCancelUpload = (event = { preventDefault: () => { } }) => {
    event.preventDefault();
    if (cancelToken) {
      cancelToken.cancel('Upload cancelled by the user');
    }
  };
  const handleCustomButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <>
      <Box>
        <form>
          <Typography variant="h6">Additional Information</Typography>
          <Typography variant="h6" sx={{ fontSize: '14px', color: '#787878' }}>
            You can change it any time you want
          </Typography>
          <Box display="flex" flexDirection={'row'}>
            <Box sx={{ mt: 1, width: '670px' }}>
              <Box>
                <Typography variant="h6" sx={{ fontSize: '17px', mt: 2, mb: 1 }}>
                  Upload Resume
                </Typography>
                <IconTextField
                  size="small"
                  fullWidth
                  iconEnd={
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ ml: 2, p: 0.5, fontSize: '11px' }}
                      onClick={() => {
                        cancelLoading ? handleCancelUpload() : updateResume();
                      }}
                      disabled={!(cancelLoading || fileUrl)}
                    >
                      {cancelLoading ? 'Cancel Upload' : 'Upload Resume'}
                    </Button>
                  }
                  iconStart={
                    resumeProgress ? (
                      <Skeletons type="smallCircularLoader" />
                    ) : (
                      <>
                        <Button size="small" onClick={handleCustomButtonClick}>
                          <InsertDriveFileIcon sx={{ color: '#7795FE' }} />
                          <span style={{ marginLeft: '4px', color: '#7795FE' }}>Choose File</span>
                        </Button>
                      </>
                    )
                  }
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />
              </Box>
              <Box>
                {resume && resume.name ? (
                  <a href={resume} target="_blank" rel="noopener noreferrer">
                    <Button>{resume?.name}</Button>
                  </a>
                ) : (
                  <>
                    <a href={resume} target="_blank" rel="noopener noreferrer">
                      <Button>{resumeDocName}</Button>
                    </a>
                  </>
                )}
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontSize: '17px', mb: 1 }}>
                  Github Link
                </Typography>
                <IconTextField
                  size="small"
                  type="text"
                  fullWidth
                  value={githubLink}
                  onChange={(e) => {
                    setGithubLink(e.target.value);
                    setAnyChange(false);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      twitterLinkRef.current.focus();
                    }
                  }}
                ></IconTextField>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontSize: '17px', mt: 2, mb: 1 }}>
                  Twitter Link
                </Typography>
                <IconTextField
                  inputRef={twitterLinkRef}
                  size="small"
                  type="text"
                  fullWidth
                  value={twitterLink}
                  onChange={(e) => {
                    setTwitterLink(e.target.value);
                    setAnyChange(false);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      websiteLinkRef.current.focus();
                    }
                  }}
                ></IconTextField>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontSize: '17px', mt: 2, mb: 1 }}>
                  Website/Blog Link
                </Typography>
                <IconTextField
                  inputRef={websiteLinkRef}
                  size="small"
                  type="text"
                  fullWidth
                  value={websiteLink}
                  onChange={(e) => {
                    setWebsiteLink(e.target.value);
                    setAnyChange(false);
                  }}
                ></IconTextField>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AdditionalInformation;
