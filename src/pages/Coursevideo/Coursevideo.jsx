import React, { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import './Coursevideo.css';
import Pagination from '@mui/material/Pagination';
import {
  Stack,
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Grid,
  Tabs,
  Tab,
} from '@mui/material';
import ReactPlayer from 'react-player';
import CourseStatusUpdate from '../Courses/CourseStatusUpdate';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';
// import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import File from '../../assets/courseVideosUpload/FILE.svg';
import Reviews from '../../components/Reviews/Reviews';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import Getcourses from '../../components/Getcourses/Getcourses';
import ThumbDownOffAltRoundedIcon from '@mui/icons-material/ThumbDownOffAltRounded';
import { courseAPI } from '../../api/requests/courses/courseAPI';
import { courseVideoAPI } from '../../api/requests/courses/courseVideoAPI';
import { courseCommentAPI } from '../../api/requests/courses/courseCommentAPI';
import { userAPI } from '../../api/requests/users/userAPI';
import Skeletons from '../../components/Skeleton/Skeletons';
import LinearProgressWithLabelReusable from '../../components/LinearProgress/LinearProgressWithLabelReusable';
import GetValidatedTokenData from '../../utils/helper';
import { getOrgData } from '../../organization';
import { ASSET_CONFIGS } from '../../assets/assetConfigs';
import { handleAlert } from '../../utils/handleAlert';
import GetCertificate from '../../components/Getcourses/GetCertificate';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
import { getOrgName } from '../../utils/appendOrgQuery';
import Popup from '../../components/PopUp';
const styles = {
  fontWeight: '600',
  fontFamily: 'Roboto',
  cursor: 'pointer',
  fontSize: '18px',
  lineHeight: '18px',
  letterSpacing: '0.4px',
  textDecoration: 'none',
  padding: '11px 16px',
  marginLeft: '2rem',
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, md: 2 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Coursevideo = () => {
  useDocumentTitle('Course Details');
  const orgName = getOrgName();
  const [isCertificateRequired, setIsCertificateRequired] = useState(true);
  // const [sort, setSort] = useState(false);
  const [dot, setDot] = useState(false);
  const [Id, setId] = useState(null);
  const [rid, setRid] = useState(null);
  const [commments, setCommments] = useState(false);
  const [usercommments, setUsercommments] = useState();
  const [reeply, setReeply] = useState(null);
  const [userreply, setUserreply] = useState();
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(true);
  const [url, setUrl] = useState(0);
  const [hover, setHover] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [more, setMore] = useState(false);
  const [editcomm, setEditcomm] = useState(false);
  const [openreply, setOpenreply] = useState(false);
  const [editcom, setEditcom] = useState();
  const [open, setOpen] = useState(false);
  const [UserReport, setUserReport] = useState();
  const [reportid, setReportid] = useState();
  const [secindex, setSecindex] = useState(0);
  const [vidindex, setVidindex] = useState(0);
  const [vid, setVid] = useState(null);
  const [page, setPage] = useState(1);
  const [userprogresss, setUserprogresss] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentuser, setCurrentuser] = useState();
  const [totalcomments, setTotalcomments] = useState([]);
  const [totalreplies, setTotalreplies] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [coursedata, setCoursedata] = useState([]);
  const [authordata, setAuthordata] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [organization, setOrganization] = useState(false);
  const [timer, setTimer] = useState(true);
  const [status, setStatus] = useState('');
  const matches = useMediaQuery('(max-width:450px)');
  const navigate = useNavigate();
  const currUser = GetValidatedTokenData();
  const [openReportDescPopup, setOpenReportDescPopup] = useState(false);
  const handleReportDescOpen = () => setOpenReportDescPopup(true);
  const handleReportDescClose = () => setOpenReportDescPopup(false);

  const handleReportSubmit = () => {
    report(UserReport);
    handleReportDescClose();
  };
  const getDomainData = async () => {
    const data = await getOrgData();
    if (data) {
      setOrganization(true);
    }
    setTimer(false);
  };

  // const handleSort = () => {
  //   setSort(!sort);
  // };
  const handleDot = (Id, i) => {
    setDot(!dot);
    setId(Id);
    // setEditcom(null)
  };

  const [states, setStates] = useState({
    playing: false,
    duration: 0,
    playedTime: 0,
    playbackSpeed: 1,
    playedSeconds: 0,
    played: 0,
    loaded: 0,
    loadedSeconds: 0,
  });

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDuration = (duration) => {
    const totalDuration = new Date(duration * 1000).toISOString().slice(14, 19);
    setStates({
      ...states,
      duration: totalDuration,
    });
  };

  const handlePlayback = (e) => {
    setStates({
      ...states,
      playbackSpeed: e,
    });
  };

  const [videoCompleted, setVideoCompleted] = useState(false);

  const handleEnd = () => {
    setVideoCompleted(true);
    setStates({
      ...states,
      playing: false,
    });
  };

  const anchorRefMenu = React.useRef(null);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleToggle = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  };

  const handleCloseClick = (event) => {
    if (anchorRefMenu.current && anchorRefMenu.current.contains(event.target)) {
      return;
    }

    setOpenMenu(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenMenu(false);
    } else if (event.key === 'Escape') {
      setOpenMenu(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openMenu);
  React.useEffect(() => {
    if (prevOpen.current === true && openMenu === false) {
      anchorRefMenu.current.focus();
    }

    prevOpen.current = openMenu;
  }, [openMenu]);

  const [playingTime, setPlayingTime] = useState(0);

  const getVideoIntervals = async () => {
    try {
      const data = await courseVideoAPI.getVideoIntervals();
      localStorage.setItem('courseVideoMapping', JSON.stringify(data));
    } catch (err) {}
  };

  const videoMappingHelper = (courseVideoMapping, videoDuration) => {
    let nearestKey;
    let minDifference = Number.MAX_SAFE_INTEGER;

    for (const key in courseVideoMapping.videoLengths) {
      if (courseVideoMapping.videoLengths.hasOwnProperty(key)) {
        const difference = Math.abs(parseInt(videoDuration) / 60 - parseInt(key));
        if (difference < minDifference) {
          minDifference = difference;
          nearestKey = key;
        }
      }
    }
    return nearestKey;
  };

  const handleProgress = (state) => {
    setPlayingTime(state.playedSeconds);
    if (Math.round(playingTime) % Math.round(intervalValue / 1000) === 0) {
      userprogress();
    }
    const playedTime = state.playedSeconds;
    const playedSeconds = new Date(playedTime * 1000).toISOString().slice(14, 19);
    setStates({
      ...states,
      playedTime: playedTime,
      playedSeconds: playedSeconds,
      played: state.played,
      loaded: state.loaded,
    });
  };

  const { playing } = states;
  const MouseEntered = () => setHover(true);
  const MouseLeave = () => setHover(false);

  const [openLoader, setOpenLoader] = useState(true);
  const [coursePercentage, setCoursePercentage] = useState(0);

  let { id } = useParams();
  const [courseTitle, setCourseTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courseStage, setCourseStage] = useState('');

  const getdata = async () => {
    try {
      const response = await courseAPI.getSpecificCourse(id);
      setCourseStage(response.data.courseStage);
      setStatus(response.data.courseData.status);
      setCourseId(response.data.courseData.id);
      updateState(response);
      const playedDurationObj = {};
      response.data.courseVideos[secindex]?.videosData?.map((duration, i) => {
        playedDurationObj[i] = duration.playedDuration;
      });
      localStorage.setItem('playedDurationObj', JSON.stringify(playedDurationObj));
      // localStorage.setItem("coursePercentage", res.data.courseCompletion);
      setOpenLoader(false);
    } catch (error) {
      setOpenLoader(false);
      console.error('Failed to fetch and update course details:', error);
    }
  };
  useEffect(() => {
    const fetchDataAndSetup = async () => {
      await getdata();
      await getDomainData();
      await getVideoIntervals();
    };
    fetchDataAndSetup();
  }, [courseStage, status]);

  const [videoDuration, setVideoDuration] = useState(0);
  const updateState = (data) => {
    setIsOwner(data.data.authorData.id === currUser.id);
    setAuthordata(data.data.authorData);
    setCoursedata(data.data.courseVideos);
    setCoursePercentage(data.data.courseCompletion);
    setUserdata(data.data.courseData);
    setUrl(data.data.courseVideos[secindex].videosData[vidindex].videoUrl);
    setVideoDuration(data.data.courseVideos[secindex].videosData[vidindex].videoLength);
    setIsCertificateRequired(data.data.isCertificateRequired);
    setCourseTitle(data.data.courseData.title);
    const courseVideoMapping = localStorage.getItem('courseVideoMapping');

    const nearestKey = videoMappingHelper(
      JSON.parse(courseVideoMapping),
      parseInt(data.data.courseVideos[secindex].videosData[vidindex].videoLength)
    );

    setIntervalValue(
      parseInt(data.data.courseVideos[secindex].videosData[vidindex].videoLength) *
        JSON.parse(courseVideoMapping).videoLengths[parseInt(nearestKey)] *
        1000
    );
  };

  const userprogress = async () => {
    if (
      coursedata &&
      coursedata[secindex]?.id &&
      coursedata[secindex]?.videosData[vidindex]?.id &&
      playingTime !== 0 &&
      !isOwner
    ) {
      try {
        const userProgressBody = {
          sectionId: coursedata[secindex]?.id,
          videoId: coursedata[secindex]?.videosData[vidindex]?.id,
          playedDuration: Math.round(playingTime),
          isCompleted: videoDuration - playingTime <= 3 || videoCompleted ? 'true' : 'false',
        };
        await courseVideoAPI.updateUserProgress(id, userProgressBody);
      } catch (err) {}
    }
  };

  const [intervalValue, setIntervalValue] = useState(1000);

  // useEffect(() => {
  //   getdata().then(
  //     (data) => updateState(data),
  //     (error) => {
  //       alert("Data Fetching error");
  //       setErrorFetchedChecker((c) => !c);
  //     }
  //   );
  // }, [errorFetchedChecker]);

  const getComments = async () => {
    try {
      const data = await courseCommentAPI.getComments(id, page);
      setComments(data.commentsData);
      setTotalcomments(parseInt(data.commentsCount));
    } catch (err) {}
  };

  const userinfo = async () => {
    try {
      const data = await userAPI.getUserInfo();
      setCurrentuser(data && data);
    } catch (err) {}
  };
  const addComment = async () => {
    try {
      const data = await courseCommentAPI.addComment(id, {
        comment: usercommments,
      });
      data[0].userData = currentuser;
      data[0].likes = 0;
      data[0].dislikes = 0;
      setTotalcomments((a) => a + 1);
      comments.unshift(data[0]);
      setComments([...comments]);
    } catch (err) {}
  };

  useEffect(() => {
    userinfo();
    getComments();
  }, [page]);

  const editComment = async () => {
    try {
      const data = await courseCommentAPI.editComment(Id, {
        newComment: editcom,
        commentId: Id,
      });

      handleAlert('Comment Edited Successfully', 'success');
      setEditcomm(false);
      setOpen(false);
      getComments();
    } catch (err) {
      handleAlert('Could not edit comment', 'error');
    }
  };

  const deleteComment = async (i) => {
    try {
      const data = await courseCommentAPI.deleteComment(Id);
      comments.splice(i, 1);
      setTotalcomments((a) => a - 1);
      setComments([...comments]);
    } catch (err) {}
  };

  const giveLike = async (Id, isDisliked, i) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: 'LIKE',
        commentId: Id,
      });
      if (isDisliked) {
        comments[i].likes = comments[i].likes + 1;
        comments[i].dislikes = comments[i].dislikes - 1;
        comments[i].isDisLiked = null;
        comments[i].isLiked = { id: Id };
      } else {
        comments[i].likes = comments[i].likes + 1;
        comments[i].isLiked = { id: Id };
      }
      setComments([...comments]);
    } catch (err) {}
  };

  const giveDislike = async (Id, isLikes, i) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: 'DISLIKE',
        commentId: Id,
      });
      if (isLikes) {
        comments[i].dislikes = comments[i].dislikes + 1;
        comments[i].likes = comments[i].likes - 1;
        comments[i].isLiked = null;
        comments[i].isDisLiked = { id: Id };
      } else {
        comments[i].dislikes = comments[i].dislikes + 1;
        comments[i].isDisLiked = { id: Id };
      }
      setComments([...comments]);
    } catch (err) {}
  };

  const removeLike = async (Id, i) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: 'REMOVELIKE',
        commentId: Id,
      });
      comments[i].likes = comments[i].likes - 1;
      comments[i].isLiked = null;
      setComments([...comments]);
    } catch (err) {}
  };

  const removeDislike = async (Id, i) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: 'REMOVEDISLIKE',
        commentId: Id,
      });
      comments[i].dislikes = comments[i].dislikes - 1;
      comments[i].isDisLiked = null;
      setComments([...comments]);
    } catch (err) {}
  };

  const handleLike = (Id, isLikes, isDisliked, i) => {
    setLike(!like);
    setDislike(false);
    if (!isLikes) {
      giveLike(Id, isDisliked, i);
    } else {
      removeLike(Id, i);
    }
  };

  const handleDislike = (Id, isLikes, isDisliked, i) => {
    setDislike(!dislike);
    setLike(false);
    if (!isDisliked) {
      giveDislike(Id, isLikes, i);
    } else {
      removeDislike(Id, i);
    }
  };

  const getReply = async (Id) => {
    try {
      const data = await courseCommentAPI.getReply(id, page, Id);
      return data;
    } catch (err) {}
  };

  const giveReplyLikes = async (Id, isDisliked, i) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: 'LIKE',
        commentId: Id,
      });
      if (isDisliked) {
        reeply[i].likes = reeply[i].likes + 1;
        reeply[i].dislikes = reeply[i].dislikes - 1;
        reeply[i].isDisLiked = null;
        reeply[i].isLiked = { id: Id };
      } else {
        reeply[i].likes = reeply[i].likes + 1;
        reeply[i].isLiked = { id: Id };
      }
      setReeply([...reeply]);
    } catch (err) {}
  };

  const giveReplyDislikes = async (Id, isLiked, i) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: 'DISLIKE',
        commentId: Id,
      });
      if (isLiked) {
        reeply[i].dislikes = reeply[i].dislikes + 1;
        reeply[i].likes = reeply[i].likes - 1;
        reeply[i].isLiked = null;
        reeply[i].isDisLiked = { id: Id };
      } else {
        reeply[i].dislikes = reeply[i].dislikes + 1;
        reeply[i].isDisLiked = { id: Id };
      }
      setReeply([...reeply]);
    } catch (err) {}
  };

  const removeReplyLikes = async (Id, i) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: 'REMOVELIKE',
        commentId: Id,
      });
      reeply[i].likes = reeply[i].likes - 1;
      reeply[i].isLiked = null;
      setReeply([...reeply]);
    } catch (err) {}
  };

  const removeReplyDislikes = async (Id, i) => {
    try {
      const data = await courseCommentAPI.removeReplyDislikes(id, {
        action: 'REMOVEDISLIKE',
        commentId: Id,
      });
      reeply[i].dislikes = reeply[i].dislikes - 1;
      reeply[i].isDisLiked = null;
      setReeply([...reeply]);
    } catch (err) {}
  };

  const handleRlike = (Id, isLiked, isDisliked, ii) => {
    if (!isLiked) {
      giveReplyLikes(Id, isDisliked, ii);
    } else {
      removeReplyLikes(Id, ii);
    }
  };

  const handleRdislike = (Id, isLiked, isDisliked, ii) => {
    if (!isDisliked) {
      giveReplyDislikes(Id, isLiked, ii);
    } else {
      removeReplyDislikes(Id, ii);
    }
  };

  const report = async (UserReport) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: 'REPORT',
        commentId: reportid,
        reportDescription: UserReport,
      });
      handleAlert('report submitted', 'success');
    } catch (err) {}
  };

  const addReply = async (Id) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        reply: userreply,
        commentId: Id,
      });
      data[0].userData = currentuser;
      data[0].likes = 0;
      data[0].dislikes = 0;
      setTotalreplies(totalreplies + 1);
      reeply.unshift(data[0]);
      setReeply([...reeply]);
    } catch (err) {}
  };

  const handleReply = async (Id) => {
    setRid(Id);
    const data = await getReply(Id);
    setReeply(data.repliesData);
    setTotalreplies(parseInt(data.repliesCount));
  };

  // Seek to particular time
  const [isReady, setIsReady] = React.useState(false);
  const playerRef = React.useRef();
  const onReady = React.useCallback(() => {
    if (!isReady) {
      setIsReady(true);
      const playedDurationObj = JSON.parse(localStorage.getItem('playedDurationObj'));
      const timeToStrart = playedDurationObj[vidindex];
      playerRef.current.seekTo(timeToStrart, 'seconds');
    }
  }, [isReady]);

  // Decoding the User Name
  const decodeUsername = GetValidatedTokenData();
  const Username = decodeUsername.username;
  let pages = [
    {
      name: 'Enrolled Courses',
      path: `/org/${orgName}/dashboard`,
    },
  ];

  let organizationPages = [
    {
      name: 'Enrolled Courses',
      path: `/org/${orgName}/dashboard`,
    },
  ];

  const imagesObj = JSON.parse(localStorage.getItem('imagesObj'));
  let my_courses_course_videos_navbar_url =
    imagesObj && imagesObj[ASSET_CONFIGS.MY_COURSES_COURSE_VIDEOS_NAVBAR];

  return (
    <>
      {timer ? (
        <Box sx={{ display: 'flex', flexDirection: 'column' }} className="mainSkeletonContainer">
          <Skeletons type="navbar" />
        </Box>
      ) : (
        <div
          style={{
            position: 'sticky',
            top: '0',
            left: '0',
            width: '100%',
            zIndex: '11',
            backgroundColor: '#fff',
            zIndex: 1051,
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              padding: '1rem 1.2rem',
              display: {
                xs: 'none',
                sm: 'flex',
                md: 'flex',
                lg: 'flex',
                xl: 'flex',
              },
            }}
          >
            <Grid
              item
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '18px',
                  lineHeight: '18px',
                  marginRight: '2rem',
                }}
                onClick={(event) => {
                  navigate('/organization');
                }}
              >
                <img src={my_courses_course_videos_navbar_url} alt="" />
              </Typography>
            </Grid>

            <Grid
              item
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex',
                  md: 'flex',
                  lg: 'flex',
                  xl: 'flex',
                },
                alignItems: 'center',
              }}
            >
              {coursePercentage !== undefined && !isOwner && isCertificateRequired && (
                <>
                  <LinearProgressWithLabelReusable progressCount={coursePercentage} />
                  <GetCertificate courseTitle={courseTitle} coursePercentage={coursePercentage} />
                </>
              )}
              {/* <Grid
                item
                sx={{
                  alignItems: 'center',
                }}
              >
                {domainData === null
                  ? pages.map((page) => (
                      <Button
                        variant="outlined"
                        style={styles}
                        onClick={(event) => {
                          navigate(page.path);
                        }}
                      >
                        {page.name}
                      </Button>
                    ))
                  : organizationPages.map((page) => (
                      <Button
                        variant="outlined"
                        style={styles}
                        onClick={(event) => {
                          navigate(page.path);
                        }}
                      >
                        {page.name}
                      </Button>
                    ))}
              </Grid> */}
              <Avatar
                sx={{
                  bgcolor: '#bdbdbd',
                  ontSize: { uxl: '20px' },
                  marginLeft: '2rem',
                  cursor: 'pointer',
                  borderRadius: '10%',
                }}
                onClick={() => {
                  navigate('/user-profile');
                }}
                variant="square"
              >
                {Username.charAt(0)}
              </Avatar>
            </Grid>
          </Grid>
        </div>
      )}

      <Grid container sx={{ p: 2, pt: 0, pr: 2 }}>
        {/* width={!fullscreen ? "100%" : '100%'}  */}
        <Grid
          item
          xs={12}
          mds={!fullscreen ? 12 : 9}
          sx={{ paddingTop: '0px!important', bgcolor: '#fff' }}
          // width={!fullscreen ? "100%" : "75%"}
          width="100%"
        >
          {/* <Box width={!fullscreen ? "100%" : '75%'}> */}
          {openLoader ? (
            <Skeletons type={'videoPlayer'} />
          ) : (
            <>
              {url ? (
                <Box
                  className="player-wrapper"
                  // height="fit-content"
                  height="500px"
                  sx={{ position: 'relative' }}
                  onMouseEnter={MouseEntered}
                  onMouseLeave={MouseLeave}
                >
                  <ReactPlayer
                    url={url}
                    controls
                    className="react-player"
                    width="100%"
                    height="100%"
                    playing={playing}
                    onPlay={() => {
                      setStates({
                        ...states,
                        playing: true,
                      });
                    }}
                    onPause={() => {
                      setStates({
                        ...states,
                        playing: false,
                      });
                      userprogress();
                    }}
                    onPlaybackRateChange={handlePlayback}
                    onDuration={handleDuration}
                    onEnded={handleEnd}
                    onProgress={handleProgress}
                    ref={playerRef}
                    onReady={onReady}
                    config={{
                      file: {
                        attributes: {
                          controlsList: 'nodownload',
                          disablePictureInPicture: 'true',
                        },
                      },
                    }}
                  />
                  {/* hover && */}
                  {/* <Box
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "25px",
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "98%",
                    }}
                  >
                    {!fullscreen && (
                      <Fab
                        color="primary"
                        sx={{ width: "44px", height: "44px" }}
                        onClick={() => {
                          setFullscreen(true);
                        }}
                      >
                        <Tooltip title="Open Section">
                          <KeyboardDoubleArrowLeftIcon />
                        </Tooltip>
                      </Fab>
                    )}
                  </Box> */}
                </Box>
              ) : (
                <Box
                  sx={{
                    height: {
                      xs: '300px',
                      md: '500px',
                    },
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: 'center',
                      fontWeight: '500',
                      color: 'white',
                    }}
                  >
                    No Video Available {<br />} : \
                  </Typography>
                </Box>
              )}
            </>
          )}
          {/* </Box > */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mt: 2,
              width: !fullscreen ? '100%' : '100%',
            }}
          >
            <Box>
              <Typography
                variant="h6"
                color="#292929"
                sx={{
                  fontSize: { sm: '10px', lg: '15px' },
                  fontWeight: '400',
                  display: '-webkit-box!important',
                  WebkitLineClamp: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: ' vertical',
                  mb: 2,
                }}
              >
                {coursedata[secindex]?.videosData[vidindex]?.videoTitle}
              </Typography>
            </Box>
            <Grid
              item
              xs={12}
              mds={3}
              sx={{
                backgroundColor: '#efefef',
                display: { xs: 'block', md: 'none' },
                marginBottom: '10px',
              }}
            >
              <div className="sectionsSticky">
                <Getcourses
                  coursedata={coursedata}
                  coursePercentage={coursePercentage}
                  userdata={userdata}
                  states={states}
                  setStates={setStates}
                  setUrl={setUrl}
                  setSecindex={setSecindex}
                  setVidindex={setVidindex}
                  userprogress={userprogress}
                  userprogresss={userprogresss}
                  secindex={secindex}
                  setUserprogresss={setUserprogresss}
                  vid={vid}
                  setVid={setVid}
                  fullscreen={fullscreen}
                  setFullscreen={setFullscreen}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              display={'flex'}
              justifyContent={'space-between'}
              sx={matches ? { flexDirection: 'column', gap: '12px' } : { flexDirection: 'row' }}
            >
              <Grid
                item
                xs={5}
                p={0}
                m={0}
                alignItems={'center'}
                display={'flex'}
                justifyContent={'flex-start'}
                gap={'12px'}
              >
                <Avatar
                  sx={{
                    borderRadius: '50%',
                    textTransform: 'uppercase',
                    height: { xs: '34px', sm: '36px', lg: '38px' },
                    width: { xs: '34px', sm: '36px', lg: '38px' },
                  }}
                  alt={authordata?.username}
                  src={authordata?.profilePhotoLink}
                >
                  {authordata?.username?.charAt(0)}
                </Avatar>
                <Box mr={5}>
                  <Typography
                    sx={{
                      lineHeight: { xs: '18px', mds: '22px' },
                      fontWeight: '500',
                      marginBottom: '-2px',
                      fontSize: { xs: '14px', md: '16px' },
                      display: '-webkit-box!important',
                      WebkitLineClamp: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitBoxOrient: ' vertical',
                    }}
                    variant="subtitle1"
                    color="#292929"
                  >
                    {authordata.firstName} {authordata.lastName}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: '-webkit-box!important',
                      WebkitLineClamp: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitBoxOrient: ' vertical',
                    }}
                    fontWeight="400"
                    color="#505050"
                  >
                    {authordata?.username}
                  </Typography>
                </Box>
                {/* <tab/> */}
              </Grid>
              <Stack direction="row" alignItems="center" spacing={2}>
                {isOwner && (
                  <Button
                    onClick={() => navigate(`/org/${orgName}/course/update/${id}`)}
                    variant="contained"
                    width="2rem"
                    sx={{
                      fontFamily: 'Poppins',
                      fontSize: '15px',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      lineHeight: 'normal',
                    }}
                  >
                    Edit
                  </Button>
                )}
                <CourseStatusUpdate
                  status={status}
                  setStatus={setStatus}
                  courseStage={courseStage}
                  setCourseStage={setCourseStage}
                  courseId={courseId}
                />
              </Stack>

              {/* { !organization && !isOwner && (
                <Grid
                  xs={7}
                  display={"flex"}
                  gap={"1rem"}
                  sx={
                    !matches
                      ? {
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                          mr: 2,
                        }
                      : {
                          alignItems: "flex-start",
                          justifyContent: "flex-end",
                          mt: 1,
                          mr: 1,
                        }
                  }
                >
                  <ADD/>
                  <BUY/>
                </Grid>
              )} */}
              {coursePercentage !== undefined && !isOwner && isCertificateRequired && (
                <Box
                  xs={7}
                  sx={{
                    alignItems: 'end',
                    display: {
                      xs: 'flex',
                      sm: 'none',
                      md: 'none',
                      lg: 'none',
                    },
                  }}
                >
                  <GetCertificate
                    courseTitle={courseTitle}
                    coursePercentage={coursePercentage}
                    sx={{
                      marginLeft: '0rem',
                      fontSize: { xs: '11px', sm: '12px', md: '13px' },
                      textTransform: { xs: 'capitalize', sm: 'uppercase' },
                    }}
                  />
                </Box>
              )}
            </Grid>
            <Stack mb={2} direction="column">
              <Typography variant="body2" sx={{}} color="#787878">
                {coursedata[secindex]?.videosData[vidindex]?.videoDescription}
              </Typography>
            </Stack>

            {!organization && !isOwner && courseStage !== 'ENROLLED' && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1px',
                  p: { xs: 1, sm: 2 },
                  border: ' 1px solid rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: '20px', sm: '20px', lg: '25px' },
                    color: '#292929',
                    fontWeight: 'bold',
                    mb: 2,
                  }}
                >
                  Description
                </Typography>
                <Typography sx={{ color: '#646464', fontWeight: '400' }}>
                  {userdata?.description}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1px',
                    marginBottom: '0.5rem',
                  }}
                >
                  <List
                    sx={{
                      listStyleType: 'disc',
                      paddingLeft: '1rem',
                      color: '#646464',
                      textTransform: 'uppercase',
                      paddingRight: '0',
                    }}
                  >
                    {userdata.descriptionPoints
                      ?.slice(0, more ? userdata.descriptionPoints.length : 4)
                      .map((values, i) => (
                        <ListItem
                          sx={{
                            display: 'list-item',
                            gap: '1px',
                            padding: '0rem',
                          }}
                        >
                          <ListItemText
                            primaryTypographyProps={{
                              fontSize: '14px',
                              fontWeight: '400',
                            }}
                          >
                            {values}
                          </ListItemText>
                        </ListItem>
                      ))}
                  </List>
                </Box>

                {userdata.descriptionPoints?.length > 4 && (
                  <Box>
                    <Button
                      variant="text"
                      onClick={() => {
                        setMore(!more);
                      }}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {more ? 'Readless...' : 'Readmore...'}
                    </Button>
                  </Box>
                )}
                <Reviews
                  ratings={parseInt(Math.round((userdata?.rating?.rating ?? 0) * 10) / 10)}
                  getdata={getdata}
                />
              </Box>
            )}
            {(organization || isOwner || courseStage === 'ENROLLED') && (
              <>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      variant="scrollable"
                      allowScrollButtonsMobile
                      sx={{ width: '100%' }}
                    >
                      <Tab label="Comments" />
                      <Tab label="About Course" />
                      <Tab label="Resources" />
                      <Tab label="Reviews" />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <Grid item xs={12}>
                      <Stack direction="row" alignItems={'center'}>
                        <Typography variant="body2">{`${totalcomments} Comments`}</Typography>
                        {/* <Stack direction="row" sx={{ position: 'relative' }} alignItems={'center'}>
                          <IconButton
                            ref={anchorRefMenu}
                            id="composition-button"
                            aria-controls={openMenu ? 'composition-menu' : undefined}
                            aria-expanded={openMenu ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                          >
                            <SortIcon
                              onClick={handleSort}
                              sx={{ cursor: 'pointer', fontSize: '20px' }}
                            />
                          </IconButton>
                          <Typography variant="body2">Sort by</Typography>
                          <Popper
                            open={openMenu}
                            anchorEl={anchorRefMenu.current}
                            role={undefined}
                            placement="bottom-start"
                            transition
                            disablePortal
                            sx={{ zIndex: '2' }}
                          >
                            {({ TransitionProps, placement }) => (
                              <Grow
                                {...TransitionProps}
                                style={{
                                  transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                              >
                                <Paper>
                                  <ClickAwayListener onClickAway={handleCloseClick}>
                                    <MenuList
                                      autoFocusItem={openMenu}
                                      id="composition-menu"
                                      aria-labelledby="composition-button"
                                      onKeyDown={handleListKeyDown}
                                    >
                                      <MenuItem onClick={handleCloseClick}>Top Comments</MenuItem>
                                      <MenuItem onClick={handleCloseClick}>Newest first</MenuItem>
                                    </MenuList>
                                  </ClickAwayListener>
                                </Paper>
                              </Grow>
                            )}
                          </Popper>
                        </Stack> */}
                      </Stack>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: 'flex',
                          gap: { xs: '8px', md: '1rem' },
                          alignItems: 'center',
                          pt: { xs: 1 },
                        }}
                      >
                        <Avatar
                          sx={{
                            width: { xs: 32, md: 42 },
                            height: { xs: 32, md: 42 },
                            alignItems: 'center',
                          }}
                          alt={currentuser?.username}
                          src={currentuser?.profilePhotoLink}
                        >
                          {currentuser?.username.charAt(0)}
                        </Avatar>
                        <TextField
                          label="Type Your Comment here......"
                          fullWidth
                          value={usercommments}
                          onChange={(e) => {
                            setUsercommments(e.target.value);
                          }}
                          size="small"
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            fontSize: { xs: '11px', sm: '12px', mds: '13px' },
                            p: { xs: '2px', md: '4px 16px' },
                            textTransform: {
                              xs: 'capitalize',
                              sm: 'uppercase',
                            },
                          }}
                          onClick={() => {
                            setUsercommments('');
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            fontSize: { xs: '11px', sm: '12px', mds: '13px' },
                            p: { xs: '2px', md: '4px 16px' },
                            textTransform: {
                              xs: 'capitalize',
                              sm: 'uppercase',
                            },
                          }}
                          onClick={() => {
                            addComment();
                            setUsercommments('');
                          }}
                          disabled={!usercommments}
                        >
                          Comment
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        mt: '16px',
                      }}
                    >
                      {comments?.map((values, i) => (
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                          <Avatar
                            sx={{
                              width: { xs: 32, md: 42 },
                              height: { xs: 32, md: 42 },
                              alignItems: 'center',
                              fontSize: { xs: '16px', md: '20px' },
                              textTransform: 'uppercase',
                            }}
                            alt={values.userData?.username}
                            src={values.userData?.profilePhotoLink}
                          >
                            {values.userData?.username.charAt(0)}
                          </Avatar>
                          <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                alignItems: 'center',
                              }}
                            >
                              <Stack direction="row" spacing={0.5}>
                                <Typography
                                  sx={{
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    color: '#292929',
                                  }}
                                >
                                  {values.userData?.firstName} {values.userData?.lastName}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    color: '#A0A0A0',
                                  }}
                                >
                                  {moment(values.created_at).fromNow()}
                                </Typography>
                              </Stack>
                              {/* {currentuser.userId === values.userId && ( */}
                              <Box sx={{ position: 'relative' }}>
                                <MoreVertIcon
                                  sx={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    handleDot(values.id, i);
                                  }}
                                />
                                {dot && values.id === Id && (
                                  <Paper
                                    elevation={1}
                                    select
                                    sx={{
                                      width: '130px',
                                      padding: '8px 0px 8px 0px',
                                      alignItems: 'center',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      position: 'absolute',
                                      right: '1rem',
                                      textAlign: 'left',
                                    }}
                                  >
                                    {currentuser.userId === values.userId ? (
                                      <>
                                        <MenuItem
                                          sx={{
                                            width: '130px',
                                            display: 'flex',
                                            gap: '10px',
                                            fontSize: '14px',
                                          }}
                                          onClick={() => {
                                            setEditcomm(true);
                                            setOpen(true);
                                            setDot(false);
                                            setEditcom(values.comment);
                                          }}
                                        >
                                          <EditOutlinedIcon /> Edit
                                        </MenuItem>
                                        <MenuItem
                                          sx={{
                                            width: '130px',
                                            display: 'flex',
                                            gap: '10px',
                                            fontSize: '14px',
                                          }}
                                          onClick={() => {
                                            deleteComment(i);
                                            setDot(false);
                                          }}
                                        >
                                          <DeleteOutlinedIcon /> Delete
                                        </MenuItem>
                                      </>
                                    ) : (
                                      <>
                                        <MenuItem
                                          sx={{
                                            width: '130px',
                                            display: 'flex',
                                            gap: '10px',
                                            fontSize: '14px',
                                          }}
                                          onClick={() => {
                                            setOpen(true);
                                            setReportid(values.id);
                                            handleReportDescOpen();
                                          }}
                                        >
                                          <OutlinedFlagIcon />
                                          report
                                        </MenuItem>
                                      </>
                                    )}
                                  </Paper>
                                )}
                              </Box>
                              {/* )} */}
                            </Box>
                            {editcomm && (
                              <Dialog fullWidth open={open}>
                                <DialogTitle
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    border: '1px solid #F0EFF2',
                                  }}
                                >
                                  Edit Your comment
                                  <Box>
                                    <ClearIcon
                                      onClick={() => {
                                        setEditcomm(false);
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
                                      label="Update your comment here..."
                                      rows={10}
                                      value={editcom}
                                      onChange={(e) => {
                                        setEditcom(e.target.value);
                                      }}
                                    ></TextField>
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions sx={{ padding: '10px 20px' }}>
                                  <Button
                                    variant="contained"
                                    sx={{
                                      textTransform: 'capitalize',
                                      width: '100%',
                                    }}
                                    onClick={() => {
                                      editComment();
                                    }}
                                  >
                                    Done
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            )}
                            <Typography sx={{ color: '#505050', fontSize: '14px' }}>
                              {values.comment}
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={2}
                              textAlign={'center'}
                              alignItems={'center'}
                            >
                              <Box
                                onClick={() => {
                                  handleLike(values.id, values.isLiked, values.isDisLiked, i);
                                }}
                                sx={{ cursor: 'pointer' }}
                              >
                                {values.isLiked ? (
                                  <ThumbUpAltIcon
                                    color="primary"
                                    sx={{
                                      fontSize: { xs: '16px', md: '18px' },
                                    }}
                                  />
                                ) : (
                                  <ThumbUpOutlinedIcon
                                    color="#717478"
                                    sx={{
                                      fontSize: { xs: '16px', md: '18px' },
                                    }}
                                  />
                                )}
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: '13px',
                                  fontWeight: '400',
                                  color: '#A0A0A0',
                                }}
                              >
                                {values.likes}
                              </Typography>
                              <Box
                                onClick={() => {
                                  handleDislike(values.id, values.isLiked, values.isDisLiked, i);
                                }}
                                sx={{ cursor: 'pointer' }}
                              >
                                {values.isDisLiked ? (
                                  <ThumbDownIcon
                                    color="primary"
                                    sx={{
                                      fontSize: { xs: '16px', md: '18px' },
                                    }}
                                  />
                                ) : (
                                  <ThumbDownOffAltRoundedIcon
                                    color="#717478"
                                    sx={{
                                      fontSize: { xs: '16px', md: '18px' },
                                    }}
                                  />
                                )}
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: '13px',
                                  fontWeight: '400',
                                  color: '#A0A0A0',
                                }}
                              >
                                {values.dislikes}
                              </Typography>
                              <Button
                                variant="text"
                                sx={{ textTransform: 'capitalize' }}
                                size="small"
                                onClick={() => {
                                  setOpenreply(!openreply);
                                  setCommments(false);
                                  handleReply(values.id);
                                }}
                              >
                                Reply
                              </Button>
                            </Stack>
                            {openreply && values.id === rid && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  width: '100%',
                                  gap: '10px',
                                }}
                              >
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{
                                    alignItems: 'baseline',
                                    width: '100%',
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      width: { xs: 24, md: 32 },
                                      height: { xs: 24, md: 32 },
                                      alignItems: 'center',
                                      fontSize: { xs: '14px', md: '16px' },
                                      textTransform: 'uppercase',
                                      mt: '0px',
                                    }}
                                    alt={currentuser?.username}
                                    src={currentuser?.profilePhotoLink}
                                  >
                                    {currentuser?.username.charAt(0)}
                                  </Avatar>
                                  <TextField
                                    fullWidth
                                    label="Type your reply..."
                                    variant="standard"
                                    size="small"
                                    value={userreply}
                                    onChange={(e) => {
                                      setUserreply(e.target.value);
                                    }}
                                  />
                                </Stack>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{
                                    justifyContent: 'flex-end',
                                    alignItems: 'end',
                                  }}
                                >
                                  <Button
                                    variant="text"
                                    size="small"
                                    sx={{
                                      fontSize: {
                                        xs: '11px',
                                        sm: '12px',
                                        mds: '13px',
                                      },
                                      p: { xs: '2px', md: '4px 16px' },
                                      height: '32px',
                                      textTransform: {
                                        xs: 'capitalize',
                                        md: 'uppercase',
                                      },
                                    }}
                                    onClick={() => {
                                      setUserreply('');
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      fontSize: {
                                        xs: '11px',
                                        sm: '12px',
                                        mds: '13px',
                                      },
                                      p: { xs: '2px', md: '4px 16px' },
                                      height: '32px',
                                      textTransform: {
                                        xs: 'capitalize',
                                        md: 'uppercase',
                                      },
                                    }}
                                    onClick={() => {
                                      addReply(values.id);
                                      setUserreply('');
                                      setCommments(true);
                                    }}
                                  >
                                    Comment
                                  </Button>
                                </Stack>
                              </Box>
                            )}
                            {openreply && values.id === rid && (
                              <Box sx={{ display: 'flex' }}>
                                <ExpandMoreIcon
                                  color="primary"
                                  onClick={() => {
                                    setCommments(!commments);
                                  }}
                                  sx={{ cursor: 'pointer' }}
                                />
                                <Typography color="primary">{totalreplies}</Typography>
                              </Box>
                            )}
                            {commments && values.id === rid && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '10px',
                                }}
                              >
                                {reeply?.map((valuess, ii) => (
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      gap: { xs: '12px', md: '1rem' },
                                    }}
                                  >
                                    <Avatar
                                      sx={{
                                        width: { xs: 24, md: 32 },
                                        height: { xs: 24, md: 32 },
                                        alignItems: 'center',
                                        fontSize: { xs: '14px', md: '16px' },
                                        textTransform: 'uppercase',
                                      }}
                                      alt={valuess.userData?.username}
                                      src={valuess.userData?.profilePhotoLink}
                                    >
                                      {valuess.userData?.username.charAt(0)}
                                    </Avatar>
                                    <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          gap: '12px',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <Box
                                          spacing={0.5}
                                          sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: '8px',
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              fontSize: '13px',
                                              fontWeight: '500',
                                              color: '#292929',
                                              display: '-webkit-box!important',
                                              WebkitLineClamp: 1,
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis',
                                              WebkitBoxOrient: ' vertical',
                                            }}
                                          >
                                            {valuess.userData?.firstName}
                                            {valuess.userData?.lastName}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              fontSize: '12px',
                                              fontWeight: '400',
                                              color: '#A0A0A0',
                                              display: '-webkit-box!important',
                                              WebkitLineClamp: 1,
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis',
                                              WebkitBoxOrient: ' vertical',
                                            }}
                                          >
                                            {moment(valuess.created_at).fromNow()}
                                          </Typography>
                                        </Box>
                                        <Box sx={{ position: 'relative' }}>
                                          <MoreVertIcon
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => {
                                              handleDot(valuess.id);
                                            }}
                                          />
                                          {dot && valuess.id === Id && (
                                            <Paper
                                              elevation={1}
                                              select
                                              sx={{
                                                width: '130px',
                                                padding: '5px 0px 5px 0px',
                                                alignItems: 'center',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                position: 'absolute',
                                                right: '1rem',
                                                textAlign: 'left',
                                              }}
                                            >
                                              {currentuser.userId === valuess.userId ? (
                                                <>
                                                  <MenuItem
                                                    sx={{
                                                      width: '130px',
                                                      display: 'flex',
                                                      gap: '10px',
                                                      fontSize: '14px',
                                                    }}
                                                    onClick={() => {
                                                      setEditcomm(true);
                                                      setOpen(true);
                                                      setDot(false);
                                                      setEditcom(values.comment);
                                                    }}
                                                  >
                                                    <EditOutlinedIcon /> Edit
                                                  </MenuItem>
                                                  <MenuItem
                                                    sx={{
                                                      width: '130px',
                                                      display: 'flex',
                                                      gap: '10px',
                                                      fontSize: '14px',
                                                    }}
                                                    onClick={() => {
                                                      deleteComment(i);
                                                      setDot(false);
                                                    }}
                                                  >
                                                    <DeleteOutlinedIcon /> Delete
                                                  </MenuItem>
                                                </>
                                              ) : (
                                                <>
                                                  <MenuItem
                                                    sx={{
                                                      width: '130px',
                                                      display: 'flex',
                                                      gap: '10px',
                                                      fontSize: '14px',
                                                    }}
                                                    onClick={() => {
                                                      setOpen(true);
                                                      setReportid(valuess.id);
                                                      handleReportDescOpen();
                                                    }}
                                                  >
                                                    <OutlinedFlagIcon />
                                                    report
                                                  </MenuItem>
                                                </>
                                              )}
                                              {/* <MenuItem
                                                sx={{
                                                  width: '130px',
                                                  display: 'flex',
                                                  justifyContent: 'space-around',
                                                  fontSize: '14px',
                                                }}
                                                onClick={() => {
                                                  report();
                                                  setOpen(true);
                                                  setReportid(valuess.id);
                                                }}
                                              >
                                                <OutlinedFlagIcon />
                                                report
                                              </MenuItem> */}
                                            </Paper>
                                          )}
                                        </Box>
                                      </Box>
                                      <Typography
                                        sx={{
                                          color: '#111112',
                                          fontSize: {
                                            xs: '14px',
                                            md: '16px',
                                            margin: '0px!important',
                                          },
                                        }}
                                      >
                                        {valuess.comment}
                                      </Typography>
                                      <Stack direction="row" spacing={2}>
                                        <Box
                                          onClick={() => {
                                            handleRlike(
                                              valuess.id,
                                              valuess.isLiked,
                                              valuess.isDisLiked,
                                              ii
                                            );
                                          }}
                                          sx={{ cursor: 'pointer' }}
                                        >
                                          {valuess.isLiked ? (
                                            <ThumbUpAltIcon
                                              color="primary"
                                              sx={{
                                                fontSize: {
                                                  xs: '16px',
                                                  md: '18px',
                                                },
                                              }}
                                            />
                                          ) : (
                                            <ThumbUpOutlinedIcon
                                              color="#717478"
                                              sx={{
                                                fontSize: {
                                                  xs: '16px',
                                                  md: '18px',
                                                },
                                              }}
                                            />
                                          )}
                                        </Box>
                                        <Typography
                                          sx={{
                                            fontSize: '13px',
                                            fontWeight: '400',
                                            color: '#A0A0A0',
                                          }}
                                        >
                                          {valuess.likes}
                                        </Typography>
                                        <Box
                                          onClick={() => {
                                            handleRdislike(
                                              valuess.id,
                                              valuess.isLiked,
                                              valuess.isDisLiked,
                                              ii
                                            );
                                          }}
                                          sx={{ cursor: 'pointer' }}
                                        >
                                          {valuess.isDisLiked ? (
                                            <ThumbDownIcon
                                              color="primary"
                                              sx={{
                                                fontSize: {
                                                  xs: '16px',
                                                  md: '18px',
                                                },
                                              }}
                                            />
                                          ) : (
                                            <ThumbDownOffAltRoundedIcon
                                              color="#717478"
                                              sx={{
                                                fontSize: {
                                                  xs: '16px',
                                                  md: '18px',
                                                },
                                              }}
                                            />
                                          )}
                                        </Box>
                                        <Typography
                                          sx={{
                                            fontSize: '13px',
                                            fontWeight: '400',
                                            color: '#A0A0A0',
                                          }}
                                        >
                                          {valuess.dislikes}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            color: '#292929',
                                            cursor: 'pointer',
                                          }}
                                          onClick={() => {}}
                                        >
                                          Reply
                                        </Typography>
                                      </Stack>
                                    </Stack>
                                  </Box>
                                ))}
                              </Box>
                            )}
                          </Stack>
                        </Box>
                      ))}
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Pagination
                        page={page}
                        onChange={(event, page) => {
                          setPage(page);
                        }}
                        count={Math.ceil(parseInt(totalcomments) / 10)}
                        variant="outlined"
                        shape="rounded"
                      />
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '.2rem',
                          textAlign: 'justify',
                        }}
                      >
                        <Typography variant="h6" sx={{ color: '#292929', fontWeight: 'bold' }}>
                          Description
                        </Typography>
                        <Typography sx={{ color: '#646464', fontWeight: '400' }}>
                          {userdata?.description}
                        </Typography>
                        <List
                          sx={{
                            listStyleType: 'disc',
                            color: '#646464',
                            textTransform: 'uppercase',
                            marginLeft: '1em',
                          }}
                        >
                          {userdata?.descriptionPoints?.map((value, id) => (
                            <ListItem
                              key={id}
                              sx={{
                                display: 'list-item',
                                textAlign: 'justify',
                                padding: 0,
                              }}
                            >
                              <ListItemText
                                primaryTypographyProps={{
                                  fontSize: '14px',
                                  fontWeight: '400',
                                }}
                              >
                                {value}
                              </ListItemText>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#292929', fontWeight: 'bold' }}>
                        Resources
                      </Typography>
                      <Grid mb={1} container spacing={2}>
                        <Grid item sx={{ textAlign: { xs: 'center', sm: 'start' } }} xs={4} sm={6}>
                          <Typography
                            variant="caption"
                            pl={{ xs: 0, sm: 4 }}
                            sx={{ color: '#3D3D3D', flexBasis: '10%' }}
                          >
                            Name
                          </Typography>
                        </Grid>
                        <Grid item sx={{ textAlign: 'center' }} xs={2} sm={2}>
                          <Typography variant="caption" sx={{ color: '#3D3D3D', flexBasis: '10%' }}>
                            Size
                          </Typography>
                        </Grid>
                        <Grid item sx={{ textAlign: 'center' }} xs={3} sm={2}>
                          <Typography variant="caption" sx={{ color: '#3D3D3D' }}>
                            Uploaded at
                          </Typography>
                        </Grid>
                        <Grid item sx={{ textAlign: 'center' }} xs={3} sm={2}>
                          <Typography variant="caption" sx={{ color: '#3D3D3D' }}>
                            File
                          </Typography>
                        </Grid>
                      </Grid>

                      <Box>
                        <hr />
                        {coursedata[secindex]?.videosData[vidindex]?.extraFiles.map(
                          (values, index) => (
                            <Grid container py={1} spacing={2}>
                              <Grid item xs={4} sm={6}>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    gap: '5px',
                                    alignItems: 'center',
                                    overFlow: 'hidden',
                                    textOverflow: 'elipsis',
                                  }}
                                >
                                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    <img
                                      src={File}
                                      style={{ width: '30px', height: '30px' }}
                                      alt="icon"
                                    />
                                  </Box>
                                  <Stack
                                    direction="column"
                                    sx={{
                                      overFlow: 'hidden',
                                      textOverflow: 'elipsis',
                                      width: { xs: '100%', sm: 'auto' },
                                    }}
                                  >
                                    <Typography noWrap sx={{ color: '#3D3D3D' }}>
                                      {values.fileName}
                                    </Typography>
                                  </Stack>
                                </Box>
                              </Grid>
                              <Grid item sx={{ textAlign: 'center' }} xs={2} sm={2}>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: '#8C8C8C',
                                  }}
                                >
                                  {Math.round(values.fileSize / 100000)}KB
                                </Typography>
                              </Grid>
                              <Grid item sx={{ textAlign: 'center' }} xs={3} sm={2}>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: '#8C8C8C',
                                  }}
                                >
                                  {values.created_at.slice(0, -14)}
                                </Typography>
                              </Grid>
                              <Grid item sx={{ textAlign: 'center' }} xs={3} sm={2}>
                                <Button variant="outlined" size="">
                                  <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={values.fileUrl}
                                    style={{
                                      fontSize: '12px',
                                      fontWeight: 'bold',
                                      color: '#698AFF',
                                      textTransform: 'capitalize',
                                      textDecoration: 'none',
                                    }}
                                  >
                                    Preview
                                  </a>
                                </Button>
                              </Grid>
                            </Grid>
                          )
                        )}
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    {status === 'APPROVED' && (
                      <Reviews
                        courseStage={courseStage}
                        ratings={parseInt(Math.round((userdata?.rating?.rating ?? 0) * 10) / 10)}
                        getdata={getdata}
                      />
                    )}
                  </TabPanel>
                </Box>
                <Box sx={{ marginBottom: '4rem' }}></Box>
              </>
            )}
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          mds={3}
          sx={{
            display: { md: 'block', xs: 'none' },
            paddingLeft: '16px',
          }}
        >
          <div className="sectionsSticky">
            <Getcourses
              coursedata={coursedata}
              coursePercentage={coursePercentage}
              userdata={userdata}
              states={states}
              setStates={setStates}
              setUrl={setUrl}
              setSecindex={setSecindex}
              setVidindex={setVidindex}
              userprogress={userprogress}
              userprogresss={userprogresss}
              secindex={secindex}
              setUserprogresss={setUserprogresss}
              vid={vid}
              setVid={setVid}
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
            />
          </div>
        </Grid>
      </Grid>
      <Popup
        handleClose={handleReportDescClose}
        open={openReportDescPopup}
        heading={'Enter Your Reason for Reporting'}
        tesxtFieldLabel={'Report Description'}
        onClickFunction={handleReportSubmit}
        setTextFiledValue={setUserReport}
      />
    </>
  );
};

export default Coursevideo;
