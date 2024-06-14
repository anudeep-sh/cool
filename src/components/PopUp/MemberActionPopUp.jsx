import { Menu, MenuItem, Fade } from '@mui/material';
import { ChatApi } from '../../api/requests/chat/ChatApi';
import { handleAlert } from '../../utils/handleAlert';

export default function MemberActionMenu({
  anchorEl,
  open,
  onClose,
  member,
  isAdmin,
  onRemove,
  groupDetails,
  onUpdateRole,
}) {
  if (!groupDetails || !groupDetails.groupChatData || !member) {
    return null;
  }
  const groupId = groupDetails.groupChatData.id;
  const userId = member.user_id ? member.user_id : member.id;

  const handleMakeAdmin = async () => {
    try {
      const response = await ChatApi.makeAdmin(groupId, userId);
      onUpdateRole(userId, 'ADMIN');
      handleAlert(response.message, 'success');
      onClose();
    } catch (error) {
      handleAlert(error.message, 'warning');
    }
  };

  const handleDismissAdmin = async () => {
    try {
      const response = await ChatApi.makeUser(groupId, userId);
      onUpdateRole(userId, 'USER');
      handleAlert(response.message, 'success');
      onClose();
    } catch (error) {
      handleAlert(error.message, 'warning');
    }
  };

  return (
    <Menu
      id="member-action-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      TransitionComponent={Fade}
    >
      {isAdmin && (
        <>
          {member.role === 'ADMIN' ? (
            <MenuItem onClick={handleDismissAdmin}>Dismiss as Admin</MenuItem>
          ) : (
            <MenuItem onClick={handleMakeAdmin}>Make Group Admin</MenuItem>
          )}
          <MenuItem onClick={() => onRemove(member)}>Remove {member.username}</MenuItem>
        </>
      )}
      {!isAdmin && <MenuItem>Message {member.username}</MenuItem>}
    </Menu>
  );
}
