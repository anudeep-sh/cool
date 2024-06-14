import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import styled from 'styled-components';
import './Product.css';
import { useDispatch } from 'react-redux';
import { manipulateCart } from '../../Redux/AddToCart/Cart-Action';
import { REMOVE_ITEM } from '../../Redux/AddToCart/Cart-Constants';
import { useNavigate } from 'react-router-dom';
import { manipulateWishList } from '../../Redux/AddToWishlist/Wishlist-Action';
import { manipulateEditCourse } from '../../Redux/EditCourse/EditCourse-Action';
import {
  ADD_EDIT_COURSE,
  REMOVE_EDITABLE_COURSE,
} from '../../Redux/EditCourse/EditCourse-Constants';
import defaultImage from '../../assets/BannerImages/Thumbnail.png';
import { courseStageAPI } from '../../api/requests/courses/courseStageAPI';
import { courseAPI } from '../../api/requests/courses/courseAPI';
import GetValidatedTokenData from '../../utils/helper';
import { handleAlert } from '../../utils/handleAlert';
import ManageCourseAccess from '../../pages/Courses/ManageCourseAccess';
import ButtonAddAccess from '../SearchAndAdd/ButtonAddAccess';
import { getOrgName } from '../../utils/appendOrgQuery';

const CarouselItem = ({
  ProductDetails,
  index,
  techStack,
  category,
  keyfrombackend,
  loading,
  isEditable,
  isUserProfileInProduct,
  domainData,
  getCourses,
  title,
  disableHover,
  showDescription,
  containerHeight,
  forSuggestedOrgPopup,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openManageAccessDialog, setOpenManageAccessDialog] = React.useState(false);
  const [isEnrolled, setHasEnrolled] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currUser = GetValidatedTokenData();
  const orgPath = getOrgName();

  const getdata = () => {
    if (ProductDetails.courseStage === 'ENROLLED') {
      setHasEnrolled(true);
    }
    if (ProductDetails.courseStatus === 'EDIT') {
      setIsEditor(true);
    }

    if (
      ProductDetails.hasOwnProperty('courseStage') &&
      ProductDetails.hasOwnProperty('courseStatus')
    ) {
      return;
    }
  };

  const updateState = (data) => {
    setHasEnrolled(data.data.courseStage === 'ENROLLED');
    setIsEditor(data.data.courseStatus === 'EDIT');
  };

  useEffect(() => {
    const getCourseData = async () => {
      await getdata();
    };
    getCourseData();
  }, []);

  const enrollCourse = async (ProductDetails) => {
    await courseStageAPI
      .addCourseStage(ProductDetails.id, 'ENROLLED')
      .then((data) => {
        getAllCourses();
      })
      .catch((err) => {});
  };

  const getAllCourses = async () => {
    await courseStageAPI
      .getCourses('ENROLLED')

      .then((data) => {
        data.map((item) => {
          // if (cartItems?.filter((cartItems) => cartItems.id === item.id).length) {
          // } else {
          //   dispatch(manipulateCart(ADD_ITEM, item));
          // }
        });
      })
      .catch((err) => {});
  };

  const handleRemoveEnrolledCourse = async (id) => {
    await courseStageAPI
      .removeFromEnrolledCourses(id)
      .then((data) => {})
      .catch((err) => {
        dispatch(manipulateCart(REMOVE_ITEM, id));
      });
  };

  const handleClose = (_, reason) => {
    if (reason && reason === 'backdropClick') return;
    setIsHovered(false);
  };

  const isCurrentUser = (userId) => {
    return GetValidatedTokenData().id === userId;
  };

  const handleGoToDetailPage = (id, userId, orgName) => {
    if (isCurrentUser(userId)) navigate(`/org/${orgName}/course/videos/${id}`);
    else if (ProductDetails?.status === 'UNDERREVIEW') navigate('/under-review');
    else if (ProductDetails?.status === 'APPROVED') navigate(`/org/${orgPath}/course/videos/${id}`);
    else if (ProductDetails?.courseStage === 'ENROLLED')
      navigate(`/org/${orgPath}/course/videos/${id}`);
  };

  const handleEditCourse = (ProductDetails) => {
    dispatch(manipulateEditCourse(ADD_EDIT_COURSE, ProductDetails?.id));
  };

  const handleDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setIsHovered(false);
  };

  const handleManageAccessDialog = () => {
    setOpenManageAccessDialog(true);
  };

  const handleCloseManageAccessDialog = () => {
    setOpenManageAccessDialog(false);
    setIsHovered(false);
  };

  const handleDeleteCourse = async (ProductDetails) => {
    await courseAPI
      .deleteCourse(ProductDetails.id)
      .then((res) => {
        dispatch(manipulateWishList(REMOVE_EDITABLE_COURSE, ProductDetails.id));
        handleAlert(res?.data?.message, 'success');
        setOpenDeleteDialog(false);
        setIsHovered(false);
        getCourses();
      })
      .catch((err) => {
        handleAlert(err?.message, 'error');
      });
  };
  return (
    <>
      <Container
        onMouseEnter={() => !disableHover && setIsHovered(true)}
        onMouseLeave={() => !disableHover && setIsHovered(false)}
        className="container-carousel-item"
        key={keyfrombackend}
      >
        <Box
          className="overlay_container"
          sx={{
            backgroundColor: '#fff',
            borderRadius: '17px',
            boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.25)',
            padding: '10px',
          }}
        >
          {loading ? (
            <Skeleton variant="rectangular" width={210} height={118} />
          ) : (
            <img
              style={{
                width: '100%',
                height: 118,
                objectFit: 'cover',
                borderRadius: 8,
              }}
              alt={ProductDetails?.title}
              src={ProductDetails?.imageUrl ?? defaultImage}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = defaultImage;
              }}
            />
          )}
          {ProductDetails ? (
            <>
              <Box
                className="product-details"
                sx={{
                  height: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Box className="product-sub-details">
                    <Typography
                      gutterBottom
                      variant="body2"
                      sx={{
                        fontWeight: '700',
                        fontFamily: 'Poppins',
                        fontSize: '18px',
                        marginTop: '5px',
                        display: '-webkit-box!important',
                        WebkitLineClamp: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitBoxOrient: ' vertical',
                      }}
                    >
                      {ProductDetails.title}
                    </Typography>
                    <Typography
                      display="block"
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontWeight: '400',
                        fontFamily: 'Poppins',
                        fontSize: '12px',
                      }}
                    >
                      {`${ProductDetails?.authorData?.firstName} ${ProductDetails?.authorData?.lastName}`}
                    </Typography>
                    {isUserProfileInProduct === true ? (
                      <Typography display="block" variant="caption" color="text.secondary">
                        {ProductDetails?.status}
                      </Typography>
                    ) : (
                      <></>
                    )}
                  </Box>

                  <Box
                    sx={{
                      mt: 0.5,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        sx={{ mr: 0.5, fontWeight: '500' }}
                        variant="caption"
                        color="#faaf00"
                      >
                        {ProductDetails?.rating?.rating}
                      </Typography>
                      <Stack spacing={1} sx={{ mr: 0.5 }}>
                        <Rating
                          sx={{ fontSize: '12px' }}
                          name="half-rating"
                          defaultValue={ProductDetails?.rating?.rating}
                          precision={1}
                          readOnly
                        />
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {` (${ProductDetails?.rating?.ratedBy})`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
        {isHovered && !disableHover && (
          // <>
          <div className="hover">
            {/* your hover things will be here */}
            <Box
              className="video_content_container"
              style={{
                backgroundColor: '#00000095',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                key: { index },
                // width: 210, height: 118,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 20,
              }}
            >
              <Box>
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{
                    fontWeight: '300',
                    display: '-webkit-box!important',
                    WebkitLineClamp: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: ' vertical',
                    fontSize: '18px',
                    fontFamily: 'Poppins',
                  }}
                >
                  {ProductDetails?.title.toUpperCase()}
                </Typography>
                <hr />

                <Typography
                  sx={{
                    display: '-webkit-box!important',
                    WebkitLineClamp: 3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: 'vertical',
                    fontSize: '14px',
                    fontFamily: 'Poppins',
                    mt: 1,
                  }}
                >
                  {showDescription && (
                    <>
                      Course Description: <br />
                      {ProductDetails?.description || ProductDetails?.title}
                    </>
                  )}
                </Typography>

                {title !== 'Courses created by you' ? (
                  <>
                    <Typography
                      variant="overline"
                      className="value"
                      sx={{ mr: 1, lineHeight: 0, fontFamily: 'Poppins', fontSize: '12px' }}
                    >
                      {`Total Videos: ${ProductDetails?.videosCount ?? 0}`} <br />
                    </Typography>
                    <Typography
                      variant="overline"
                      sx={{ mr: 1, lineHeight: 0, fontFamily: 'Poppins', fontSize: '12px' }}
                    >
                      {`Total Sections: ${ProductDetails?.sectionsCount ?? 0}`}
                    </Typography>
                  </>
                ) : (
                  <Typography
                    variant="overline"
                    className="value"
                    sx={{ mr: 1, lineHeight: 0, fontFamily: 'Poppins', fontSize: '12px' }}
                  >
                    {ProductDetails?.description?.slice(0, 20)} <br />
                  </Typography>
                )}
              </Box>
              {forSuggestedOrgPopup ? (
                <></>
              ) : (
                <Box>
                  {!domainData && ProductDetails?.courseStage !== 'ENROLLED' ? (
                    <Box>
                      {isEditable ? (
                        <Box display={'flex'} flexDirection="column" gap="16px">
                          <Box display={'flex'} gap="16px">
                            <Button
                              fullWidth
                              sx={{ fontSize: '11px', fontWeight: '400' }}
                              variant="contained"
                              onClick={() => {
                                handleEditCourse(ProductDetails);
                                navigate(
                                  `/org/${ProductDetails.orgName}/course/update/${ProductDetails.id}`
                                );
                              }}
                            >
                              Edit Course
                            </Button>
                            {ProductDetails?.userId === currUser.id &&
                            (currUser.role === 'SUPERADMIN' ||
                              currUser.role === 'CREATOR' ||
                              (currUser.organizationId && currUser.role === 'ADMIN')) ? (
                              <Button
                                fullWidth
                                sx={{ fontSize: '11px', fontWeight: '400' }}
                                variant="contained"
                                onClick={() => {
                                  handleManageAccessDialog();
                                }}
                              >
                                Manage Access
                              </Button>
                            ) : null}
                          </Box>
                          <Box display={'flex'} gap="16px">
                            <Button
                              fullWidth
                              sx={{ fontSize: '11px', fontWeight: '400' }}
                              variant="outlined"
                              onClick={() => {
                                handleDeleteDialog(ProductDetails);
                              }}
                            >
                              Delete Course
                            </Button>
                            <Button
                              fullWidth
                              sx={{ fontSize: '11px', fontWeight: '400' }}
                              variant="contained"
                              onClick={() =>
                                handleGoToDetailPage(
                                  ProductDetails?.id,
                                  ProductDetails?.userId,
                                  ProductDetails?.orgName
                                )
                              }
                            >
                              View Course
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        <>
                          {isEditor && !isEnrolled ? (
                            <Grid
                              item
                              xs={12}
                              display="flex"
                              alignItems="center"
                              sx={{ flex: 1, margin: 0 }}
                              width={'100%'}
                            >
                              <Button
                                fullWidth
                                sx={{ fontSize: '11px', fontWeight: '400' }}
                                variant="outlined"
                                onClick={() =>
                                  handleGoToDetailPage(
                                    ProductDetails?.id,
                                    ProductDetails?.userId,
                                    ProductDetails?.orgName
                                  )
                                }
                              >
                                View Details
                              </Button>
                            </Grid>
                          ) : (
                            <Grid
                              item
                              xs={5}
                              display="flex"
                              alignItems="center"
                              sx={{ flex: 1 }}
                              width="100%"
                            >
                              <Button
                                fullWidth
                                sx={{ fontSize: '11px', fontWeight: '400' }}
                                variant="outlined"
                                onClick={() =>
                                  handleGoToDetailPage(
                                    ProductDetails?.id,
                                    ProductDetails?.userId,
                                    ProductDetails?.orgName
                                  )
                                }
                              >
                                View Details
                              </Button>
                            </Grid>
                          )}
                        </>
                      )}
                    </Box>
                  ) : (
                    <Box>
                      <Grid item xs={12} display="flex" alignItems="center" sx={{ ml: 1, flex: 1 }}>
                        <Button
                          fullWidth
                          sx={{ fontSize: '11px', fontWeight: '400' }}
                          variant="outlined"
                          onClick={() =>
                            handleGoToDetailPage(
                              ProductDetails?.id,
                              ProductDetails?.userId,
                              ProductDetails?.orgName
                            )
                          }
                        >
                          View Details
                        </Button>
                      </Grid>
                    </Box>
                  )}

                  {/* <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  <DialogTitle id="alert-dialog-title">{'item in cart?'}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      this Course in cart do you really want to move in wishlist
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => handleMoveToWishlist(ProductDetails)}>Yes</Button>
                    <Button onClick={handleClose}>Go to cart</Button>
                  </DialogActions>
                </Dialog> */}
                  <Dialog
                    open={openDeleteDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      backdropFilter: 'blur(2px)',
                    }}
                  >
                    <DialogTitle id="alert-dialog-title">
                      {'Do you really want to delete?'}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        this course will delete permanently
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => handleDeleteCourse(ProductDetails)}>Yes</Button>
                      <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    </DialogActions>
                  </Dialog>
                  <Dialog
                    open={openManageAccessDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      backdropFilter: 'blur(2px)',
                    }}
                  >
                    <DialogTitle id="alert-dialog-title">
                      {'Give course access permissions'}
                    </DialogTitle>
                    <DialogContent>
                      <ManageCourseAccess courseId={keyfrombackend} handleClose={handleClose} />
                    </DialogContent>
                    <DialogActions
                      sx={{
                        mt: -2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        mx: 2,
                      }}
                    >
                      <ButtonAddAccess
                        courseId={keyfrombackend}
                        setOpenManageAccessDialog={setOpenManageAccessDialog}
                      />
                      <Button onClick={handleCloseManageAccessDialog}>Cancel</Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              )}
            </Box>
          </div>
          // </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 220px;
  width: 220px;
  height: 13rem;
  cursor: pointer;
  z-index: 1;
  position: relative;
  margin-top: 0px;
  margin-bottom: 45px;

  .hover {
    z-index: 9000;
    height: 13rem;
    width: 220px;

    position: absolute;
    top: -0%;
    left: 0;
    border-radius: 17px;
    background-color: #18181890;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
  }
  .video_content_container {
    position: relative;

    height: 118%;
    padding: 1rem;
    padding-bottom: 20px;
  }
`;

export default React.memo(CarouselItem);
