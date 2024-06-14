import { Box } from '@mui/system';
import { Stack, Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SubHeader from '../../components/SideBarResponsive/SubHeader';
import { useSelector } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { IconTextField } from '../../components/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import { courseAPI } from '../../api/requests/courses/courseAPI';
import { InputIconTextField } from '../../components/TextField/InputIconTextField';
import { handleAlert } from '../../utils/handleAlert';
import { getOrgName } from '../../utils/appendOrgQuery';
import handleFileUpload from '../../api/axios/fileUpload';
import axios from 'axios';

const drawerWidth = 200;
const CourseUpdate = () => {
  const orgPath = getOrgName();
  const params = useParams();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(null);
  const [categories, setCategories] = useState('');
  const [keyPoints, setKeyPoints] = useState(['']);
  const [descriptionPoints, setDescriptionPoints] = useState(['']);
  const [techStack, setTechStack] = useState('');
  const [techStacks, setTechStacks] = useState([]);
  const [techName, setTechName] = useState('');
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrlByFileUpload, setImageUrlByFileUpload] = useState(null);
  const [imageProgress, setImageProgress] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelToken, setCancelToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const data = async () => {
      try {
        const { data } = await courseAPI.getSpecificCourse(params.id);
        setTitle(data?.courseData?.title);
        setPrice(data?.courseData?.price);
        setCategories(data?.courseData?.categories);
        setTechStack(data?.courseData?.techStack);
        setTechStacks(data?.courseData?.techStack.split(','));
        setCategory(data?.courseData?.categories.split(','));
        setDescription(data?.courseData?.description);
        setDescriptionPoints(data?.courseData?.descriptionPoints);
        setKeyPoints(data?.courseData?.keyPoints);
        setImageUrl(data?.courseData?.imageUrl);
        setTrailerUrl(data?.courseData?.trailerUrl);
      } catch (err) {}
    };

    data();
  }, []);
  const handleThumbnailUpload = async (event) => {
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      setImageUrl(event.target.files[0]);
      setCancelLoading(true);
      setImageProgress(true);
      const reference = 'ORGANIZATION_DATA';
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const url = await handleFileUpload(event.target.files[0], source.token, reference);
      if (url) {
        setImageUrlByFileUpload(url);
      }
      handleAlert('Image has been uploaded', 'success');
      setCancelLoading(false);
      setImageProgress(false);
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
      const data = await courseAPI.updateCourse(postData, params.id);
      handleAlert('Course updated successfully', 'success');
    } catch (err) {}
  };
  const handleUpdateImgTrailer = async (imageDataUrl, videoDataUrl) => {
    try {
      const data = await courseAPI.updateImageAndTrailer({ imageUrl: imageDataUrl }, params.id);
    } catch (err) {}
  };

  const uploadData = async (e) => {
    // e.preventDefault();
    setUpdateProgress(true);
    const imageData = imageUrlByFileUpload;
    const [imageDataUrl, videoDataUrl] = await Promise.all([imageData]);
    const postData = {
      title: title,
      price: price,
      categories: category.join(),
      keyPoints: keyPoints,
      descriptionPoints: descriptionPoints,
      techStack: techStacks.join(),
      description: description,
    };
    if (postData) {
      handleUpdateImgTrailer(imageDataUrl, videoDataUrl);
      handleNormal(postData);
      setUpdateProgress(false);
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
    if (techStacks.length > 1) {
      const tech = [...techStacks];
      tech.splice(index, 1);
      setTechStacks(tech);
    } else {
      handleAlert('You need to fill one tech stack at least', 'error');
    }
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
    if (category.length > 2) {
      const cat = [...category];
      cat.splice(index, 1);
      setCategory(cat);
    } else {
      handleAlert('You need to fill two categories at least', 'error');
    }
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
    if (descriptionPoints.length > 5) {
      const des = [...descriptionPoints];
      des.splice(index, 1);
      setDescriptionPoints(des);
    } else {
      handleAlert('You need to fill five description points at least', 'error');
    }
  };

  const courseId = useSelector((state) => state?.EditCourse?.courseId);
  const handleEditForm = () => {};

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (title.trim().length === 0) return handleAlert('Title should be present', 'error');
    // const trimed = descriptionPoints.map((item) => {
    //   return item.trim();
    // });
    // const keyPointTrimed = keyPoints.map((item) => {
    //   return item.trim();
    // });
    if (description.trim().length < 50)
      return handleAlert('Description should be at least 50 characters', 'error');
    // if (keyPoints.length < 3) {
    //   return handleAlert('Please add at least three Key point', 'error');
    // }
    // if (descriptionPoints.length < 5)
    //   return handleAlert('Please add at least five description point', 'error');
    // if (keyPointTrimed.includes('') || trimed.includes(''))
    //   return handleAlert('Key point and description point cannot be empty', 'error');
    // if (techStacks.length < 1)
    //   return handleAlert('Please add at least one Tech stack', 'error');
    // if (category.length < 2)
    //   return handleAlert('Please add at least two categories', 'error');
    // for (let i = 0; i < keyPointTrimed.length; i++) {
    //   if (keyPointTrimed[i].length < 35)
    //     return handleAlert('Key point should be at least 35 characters', 'error');
    // }
    uploadData();
  };

  return (
    <>
      {/* <SideBarResponsive /> */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <SubHeader
          title={'Course Update'}
          // handleEditForm={handleEditForm}
          // showUploadBtn={showUploadBtn}
          // UploadTitle={"Update"}
          FormId={'create-course-form'}
        />
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
                size="small"
                label={'Title'}
                type="text"
                required
                fullWidth
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></TextField>
              {/* <TextField
                size="small"
                label={'Price'}
                type="number"
                // required
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              ></TextField> */}
              <Box sx={{ width: '100%' }}>
                <InputIconTextField
                  size="small"
                  label={
                    imageProgress ? (
                      <>
                        Upload Thumbnail <CircularProgress size={17} />
                      </>
                    ) : (
                      'Upload Thumbnail'
                    )
                  }
                  cancelLoading={cancelLoading}
                  handleCancelUpload={handleCancelUpload}
                  viewUrl={imageUrl}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: 'image/jpeg,image/x-png' }}
                  // sx={{ mr: 2 }}/
                  // required={imageUrl ? false : true}
                  type="file"
                  fullWidth
                  onChange={(e) => handleThumbnailUpload(e)}
                />
                <Button
                  fullWidth
                  sx={{
                    fontSize: '12px!important',
                    mt: 1,
                    display: 'flex',
                    justifyContent: 'left',
                  }}
                  onClick={() => openInNewTab(imageUrl && imageUrl)}
                >
                  view previous Image
                </Button>
              </Box>
            </Box>
            {/* <Box
              sx={{
                mb: 2,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
              }}
            >
              
              <Box sx={{ width: '100%' }}>
                <InputIconTextField
                  size="small"
                  label={'Upload Trailer'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: 'video/mp4' }}
                  viewUrl={trailerUrl}
                  // required={trailerUrl ? false : true}
                  type="file"
                  fullWidth
                  iconEnd={videoProgress ? <Skeletons type="smallCircularLoader" /> : null}
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      setTrailerUrl(event.target.files[0]);
                    }
                  }}
                />
                <Button
                  fullWidth
                  sx={{
                    fontSize: '12px!important',
                    mt: 1,
                    display: 'flex',
                    justifyContent: 'left',
                  }}
                  onClick={() => openInNewTab(trailerUrl && trailerUrl)}
                >
                  view previous Video
                </Button>
              </Box>
            </Box> */}

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
                id="outlined-textarea"
                label={'Description'}
                multiline
                rows={4}
                fullWidth
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
                  {techStacks[0]?.length > 0 &&
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
                  {category[0]?.length > 0 &&
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
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: { xs: 'space-between', md: 'flex-end' },
              }}
            >
              <Button
                sx={{ width: '240px', flexGrow: { xs: '1', md: '0' } }}
                variant="outlined"
                size="small"
                onClick={() => {
                  navigate(
                    orgPath
                      ? `/org/${orgPath}/course/upload/${params.id}`
                      : `/course/upload/${params.id}`
                  );
                }}
              >
                Upload Course Videos
              </Button>
              <Button
                sx={{ width: '240px', flexGrow: { xs: '1', md: '0' } }}
                variant="contained"
                size="small"
                type="submit"
              >
                {updateProgress ? <CircularProgress size={20} /> : 'UPDATE COURSE'}
              </Button>
            </Box>
            {/* {imageUrl && (
                <CardMedia
                  component="img"
                  sx={{
                    height: 80,
                    objectFit: "cover",
                  }}
                  alt={imageUrl}
                  src={URL.createObjectURL(imageUrl)}
                />
              )} */}
          </form>
        </Box>
      </Box>
    </>
  );
};
export default CourseUpdate;
