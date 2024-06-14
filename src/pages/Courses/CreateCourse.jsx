import { Button, Chip, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useRef } from 'react';
import { CircularProgress } from '@mui/material';
import SubHeader from '../../components/SideBarResponsive/SubHeader';
import { IconTextField } from '../../components/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import { courseAPI } from '../../api/requests/courses/courseAPI';
import { InputIconTextField } from '../../components/TextField/InputIconTextField';
import { handleAlert } from '../../utils/handleAlert';
import { getOrgName } from '../../utils/appendOrgQuery';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import handleFileUpload from '../../api/axios/fileUpload';
import axios from 'axios';

const CreateCourse = () => {
  useDocumentTitle('Create Course');
  const orgPath = getOrgName();
  const drawerWidth = 200;
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(null);
  const [keyPoints, setKeyPoints] = useState([]);
  const [descriptionPoints, setDescriptionPoints] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const [techName, setTechName] = useState('');
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [imageProgress, setImageProgress] = useState(false);
  const [createProgress, setCreateProgress] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelToken, setCancelToken] = useState(null);

  const priceRef = useRef(null);
  const descRef = useRef(null);

  const navigate = useNavigate();
  const handleGoToUploadpage = (id) => {
    navigate(`/org/${orgPath}/course/upload/${id}`);
  };

  const handleThumbnailUpload = async (event) => {
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      setCancelLoading(true);
      const reference = 'ORGANIZATION_DATA';
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const url = await handleFileUpload(event.target.files[0], source.token, reference);
      if (url) {
        setThumbnail(event.target.files[0]);
        setImageUrl(url);
      }
      setCancelLoading(false);
    }
  };

  const handleCancelUpload = (event) => {
    event.preventDefault();
    if (cancelToken) {
      cancelToken.cancel('Upload cancelled by the user');
    }
  };

  const handleNormal = async (postData) => {
    try {
      const data = await courseAPI.createCourse(postData);
      handleAlert('Course created successfully', 'success');
      setCreateProgress(false);
      handleGoToUploadpage(data.id);
    } catch (err) {
      setCreateProgress(false);
    }
  };

  const uploadData = async (e) => {
    setCreateProgress(true);
    const postData = {
      title: title,
      price: price,
      categories: category.join(),
      keyPoints: keyPoints,
      descriptionPoints: descriptionPoints,
      techStack: techStacks.join(),
      description: description,
      imageUrl,
    };
    if (postData) {
      handleNormal(postData);
    } else {
    }
  };

  const handleAddKeyPoint = () => {
    const trimed = keyPoints.map((item) => {
      return item.trim();
    });

    if (trimed.includes('', trimed)) {
      handleAlert('Key point should not be empty', 'error');
    } else {
      setKeyPoints([...trimed, '']);
    }
  };
  const handleInputChangeKeypoints = (event, index) => {
    const keyP = [...keyPoints];
    keyP[index] = event.target.value;
    setKeyPoints(keyP);
  };
  const handleRemoveKeypoint = (index) => {
    if (keyPoints.length > 3) {
      const keyP = [...keyPoints];
      keyP.splice(index, 1);
      setKeyPoints(keyP);
    } else {
      handleAlert('You need to fill three key points at least', 'error');
    }
  };

  const handleAddTechStack = () => {
    const trimed = techStacks.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      handleAlert('Tech stack should not be empty', 'error');
    } else {
      setTechStacks([...trimed, '']);
    }
  };
  const handleInputChangeTechStack = (event, index) => {
    const tech = [...techStacks];
    tech[index] = event.target.value;
    setTechStacks(tech);
  };
  const handleRemoveTechStack = (index) => {
    const tech = [...techStacks];
    tech.splice(index, 1);
    setTechStacks(tech);
  };
  const handleAddCategory = () => {
    const trimed = category.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      handleAlert('Category should not be empty', 'error');
    } else {
      setCategory([...trimed, '']);
    }
  };
  const handleInputChangeCategory = (event, index) => {
    const cat = [...category];
    cat[index] = event.target.value;
    setCategory(cat);
  };
  const handleRemoveCategory = (index) => {
    const cat = [...category];
    cat.splice(index, 1);
    setCategory(cat);
  };

  const handleAddPointDescription = () => {
    const trimed = descriptionPoints.map((item) => {
      return item.trim();
    });
    if (trimed.includes('', trimed)) {
      handleAlert('Description point should not be empty', 'error');
    } else {
      setDescriptionPoints([...trimed, '']);
    }
  };
  const handleChangeInput = (event, index) => {
    const des = [...descriptionPoints];
    des[index] = event.target.value;
    setDescriptionPoints(des);
  };
  const handleRemoveDescriptionPoint = (index) => {
    const des = [...descriptionPoints];
    des.splice(index, 1);
    setDescriptionPoints(des);
  };
  const handleCreateCourse = (e) => {
    e.preventDefault();
    // const trimed = descriptionPoints.map((item) => {
    //   return item.trim();
    // });
    // const keyPointTrimed = keyPoints.map((item) => {
    //   return item.trim();
    // });
    if (title.trim().length === 0) return handleAlert('Title should be present', 'error');
    if (description.trim().length < 50)
      return handleAlert('Description should be at least 50 characters long', 'error');
    /* if (
      keyPoints.length === 0 ||
      descriptionPoints.length === 0 ||
      keyPointTrimed.includes('') ||
      descriptionPoints.includes('')
    )
      return handleAlert('Key point and Description point cannot be empty', 'error');
    if (keyPoints.length < 3)
      return handleAlert('Please add at least three Key point', 'error');
    if (descriptionPoints.length < 5)
      return handleAlert('Please add at least five Description point', 'error');
    if (techStacks.length < 1)
      return handleAlert('Please add at least one Tech stack', 'error');
    if (category.length < 2)
      return handleAlert('Please add at least two categories', 'error');
    for (let i = 0; i < keyPointTrimed.length; i++) {
      if (keyPointTrimed[i].length < 35) {
        return handleAlert('Key point should be at least 35 characters', 'error');
      }
    }  */
    uploadData();
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <SubHeader title={'Create Course'} FormId={'create-course-form'} />
        <Box
          sx={{
            p: 2,
            width: { xs: '100%', sm: '95%', md: '90%', lg: '75%', xl: '60%' },
          }}
        >
          <form onSubmit={handleCreateCourse} id="create-course-form">
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
                label={'Title'}
                required
                type="text"
                fullWidth
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    priceRef.current.focus();
                  }
                }}
              ></TextField>
              <InputIconTextField
                size="small"
                type="file"
                inputProps={{ accept: 'image/jpeg,image/x-png' }}
                label={
                  imageProgress ? (
                    <>
                      Upload Thumbnail <CircularProgress size={17} />
                    </>
                  ) : (
                    'Upload Thumbnail'
                  )
                }
                InputLabelProps={{ shrink: true }}
                viewUrl={thumbnail}
                cancelLoading={cancelLoading}
                handleCancelUpload={handleCancelUpload}
                fullWidth
                onChange={(e) => handleThumbnailUpload(e)}
                accept={'.jpg, .jpeg, .png'}
              />
              {/* <TextField
                inputRef={priceRef}
                size="small"
                label={'Price'}
                type="number"
                fullWidth
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              ></TextField> */}
            </Box>
            {/* <Box
              sx={{
                mb: 2,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
              }}
            >
              
              {/* <InputIconTextField
                size="small"
                placeholder={'trailerUrl'}
                type="file"
                fullWidth
                viewUrl={trailerUrl}
                inputProps={{ accept: 'video/mp4' }}
                label={'Upload Trailer'}
                InputLabelProps={{ shrink: true }}
                iconEnd={videoProgress ? <Skeletons type="smallCircularLoader" /> : null}
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    setTrailerUrl(event.target.files[0]);
                  }
                }}
              /> 
            </Box> */}

            <Box sx={{ mb: 2, display: 'flex' }}>
              <TextField
                inputRef={descRef}
                size="small"
                id="outlined-textarea"
                label={'Description'}
                FormHelperTextProps={{ sx: { color: 'red' } }}
                multiline
                rows={4}
                fullWidth
                required
                helperText="Description should contain atleast 50 characters"
                inputProps={{ minLength: 50 }}
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </Box>

            <Box sx={{ mb: 2, p: 2, pb: 0, backgroundColor: '#F9F9F9' }}>
              <Typography
                variant="h6"
                sx={{ fontSize: '18px', color: '#474747', marginBottom: '8px' }}
              >
                Tech Stack
              </Typography>
              <Stack gap="8px">
                <TextField
                  placeholder="Enter Tech stack"
                  helperText="Press enter to add the tech stack"
                  value={techName}
                  onChange={(e) => setTechName(e.target.value)}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                      ev.preventDefault();
                      setTechStacks((techStacks) => [...techStacks, techName]);
                      setTechName('');
                    }
                  }}
                />
                <Stack direction={'row'} gap={'4px'}>
                  {techStacks.length > 0 &&
                    techStacks?.map((x, index) => (
                      <Chip label={x} onDelete={() => handleRemoveTechStack(index)} />
                    ))}
                </Stack>
              </Stack>
            </Box>

            <Box sx={{ mb: 2, p: 2, pb: 0, backgroundColor: '#F9F9F9' }}>
              <Typography
                variant="h6"
                sx={{ fontSize: '18px', color: '#474747', marginBottom: '8px' }}
              >
                Category
              </Typography>
              <Stack gap="8px">
                <TextField
                  placeholder="Enter Category"
                  helperText="Press enter to add the category"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                      ev.preventDefault();
                      setCategory((category) => [...category, categoryName]);
                      setCategoryName('');
                    }
                  }}
                />
                <Stack direction={'row'} gap={'4px'}>
                  {category.length > 0 &&
                    category?.map((x, index) => (
                      <Chip label={x} onDelete={() => handleRemoveCategory(index)} />
                    ))}
                </Stack>
              </Stack>
            </Box>

            <Box sx={{ mb: 2, p: 2, pb: 0, backgroundColor: '#F9F9F9' }}>
              <Typography variant="h6" sx={{ fontSize: '18px', color: '#474747' }}>
                Key Points
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                Key Points will be shown in list
              </Typography>
              {keyPoints?.map((item, index) => {
                return (
                  <>
                    <IconTextField
                      sx={{ mb: 2, backgroundColor: 'white' }}
                      size="small"
                      label={'key Points'}
                      fullWidth
                      value={item}
                      onChange={(event) => {
                        handleInputChangeKeypoints(event, index);
                      }}
                    />
                    <Box display={'flex'} justifyContent="space-between">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleRemoveKeypoint(index)}
                        sx={{ textTransform: 'none', mb: 2 }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </>
                );
              })}

              <Button
                size="small"
                onClick={handleAddKeyPoint}
                sx={{ textTransform: 'none', mb: 2 }}
              >
                <AddIcon
                  sx={{
                    color: '#698AFF',
                    fontSize: 16,
                    cursor: 'pointer',
                    mr: 1,
                  }}
                />
                Add Additional Key Points
              </Button>
            </Box>
            <Box sx={{ mb: 2, p: 2, pb: 0, backgroundColor: '#F9F9F9' }}>
              <Typography variant="h6" sx={{ fontSize: '18px', color: '#474747' }}>
                Description Points
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, mb: 2.5, color: '#787878' }}>
                Description Points will be shown in list
              </Typography>
              {descriptionPoints?.map((item, index) => {
                return (
                  <>
                    <IconTextField
                      size="small"
                      label={'description Points'}
                      sx={{ mb: 2, backgroundColor: 'white' }}
                      fullWidth
                      value={item}
                      onChange={(event) => {
                        handleChangeInput(event, index);
                      }}
                    />
                    <Box display={'flex'} justifyContent="space-between">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleRemoveDescriptionPoint(index)}
                        sx={{ textTransform: 'none', mb: 2 }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </>
                );
              })}
              <Button
                size="small"
                onClick={handleAddPointDescription}
                sx={{ textTransform: 'none', mb: 2 }}
              >
                <AddIcon
                  sx={{
                    color: '#698AFF',
                    fontSize: 16,
                    cursor: 'pointer',
                    mr: 1,
                  }}
                />
                Add Additional Description Point
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'flex-end' },
              }}
            >
              <Button
                sx={{ width: '120px', flexGrow: { xs: '1', sm: '0' } }}
                variant="contained"
                size="small"
                type="submit"
                disabled={createProgress}
              >
                {createProgress ? <CircularProgress size={20} /> : 'CREATE'}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};
export default CreateCourse;
