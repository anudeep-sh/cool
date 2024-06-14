import React, { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {
  Stack,
  Box,
  Typography,
  Button,
  Rating,
  TextField,
  Pagination,
  Avatar,
  Grid,
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import { manipulateuserdata } from '../../Redux/UserData/User-Action';
import { ADD_USER_DATA, SET_ALERT_DATA } from '../../Redux/UserData/User-Constants';
import ThumbDownOffAltRoundedIcon from '@mui/icons-material/ThumbDownOffAltRounded';
import { courseVideoAPI } from '../../api/requests/courses/courseVideoAPI';
import { courseReviewAPI } from '../../api/requests/courses/courseReviewAPI';
import { userAPI } from '../../api/requests/users/userAPI';
import UserReview from './UserReview';
import { handleAlert } from '../../utils/handleAlert';

const labels = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Amazing , above expectations!',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const Reviews = ({ ratings, getdata, courseStage }) => {
  const [value, setValue] = useState(ratings);
  const [hover, setHover] = useState(-1);
  const [showedit, setShowedit] = useState(false);
  const [revlike, setRevlike] = useState(false);
  const [revlikeid, setRevlikeid] = useState();
  const [revdlike, setRevdlike] = useState(false);
  const [revdlikeid, setRevdlikeid] = useState();
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [reportdesc, setReportdesc] = useState(false);
  const [editreview, setEditreview] = useState(false); // for edit dialog box
  const [reportid, setReportid] = useState();
  const [page, setPage] = useState(1);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);
  const [progress4, setProgress4] = useState(0);
  const [progress5, setProgress5] = useState(0);
  const [UserReviews, setUserReviews] = useState();
  const [UserReport, setUserReport] = useState();
  const [reviews, setReviews] = useState([]);
  const [totalreviews, setTotalreviews] = useState();
  const [userReviewPresent, setUserReviewPresent] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const matches = useMediaQuery('(max-width:600px)');

  let averageRating =
    reviews.length > 0
      ? Math.floor(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length)
      : 0;

  const handleopen = () => {
    setOpen(true);
    setDialog(true);
  };

  const userinfo = async () => {
    try {
      const data = await userAPI.getUserInfo();
      return data;
    } catch (err) {}
  };

  const { id } = useParams();

  const addReviews = async () => {
    try {
      const data = await courseReviewAPI.addReviews(id, {
        rating: value,
        review: UserReviews,
      });
      setDialog(false);
      data[0].userData = await userinfo();
      data[0].likes = 0;
      data[0].disLikes = 0;
      reviews.unshift(data[0]);
      setReviews([...reviews]);
      handleAlert('Review added', 'success');
      setUserReviewPresent(true);
      getReviews();
    } catch (error) {
      handleAlert(error?.response.data, 'error');
      setDialog(false);
    }
  };

  const getReviews = async () => {
    try {
      setReviewsLoading(true);
      const data = await courseReviewAPI.getReviews(id, page);
      const totalstars =
        data.rating.Star1 +
        data.rating.Star2 +
        data.rating.Star3 +
        data.rating.Star4 +
        data.rating.Star5;
      if (totalstars > 0) {
        setProgress1(Math.round((data.rating.Star1 * 100) / totalstars));
        setProgress2(Math.round((data.rating.Star2 * 100) / totalstars));
        setProgress3(Math.round((data.rating.Star3 * 100) / totalstars));
        setProgress4(Math.round((data.rating.Star4 * 100) / totalstars));
        setProgress5(Math.round((data.rating.Star5 * 100) / totalstars));
      }
      if (data.userReview.id) {
        setUserReviewPresent(true);
        const currentUserReview = data.reviews.filter((review) => review.id === data.userReview.id);
        const otherReviews = data.reviews.filter((review) => review.id !== currentUserReview[0].id);
        const updatedReviews = [...currentUserReview, ...otherReviews];
        setReviews(updatedReviews);
      } else {
        setUserReviewPresent(false);
        setReviews(data.reviews);
      }
      setTotalreviews(data.totalReviews);
      setReviewsLoading(false);
      getdata();
    } catch (err) {}
  };

  useEffect(() => {
    getReviews();
  }, [page]);

  const giveLike = async (id, isDisliked, i) => {
    try {
      const data = await courseReviewAPI.handleLikesAndDislikes(id, 'LIKE', {});
      if (isDisliked) {
        reviews[i].likes = reviews[i].likes + 1;
        reviews[i].disLikes = reviews[i].disLikes - 1;
        reviews[i].isDisLiked = null;
        reviews[i].isLiked = true;
      } else {
        reviews[i].likes = reviews[i].likes + 1;
        reviews[i].isLiked = true;
      }
      setReviews([...reviews]);
    } catch (err) {}
  };

  const giveDislike = async (id, isLiked, i) => {
    try {
      const data = await courseReviewAPI.handleLikesAndDislikes(id, 'DISLIKE', {});
      if (isLiked) {
        reviews[i].disLikes = reviews[i].disLikes + 1;
        reviews[i].likes = reviews[i].likes - 1;
        reviews[i].isLiked = null;
        reviews[i].isDisLiked = true;
      } else {
        reviews[i].disLikes = reviews[i].disLikes + 1;
        reviews[i].isDisLiked = true;
      }
      setReviews([...reviews]);
    } catch (err) {}
  };

  const report = async () => {
    try {
      const data = await courseReviewAPI.addReviewReport(reportid, {
        reportDescription: UserReport,
      });
      handleAlert('report submitted', 'success');
    } catch (err) {}
  };

  const removeLikes = async (id, i) => {
    try {
      const data = await courseReviewAPI.handleLikesAndDislikes(id, 'REMOVELIKE', {});
      reviews[i].likes = reviews[i].likes - 1;
      reviews[i].isLiked = null;
      setReviews([...reviews]);
    } catch (err) {}
  };

  const removeDislikes = async (id, i) => {
    try {
      const data = await courseReviewAPI.handleLikesAndDislikes(id, 'REMOVEDISLIKE', {});
      reviews[i].disLikes = reviews[i].disLikes - 1;
      reviews[i].isDisLiked = null;
      setReviews([...reviews]);
    } catch (err) {}
  };

  const handlerevlike = (id, isLiked, isDisliked, i) => {
    setRevlike(!revlike);
    setRevdlike(false);
    setRevlikeid(id);
    if (!isLiked) {
      giveLike(id, isDisliked, i);
    } else {
      removeLikes(id, i);
    }
  };

  const handlerevdislike = (id, isLiked, isDisliked, i) => {
    setRevdlike(!revdlike);
    setRevlike(false);
    setRevdlikeid(id);
    if (!isDisliked) {
      giveDislike(id, isLiked, i);
    } else {
      removeDislikes(id, i);
    }
  };

  return (
    <>
      <Grid>
        <Grid container xs={12} display="flex" spacing={2} mb={2}>
          <Grid item xs={8} sm={6}>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '18px', sm: '18px', md: '22px' },
                color: '#292929',
                fontWeight: 'bold',
              }}
            >
              Rating & Reviews
            </Typography>
          </Grid>

          {!userReviewPresent && courseStage === 'ENROLLED' && (
            <Grid item xs={4} sm={6} display={'flex'} justifyContent={'flex-end'}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  fontSize: { xs: '11px', sm: '12px', mds: '13px' },
                  textTransform: { xs: 'capitalize', sm: 'uppercase' },
                  mb: 1,
                }}
                onClick={handleopen}
              >
                Review
              </Button>
            </Grid>
          )}
        </Grid>

        <Grid container xs={12} sx={{ flexDirection: 'column' }}>
          <Grid item xs={6} sx={{ pl: '0px!important' }}>
            {reviewsLoading ? (
              <Skeleton variant="text" animation="wave" width={200} height={30} />
            ) : (
              <Stack direction="row" spacing={0.6} alignItems={'center'}>
                <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
                  {averageRating === 0 ? 'N/A' : averageRating.toFixed(1)}
                </Typography>
                <Rating
                  value={averageRating === 0 ? 0 : averageRating}
                  precision={0.5}
                  readOnly
                  sx={{ fontSize: { xs: '20px', md: '24px' } }}
                  emptyIcon={
                    <StarBorderIcon
                      sx={{
                        color: '#FAAF00',
                        fontSize: { xs: '20px', md: '24px' },
                      }}
                    />
                  }
                />
              </Stack>
            )}
            {reviewsLoading ? (
              <Skeleton variant="text" animation="wave" width={100} height={30} />
            ) : (
              <Typography
                variant="caption"
                sx={{ color: '#A0A0A0', fontWeight: '400' }}
              >{`(${totalreviews}) Reviews`}</Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={'2px'}>
              <StarIcon
                sx={{
                  color: '#FAAF00',
                  fontSize: { xs: '16px', sm: '16px', lg: '18px' },
                }}
              />
              <Typography variant="caption" sx={{ color: '#A0A0A0', fontWeight: '500' }}>
                5
              </Typography>
              <LinearProgressWithLabel
                sx={{
                  width: { xs: '180px', sm: '200px' },
                  height: '4px',
                  borderRadius: '8px',
                }}
                value={progress5}
              />
            </Stack>
            <Stack direction="row" spacing={'2px'}>
              <StarIcon
                sx={{
                  color: '#FAAF00',
                  fontSize: { xs: '16px', sm: '16px', lg: '18px' },
                }}
              />
              <Typography variant="caption" sx={{ color: '#A0A0A0', fontWeight: '500' }}>
                4
              </Typography>
              <LinearProgressWithLabel
                sx={{
                  width: { xs: '180px', sm: '200px' },
                  height: '4px',
                  borderRadius: '8px',
                }}
                value={progress4}
              />
            </Stack>
            <Stack direction="row" spacing={'2px'}>
              <StarIcon
                sx={{
                  color: '#FAAF00',
                  fontSize: { xs: '16px', sm: '16px', lg: '18px' },
                }}
              />
              <Typography variant="caption" sx={{ color: '#A0A0A0', fontWeight: '500' }}>
                3
              </Typography>
              <LinearProgressWithLabel
                sx={{
                  width: { xs: '180px', sm: '200px' },
                  height: '4px',
                  borderRadius: '8px',
                }}
                value={progress3}
              />
            </Stack>
            <Stack direction="row" spacing={'2px'}>
              <StarIcon
                sx={{
                  color: '#FAAF00',
                  fontSize: { xs: '16px', sm: '16px', lg: '18px' },
                }}
              />
              <Typography variant="caption" sx={{ color: '#A0A0A0', fontWeight: '500' }}>
                2
              </Typography>
              <LinearProgressWithLabel
                sx={{
                  width: { xs: '180px', sm: '200px' },
                  height: '4px',
                  borderRadius: '8px',
                }}
                value={progress2}
              />
            </Stack>
            <Stack direction="row" spacing={'2px'}>
              <StarIcon
                sx={{
                  color: '#FAAF00',
                  fontSize: { xs: '16px', sm: '16px', lg: '18px' },
                }}
              />
              <Typography variant="caption" sx={{ color: '#A0A0A0', fontWeight: '500' }}>
                1
              </Typography>
              <LinearProgressWithLabel
                sx={{
                  width: { xs: '180px', sm: '200px' },
                  height: '4px',
                  borderRadius: '8px',
                }}
                value={progress1}
              />
            </Stack>
          </Grid>
        </Grid>

        <Grid xs={12} mt={2}>
          {reviews[0] && userReviewPresent && (
            <>
              <Typography varaint="h5" sx={{ color: '#292929', fontWeight: 'bold', mb: 2 }}>
                Your Review
              </Typography>

              <UserReview
                valuess={reviews[0]}
                getReviews={getReviews}
                setUserReviewPresent={setUserReviewPresent}
              />
            </>
          )}

          <Typography varaint="h5" sx={{ color: '#292929', fontWeight: 'bold', mb: 2 }}>
            All Reviews
          </Typography>
          {reviews.length === 0 ? (
            <Typography varaint="h6" sx={{ color: '#292929', fontWeight: 'bold', mb: 2 }}>
              No reviews yet
            </Typography>
          ) : (
            <>
              {reviews?.map((valuess, id) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Box sx={{ display: 'flex', gap: '12px' }}>
                    <Avatar
                      sx={{
                        width: { xs: 32, md: 42 },
                        height: { xs: 32, md: 42 },
                        alignItems: 'center',
                        lineHeight: { xs: 14, sm: 24 },
                      }}
                      alt={valuess.userData?.username}
                      src={valuess.userData?.profilePhotoLink}
                    >
                      {valuess.userData?.username.charAt(0)}
                    </Avatar>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      {/* <Stack> */}
                      <Typography variant="caption" sx={{ fontWeight: '600' }}>
                        {valuess.userData?.username}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Rating
                          precision={0.5}
                          readOnly
                          value={valuess.rating}
                          sx={{ fontSize: { xs: '16px', sm: '16px', lg: '18px' } }}
                          emptyIcon={
                            <StarBorderIcon
                              sx={{
                                color: '#FAAF00',
                                fontSize: { xs: '16px', sm: '16px', lg: '18px' },
                              }}
                            />
                          }
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#333333',
                            mr: 0.5,
                            display: '-webkit-box!important',
                            WebkitLineClamp: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            WebkitBoxOrient: ' vertical',
                            overflowX: 'scroll',
                          }}
                        >
                          {moment(valuess.created_at).fromNow()}
                        </Typography>
                      </Stack>
                      {/* </Stack> */}
                    </Box>
                    <Button
                      variant="outlined"
                      sx={{ textTransform: 'capitalize', color: '#282828' }}
                      onClick={() => {
                        setOpen(true);
                        setReportdesc(true);
                        setReportid(valuess.id);
                      }}
                    >
                      Report
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      paddingLeft: '3rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      paddingBottom: '0.5rem',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#111112',
                        fontSize: { xs: '14px', md: '16px' },
                      }}
                    >
                      {valuess.review}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Box
                        onClick={() => {
                          handlerevlike(valuess.id, valuess.isLiked, valuess.isDisLiked, id);
                        }}
                        sx={{ cursor: 'pointer' }}
                      >
                        {valuess.isLiked ? (
                          <ThumbUpAltIcon
                            color="primary"
                            sx={{ fontSize: { xs: '16px', md: '18px' } }}
                          />
                        ) : (
                          <ThumbUpOutlinedIcon
                            color="#717478"
                            sx={{ fontSize: { xs: '16px', md: '18px' } }}
                          />
                        )}
                      </Box>
                      <Typography variant="caption" sx={{ color: '#A0A0A0', fontWeight: '500' }}>
                        {valuess.likes}
                      </Typography>
                      <Box
                        onClick={() => {
                          handlerevdislike(valuess.id, valuess.isLiked, valuess.isDisLiked, id);
                        }}
                        sx={{ cursor: 'pointer' }}
                      >
                        {valuess.isDisLiked ? (
                          <ThumbDownIcon
                            color="primary"
                            sx={{ fontSize: { xs: '16px', md: '18px' } }}
                          />
                        ) : (
                          <ThumbDownOffAltRoundedIcon
                            color="#717478"
                            sx={{ fontSize: { xs: '16px', md: '18px' } }}
                          />
                        )}
                      </Box>
                      <Typography variant="caption" sx={{ color: '#A0A0A0', fontWeight: '500' }}>
                        {valuess.disLikes}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </>
          )}

          <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Pagination
              page={page}
              onChange={(event, page) => {
                setPage(page);
              }}
              count={Math.ceil(parseInt(totalreviews) / 8)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </Grid>

        {dialog && (
          <Dialog fullWidth open={open}>
            <DialogTitle
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #F0EFF2',
              }}
            >
              Your reviews matter to us!
              <Box>
                <ClearIcon
                  onClick={() => {
                    setDialog(false);
                  }}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginTop: '5px',
                }}
              >
                {value !== null && (
                  <Box
                    sx={{
                      ml: 2,
                      color: '#282828',
                      fontSize: '16px',
                      fontWeight: '600',
                    }}
                  >
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
                <Rating
                  name="hover-feedback"
                  value={value}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarBorderIcon
                      style={{ opacity: 0.55, color: '#FAAF00' }}
                      fontSize="inherit"
                    />
                  }
                />
                <TextField
                  label="Type your reviews here..."
                  rows={10}
                  onChange={(e) => {
                    setUserReviews(e.target.value);
                  }}
                ></TextField>
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: '10px 20px' }}>
              <Button
                variant="contained"
                sx={{ textTransform: 'capitalize', width: '100%' }}
                onClick={() => {
                  addReviews();
                }}
              >
                Rate Now{' '}
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {reportdesc && (
          <Dialog fullWidth open={open}>
            <DialogTitle
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #F0EFF2',
              }}
            >
              Your report matter to us!
              <Box>
                <ClearIcon
                  onClick={() => {
                    setReportdesc(false);
                  }}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginTop: '5px',
                }}
              >
                <TextField
                  label="Type your report here..."
                  rows={10}
                  onChange={(e) => {
                    setUserReport(e.target.value);
                  }}
                ></TextField>
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: '10px 20px' }}>
              <Button
                variant="contained"
                sx={{ textTransform: 'capitalize', width: '100%' }}
                onClick={() => {
                  report();
                  setReportdesc(false);
                }}
              >
                Report{' '}
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {editreview && (
          <Dialog fullWidth open={open}>
            <DialogTitle
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #F0EFF2',
              }}
            >
              Your reviews matter to us!
              <Box>
                <ClearIcon
                  onClick={() => {
                    setDialog(false);
                  }}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginTop: '5px',
                }}
              >
                {value !== null && (
                  <Box
                    sx={{
                      ml: 2,
                      color: '#282828',
                      fontSize: '16px',
                      fontWeight: '600',
                    }}
                  >
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
                <Rating
                  name="hover-feedback"
                  value={value}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarBorderIcon
                      style={{ opacity: 0.55, color: '#FAAF00' }}
                      fontSize="inherit"
                    />
                  }
                />
                <TextField
                  label="Type your reviews here..."
                  rows={10}
                  onChange={(e) => {
                    setUserReviews(e.target.value);
                  }}
                ></TextField>
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: '10px 20px' }}>
              <Button
                variant="contained"
                sx={{ textTransform: 'capitalize', width: '100%' }}
                onClick={() => {}}
              >
                Rate Now{' '}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Grid>
    </>
  );
};

export default Reviews;
