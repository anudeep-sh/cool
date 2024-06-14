import React, { useState } from 'react';
import {
  Stack,
  Box,
  Typography,
  Paper,
  ButtonGroup,
  Button,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fab,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import SortIcon from '@mui/icons-material/Sort';

const Discussion = () => {
  const [sort, setSort] = useState(false);
  const [dot, setDot] = useState(false);
  const [id, setId] = useState(null);
  const [rid, setRid] = useState(null);
  const [lid, setLid] = useState(null);
  const [did, setDid] = useState(null);
  const [rlid, setRlid] = useState(null);
  const [rdid, setRdid] = useState(null);
  const [vid, setVid] = useState(null);
  const [secid, setSecid] = useState(null);
  const [commments, setCommments] = useState(false);
  const [reeply, setReeply] = useState(null);
  const [com, setCom] = useState(true);
  const [course, setCourse] = useState(false);
  const [reso, setReso] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(true);
  const [togglemenu, setTogglemenu] = useState(false);
  const [url, setUrl] = useState('vid2.mp4');
  const [hover, setHover] = useState(false);
  const [reshover, setReshover] = useState(true);

  const comments = [
    {
      id: 1,
      name: 'Max jack',
      time: '2 months ago',
      com: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non justo sed ligula volutpat scelerisque. Nunc vestibulum ante ac sem gravida gravida. Etiam non gravida nulla.',
      likes: '15k',
      replies: [
        {
          id: 11,
          name1: 'Professor sergio',
          time1: '1 month ago',
          com1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non justo sed ligula volutpat scelerisque. Nunc vestibulum ante ac sem gravida gravida. Etiam non gravida nulla.',
          likes1: '15k',
        },
        {
          id: 12,
          name1: 'Professor sergio',
          time1: '1 month ago',
          com1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non justo sed ligula volutpat scelerisque. Nunc vestibulum ante ac sem gravida gravida. Etiam non gravida nulla.',
          likes1: '15k',
        },
        {
          id: 13,
          name1: 'Professor sergio',
          time1: '1 month ago',
          com1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non justo sed ligula volutpat scelerisque. Nunc vestibulum ante ac sem gravida gravida. Etiam non gravida nulla.',
          likes1: '15k',
        },
      ],
    },
    {
      id: 2,
      name: 'tokyo',
      time: '2 months ago',
      com: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non justo sed ligula volutpat scelerisque. Nunc vestibulum ante ac sem gravida gravida. Etiam non gravida nulla.',
      likes: '15k',
      replies: [
        {
          id: 21,
          name1: 'Professor sergio',
          time1: '1 month ago',
          com1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non justo sed ligula volutpat scelerisque. Nunc vestibulum ante ac sem gravida gravida. Etiam non gravida nulla.',
          likes1: '15k',
        },
        {
          id: 22,
          name1: 'Professor sergio',
          time1: '1 month ago',
          com1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non justo sed ligula volutpat scelerisque. Nunc vestibulum ante ac sem gravida gravida. Etiam non gravida nulla.',
          likes1: '15k',
        },
        {
          id: 23,
          name1: 'Professor sergio',
          time1: '1 month ago',
          com1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non justo sed ligula volutpat scelerisque. Nunc vestibulum ante ac sem gravida gravida. Etiam non gravida nulla.',
          likes1: '15k',
        },
      ],
    },
    {
      id: 3,
      name: 'Pedro Alonso',
      time: '2 months ago',
      com: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non justo sed ligula volutpat scelerisque. Nunc vestibulum ante ac sem gravida gravida. Etiam non gravida nulla.',
      likes: '15k',
      replies: [
        {
          id: 31,
          name1: 'Professor sergio',
          time1: '1 month ago',
          com1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non justo sed ligula volutpat scelerisque. Nunc vestibulum ante ac sem gravida gravida. Etiam non gravida nulla.',
          likes1: '15k',
        },
        {
          id: 32,
          name1: 'Professor sergio',
          time1: '1 month ago',
          com1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non justo sed ligula volutpat scelerisque. Nunc vestibulum ante ac sem gravida gravida. Etiam non gravida nulla.',
          likes1: '15k',
        },
        {
          id: 33,
          name1: 'Professor sergio',
          time1: '1 month ago',
          com1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non justo sed ligula volutpat scelerisque. Nunc vestibulum ante ac sem gravida gravida. Etiam non gravida nulla.',
          likes1: '15k',
        },
      ],
    },
  ];

  const handleCom = () => {
    setCom(!com);
    setCourse(false);
    setReso(false);
  };
  const handleCourse = () => {
    setCourse(!course);
    setCom(false);
    setReso(false);
  };
  const handleReso = () => {
    setReso(!reso);
    setCourse(false);
    setCom(false);
  };

  const handleDot = (id) => {
    setDot(!dot);
    setId(id);
  };
  const handleReply = (id) => {
    setCommments(!commments);
    setRid(id);
    const reeplyy = comments.filter((v, i) => v.id === id);
    setReeply(reeplyy[0].replies);
  };

  const handleLike = (id) => {
    setLike(!like);
    setLid(id);
    setDislike(false);
  };
  const handleDislike = (id) => {
    setDislike(!dislike);
    setDid(id);
    setLike(false);
  };
  const handleRlike = (id) => {
    setLike(!like);
    setRlid(id);
    setDislike(false);
  };
  const handleRdislike = (id) => {
    setDislike(!dislike);
    setRdid(id);
    setLike(false);
  };
  const handleSort = () => {
    setSort(!sort);
  };

  const drawerWidth = 240;

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          mt: { sm: `${drawerWidth - 80}px` },
        }}
      >
        <Stack direction="row" spacing={4}>
          <Typography>5,886 Comments</Typography>
          <Stack direction="row" spacing={1} sx={{ position: 'relative' }}>
            <SortIcon onClick={handleSort} sx={{ cursor: 'pointer' }} />
            <Typography>Sort by</Typography>
          </Stack>
        </Stack>
        {sort && (
          <Paper
            elevation={3}
            select
            sx={{
              width: '130px',
              height: '88px',
              padding: '8px 0px 8px 0px',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              left: '10rem',
              top: '69rem',
              zIndex: '10',
            }}
          >
            <MenuItem>Top Comments</MenuItem>
            <MenuItem>Newest first</MenuItem>
          </Paper>
        )}
        <Box sx={{ display: 'flex', gap: '2rem', width: '984px', mt: 2 }}>
          {/* <img src={comment} alt="dp" /> */}
          <TextField
            label="Type Your Comment here......"
            sx={{ width: '120%', height: '44px' }}
          ></TextField>
          <Button variant="text" sx={{ height: '44px', padding: '14px 16px' }}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ height: '44px', padding: '14px 16px' }}>
            Comment
          </Button>
        </Box>
        {com && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5rem', mt: 5 }}>
            {comments.map((values, i) => (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                <Box sx={{ display: 'flex', gap: '1rem', height: '44px' }}>
                  <img src={values.img} alt="dp" />
                  <Stack direction="column" spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Stack direction="row" spacing={0.5}>
                        <Typography sx={{ fontSize: '13px', fontWeight: 'bold', color: '#292929' }}>
                          {values.name}
                        </Typography>
                        <Typography sx={{ fontSize: '12px', fontWeight: '400', color: '#A0A0A0' }}>
                          {values.time}
                        </Typography>
                      </Stack>
                      <MoreVertIcon
                        sx={{ position: 'relative', cursor: 'pointer' }}
                        onClick={() => {
                          handleDot(values.id);
                        }}
                      />
                    </Box>
                    {dot && values.id === id && (
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
                          right: '24rem',
                          textAlign: 'left',
                        }}
                      >
                        <MenuItem
                          sx={{
                            width: '130px',
                            display: 'flex',
                            justifyContent: 'space-around',
                            fontSize: '14px',
                          }}
                        >
                          <EditOutlinedIcon />
                          Edit
                        </MenuItem>
                        <MenuItem
                          sx={{
                            width: '130px',
                            display: 'flex',
                            justifyContent: 'space-around',
                            fontSize: '14px',
                          }}
                        >
                          <DeleteOutlinedIcon />
                          Delete
                        </MenuItem>
                      </Paper>
                    )}
                    <Typography sx={{ color: '#505050', fontSize: '14px' }}>
                      {values.com}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <Box
                        onClick={() => {
                          handleLike(values.id);
                        }}
                      >
                        {like && values.id === lid ? (
                          <ThumbUpAltIcon color="primary" />
                        ) : (
                          <ThumbUpOutlinedIcon />
                        )}
                      </Box>
                      <Typography sx={{ fontSize: '13px', fontWeight: '400', color: '#A0A0A0' }}>
                        {values.likes}
                      </Typography>
                      <Box
                        onClick={() => {
                          handleDislike(values.id);
                        }}
                      >
                        {dislike && values.id === did ? (
                          <ThumbDownIcon color="primary" />
                        ) : (
                          <ThumbDownAltOutlinedIcon />
                        )}
                      </Box>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: '#292929',
                          cursor: 'pointer',
                          backgroundColor: commments ? '#F5F5F5' : '',
                          padding: '5px',
                          borderRadius: '5px',
                        }}
                        onClick={() => {
                          handleReply(values.id);
                        }}
                      >
                        Reply
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
                {commments && values.id === rid && (
                  <Box>
                    <Box sx={{ display: 'flex', padding: '0rem 0rem 0.5rem 4rem' }}>
                      <ExpandLessOutlinedIcon
                        color="primary"
                        onClick={() => {
                          handleReply();
                        }}
                        sx={{ cursor: 'pointer' }}
                      />
                      <Typography color="primary">69 replies</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5rem',
                        paddingLeft: '3rem',
                      }}
                    >
                      {reeply.map((values, i) => (
                        <Box sx={{ display: 'flex', gap: '1rem', height: '44px' }}>
                          <Box sx={{ width: '24px', height: '24px' }}>
                            <img src={values.img} alt="dp" />
                          </Box>
                          <Stack direction="column" spacing={1}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Stack direction="row" spacing={0.5}>
                                <Typography
                                  sx={{ fontSize: '13px', fontWeight: 'bold', color: '#292929' }}
                                >
                                  {values.name1}
                                </Typography>
                                <Typography
                                  sx={{ fontSize: '12px', fontWeight: '400', color: '#A0A0A0' }}
                                >
                                  {values.time1}
                                </Typography>
                              </Stack>
                              <MoreVertIcon
                                sx={{ position: 'relative', cursor: 'pointer' }}
                                onClick={() => {
                                  handleDot(values.id);
                                }}
                              />
                            </Box>
                            {dot && values.id === id && (
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
                                  right: '24rem',
                                  textAlign: 'left',
                                }}
                              >
                                <MenuItem
                                  sx={{
                                    width: '130px',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    fontSize: '14px',
                                  }}
                                >
                                  <OutlinedFlagIcon />
                                  report
                                </MenuItem>
                              </Paper>
                            )}
                            <Typography sx={{ color: '#505050', fontSize: '14px' }}>
                              {values.com1}
                            </Typography>
                            <Stack direction="row" spacing={2}>
                              <Box
                                onClick={() => {
                                  handleRlike(values.id);
                                }}
                              >
                                {like && values.id === rlid ? (
                                  <ThumbUpAltIcon color="primary" />
                                ) : (
                                  <ThumbUpOutlinedIcon />
                                )}
                              </Box>
                              <Typography
                                sx={{ fontSize: '13px', fontWeight: '400', color: '#A0A0A0' }}
                              >
                                {values.likes1}
                              </Typography>
                              <Box
                                onClick={() => {
                                  handleRdislike(values.id);
                                }}
                              >
                                {dislike && values.id === rdid ? (
                                  <ThumbDownIcon color="primary" />
                                ) : (
                                  <ThumbDownAltOutlinedIcon />
                                )}
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                  color: '#292929',
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  handleReply(values.id);
                                }}
                              >
                                Reply
                              </Typography>
                            </Stack>
                          </Stack>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Discussion;
