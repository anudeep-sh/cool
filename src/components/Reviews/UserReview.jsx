import React, { useEffect } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {
  Stack,
  Box,
  Typography,
  Button,
  Rating,
  TextField,
  Avatar,
  ListItemIcon,
  ListItemText,
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
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import { manipulateuserdata } from '../../Redux/UserData/User-Action';
import { SET_ALERT_DATA } from '../../Redux/UserData/User-Constants';
import ThumbDownOffAltRoundedIcon from '@mui/icons-material/ThumbDownOffAltRounded';
import { courseReviewAPI } from '../../api/requests/courses/courseReviewAPI';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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

const UserReview = ({ valuess, getReviews, setUserReviewPresent }) => {
  const [value, setValue] = useState(valuess?.rating);
  const [hover, setHover] = useState(-1);
  const [revlike, setRevlike] = useState(false);
  const [revlikeid, setRevlikeid] = useState();
  const [revdlike, setRevdlike] = useState(false);
  const [revdlikeid, setRevdlikeid] = useState();
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [UserReviews, setUserReviews] = useState(valuess?.review);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleCloseDeleteDialog = () => [setOpenDeleteDialog(false)];

  const handleopen = () => {
    setDialog(true);
    setOpen(true);
  };

  const handleDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  

  const { id } = useParams();

  const giveLike = async (id, isDisliked) => {
    try {
      const data = await courseReviewAPI.handleLikesAndDislikes(id, 'LIKE', {});
      if (isDisliked) {
        valuess.likes = valuess.likes + 1;
        valuess.disLikes = valuess.disLikes - 1;
        valuess.isDisLiked = null;
        valuess.isLiked = true;
      } else {
        valuess.likes = valuess.likes + 1;
        valuess.isLiked = true;
      }
    } catch (err) {}
  };

  const giveDislike = async (id, isLiked, i) => {
    try {
      const data = await courseReviewAPI.handleLikesAndDislikes(id, 'DISLIKE', {});
      if (isLiked) {
        valuess.disLikes = valuess.disLikes + 1;
        valuess.likes = valuess.likes - 1;
        valuess.isLiked = null;
        valuess.isDisLiked = true;
      } else {
        valuess.disLikes = valuess.disLikes + 1;
        valuess.isDisLiked = true;
      }
    } catch (err) {}
  };

  const removeLikes = async (id, i) => {
    try {
      const data = await courseReviewAPI.handleLikesAndDislikes(id, 'REMOVELIKE', {});
      valuess.likes = valuess.likes - 1;
      valuess.isLiked = null;
    } catch (err) {}
  };

  const removeDislikes = async (id, i) => {
    try {
      const data = await courseReviewAPI.handleLikesAndDislikes(id, 'REMOVEDISLIKE', {});
      valuess.disLikes = valuess.disLikes - 1;
      valuess.isDisLiked = null;
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

  const handleEdit = async () => {
    try {
      const body = {
        review: UserReviews,
        rating: value,
      };
      const data = await courseReviewAPI.updateReviews(valuess.id, body);
      handleAlert('Review Edited Successfully', 'success');
      setDialog(false);
      setOpen(false);
      setAnchorEl(null);
      getReviews();
    } catch (err) {
      handleAlert('Could not edit review', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      const data = await courseReviewAPI.deleteReview(valuess.id, {});
      setOpenDeleteDialog(false);
      handleAlert('Successfully Deleted Review', 'success');
      getReviews();
      setAnchorEl(null);
      setUserReviewPresent(false);
    } catch (err) {
      handleAlert('Could not delete review', 'error');
    }
  };

  const ITEM_HEIGHT = 48;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
        padding: '0.85rem 0.85rem',
        marginBottom: '1.5rem',
      }}
    >
      <Box sx={{ display: 'flex', gap: '12px' }}>
        <Avatar
          sx={{
            width: { xs: 32, md: 42 },
            height: { xs: 32, md: 42 },
            alignItems: 'center',
            lineHeight: { xs: 14, sm: 24 },
          }}
          alt={valuess?.userData?.username}
          src={valuess?.userData?.profilePhotoLink}
        >
          {valuess?.userData?.username.charAt(0)}
        </Avatar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: '600' }}>
            {valuess?.userData?.username}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {valuess?.rating && (
              <Rating
                precision={0.5}
                readOnly
                value={value}
                sx={{ fontSize: { xs: '16px', sm: '16px', lg: '18px' } }}
                className={
                  <StarBorderIcon
                    sx={{
                      color: '#FAAF00',
                      fontSize: { xs: '16px', sm: '16px', lg: '18px' },
                    }}
                  />
                }
              />
            )}
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
              {moment(valuess?.created_at).fromNow()}
            </Typography>
          </Stack>
          {/* </Stack> */}
        </Box>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={openMenu ? 'long-menu' : undefined}
          aria-expanded={openMenu ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={handleopen}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDeleteDialog}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
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
          {valuess?.review}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Box
            onClick={() => {
              handlerevlike(valuess?.id, valuess?.isLiked, valuess?.isDisLiked, id);
            }}
            sx={{ cursor: 'pointer' }}
          >
            {valuess?.isLiked ? (
              <ThumbUpAltIcon color="primary" sx={{ fontSize: { xs: '16px', md: '18px' } }} />
            ) : (
              <ThumbUpOutlinedIcon color="#717478" sx={{ fontSize: { xs: '16px', md: '18px' } }} />
            )}
          </Box>
          <Typography variant="caption" sx={{ color: '#A0A0A0', fontWeight: '500' }}>
            {valuess?.likes}
          </Typography>
          <Box
            onClick={() => {
              handlerevdislike(valuess?.id, valuess?.isLiked, valuess?.isDisLiked, id);
            }}
            sx={{ cursor: 'pointer' }}
          >
            {valuess?.isDisLiked ? (
              <ThumbDownIcon color="primary" sx={{ fontSize: { xs: '16px', md: '18px' } }} />
            ) : (
              <ThumbDownOffAltRoundedIcon
                color="#717478"
                sx={{ fontSize: { xs: '16px', md: '18px' } }}
              />
            )}
          </Box>
          <Typography variant="caption" sx={{ color: '#A0A0A0', fontWeight: '500' }}>
            {valuess?.disLikes}
          </Typography>
        </Stack>
      </Box>
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
            Edit Your Review
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
                  <StarBorderIcon style={{ opacity: 0.55, color: '#FAAF00' }} fontSize="inherit" />
                }
              />
              <TextField
                label="Edit your review here..."
                rows={10}
                value={UserReviews}
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
                handleEdit();
              }}
            >
              Edit Review
            </Button>
          </DialogActions>
        </Dialog>
      )}
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
        <DialogTitle id="alert-dialog-title">{'Do you really want to delete?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This Review Will Be Permanently Deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete()}>Yes</Button>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserReview;
