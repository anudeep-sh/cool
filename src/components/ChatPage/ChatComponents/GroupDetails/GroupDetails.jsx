import { Avatar, Box, Button, Typography, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { ChatApi } from '../../../../api/requests/chat/ChatApi';
import AddMembers from './AddMembers';
import BigLoader from '../../../Skeleton/BigLoader';
import { handleAlert } from '../../../../utils/handleAlert';
import CloseIcon from '@mui/icons-material/Close';
import { CommonColors } from '../../../../utils/colors';
import MemberActionPopUp from '../../../PopUp/MemberActionPopUp';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function GroupDetails({
  chat,
  setOpenDetails,
  setGroupList,
  groupList,
  handleChatUpdate,
  groupMembers,
  setGroupMembers,
}) {
  const bgColor = CommonColors.primaryBgColor;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveBtnLoading, setsaveBtnLoading] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupDetails, setGroupDetails] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [userId, setUserId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [initialGroupName, setInitialGroupName] = useState('');
  const [initialGroupDescription, setInitialGroupDescription] = useState('');

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const GetUser = () => {
    const token = localStorage.getItem('Token');

    if (token) {
      const decodedJwt = parseJwt(token);
      setUserId(decodedJwt.id);
    }
    return false;
  };

  useEffect(() => {
    GetUser();
  }, []);

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    setsaveBtnLoading(true);
    try {
      const updateRequestBody = {
        name: groupName,
        description: groupDescription,
      };
      const response = await ChatApi.updateGroupDetails(
        groupDetails.groupChatData.id,
        updateRequestBody
      );
      handleAlert('Details Updated Successfully', 'success');
      setInitialGroupName(groupName);
      setInitialGroupDescription(groupDescription);
      setEditMode(false);
    } catch (error) {
      handleAlert('error.message', 'warning');
    }
    setsaveBtnLoading(false);
  };

  const handleRemove = async (member) => {
    try {
      await ChatApi.removeUserFromGroup(groupDetails.groupChatData.id, [member.userId]);
      setGroupMembers((prevMembers) => prevMembers.filter((m) => m.userId !== member.userId));
      setSelectedMember(null);
    } catch (error) {
      handleAlert(error.message, 'warning');
    }
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const getGroupDetails = async () => {
    try {
      const response = await ChatApi.getGroupById(
        chat.chatData?.id ? chat.chatData.id : chat.id,
        1
      );
      setGroupDetails(response);
      setIsAdmin(response.isGroupAdmin);
      setGroupName(response.groupChatData.name);
      setGroupDescription(response.groupChatData.description);
      setInitialGroupName(response.groupChatData.name);
      setInitialGroupDescription(response.groupChatData.description);
    } catch (error) {
      handleAlert(error.message, 'warning');
    }
  };

  useEffect(() => {
    setLoading(true);
    getGroupDetails().finally(() => setLoading(false));
  }, [chat]);

  const handleRoleUpdate = (userId, newRole) => {
    setGroupMembers((prevMembers) =>
      prevMembers.map((member) => {
        if ((member.user_id ? member.user_id : member.id) === userId) {
          return { ...member, role: newRole };
        }
        return member;
      })
    );
  };

  const handleMenuOpen = (event, member) => {
    setSelectedMember(member);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setSelectedMember(null);
    setMenuAnchorEl(null);
  };

  const handleCancelEdit = () => {
    setGroupName(initialGroupName);
    setGroupDescription(initialGroupDescription);
    setEditMode(false);
  };

  if (loading)
    return (
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: { xs: '55%', md: '50%' },
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40%',
          height: '50%',
          alignItems: 'center',
          zIndex: '1',
        }}
      >
        <BigLoader />
      </Box>
    );

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: { md: '20px 50px', xs: '20px' },
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.35)',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: { xs: '55%', md: '52%' },
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        height: 'auto',
        alignItems: 'center',
        zIndex: '1',
      }}
    >
      <CloseIcon
        onClick={() => setOpenDetails(false)}
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
        }}
      />
      <Box display={'flex'} justifyContent={'center'}>
        <TextField
          variant="standard"
          id="outlined-helperText"
          label="Group Name"
          onChange={(e) => setGroupName(e.target.value)}
          value={groupName}
          InputProps={{
            readOnly: !editMode,
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <TextField
          variant="standard"
          multiline
          maxRows={4}
          sx={{
            width: '285px',
          }}
          id="outlined-helperText"
          label="Group Description"
          onChange={(e) => setGroupDescription(e.target.value)}
          value={groupDescription}
          InputProps={{
            readOnly: !editMode,
          }}
        />
      </Box>
      {isAdmin && (
        <Box
          display={'flex'}
          gap={'20px'}
          sx={{
            mt: 2,
          }}
        >
          <Button color="primary" onClick={handleClick} variant="outlined">
            Add Member
          </Button>
          {!editMode ? (
            <Button color="primary" onClick={() => setEditMode(true)} variant="outlined">
              Edit
            </Button>
          ) : (
            <>
              <LoadingButton
                color="primary"
                onClick={handleSaveDetails}
                loading={saveBtnLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                disabled={
                  groupName === initialGroupName && groupDescription === initialGroupDescription
                }
              >
                <span>Save</span>
              </LoadingButton>
              <Button color="primary" onClick={handleCancelEdit} variant="outlined">
                Cancel
              </Button>
            </>
          )}
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          overflowY: 'auto',
          height: { xs: '120px', md: '214px' },
          width: '100%',
          marginTop: 'auto',
          mt: 3,
        }}
      >
        <Typography variant="h6">Group Members</Typography>
        {groupMembers &&
          groupMembers.map((member, index) => (
            <Box
              key={index}
              display={'flex'}
              border={'1px solid #D3D3D3 '}
              width={'100%'}
              justifyContent={'space-between'}
              alignItems={'center'}
              borderRadius={'10px'}
              padding={'2px'}
            >
              <Box display={'flex'} gap={1} alignItems={'center'}>
                {member.profilePhotoLink ? (
                  <Avatar
                    src={member.profilePhotoLink}
                    style={{
                      backgroundColor: member.profilePhotoLink ? 'transparent' : bgColor,
                      color: member.profilePhotoLink ? 'black' : 'white',
                      width: '30px',
                      height: '30px',
                      fontSize: '19px',
                    }}
                  >
                    {member.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                ) : (
                  <Avatar
                    style={{
                      backgroundColor: member.profilePhotoLink ? 'transparent' : bgColor,
                      color: member.profilePhotoLink ? 'black' : 'white',
                      width: '30px',
                      height: '30px',
                    }}
                  >
                    {member.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <Typography key={index}>{`${member.firstName} ${member.lastName}`}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                }}
              >
                {member.role === 'ADMIN' && (
                  <Typography
                    color="primary"
                    sx={{
                      mr: 1,
                    }}
                  >
                    Admin
                  </Typography>
                )}
                {member.user_id !== userId && (
                  <>
                    <Tooltip title={`Message ${member.username}`}>
                      <IconButton>
                        <ChatIcon sx={{ color: 'grey' }} />
                      </IconButton>
                    </Tooltip>

                    {isAdmin && <MoreVertIcon onClick={(e) => handleMenuOpen(e, member)} />}
                  </>
                )}
              </Box>
            </Box>
          ))}
      </Box>
      <MemberActionPopUp
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        member={selectedMember}
        isAdmin={isAdmin}
        groupDetails={groupDetails}
        onRemove={handleRemove}
        onUpdateRole={handleRoleUpdate}
      />
      {open && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'white',
            zIndex: '2',
          }}
        >
          <AddMembers
            groupList={groupList}
            setGroupList={setGroupList}
            groupDetails={groupDetails}
            setOpen={setOpen}
            groupMembers={groupMembers}
            setGroupMembers={setGroupMembers}
          />
        </Box>
      )}
    </Box>
  );
}
