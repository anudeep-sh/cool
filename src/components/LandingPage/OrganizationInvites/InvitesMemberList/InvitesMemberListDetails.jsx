import React, { useState } from 'react';
import InfoIcon from '../../../../assets/LandingPage/Org/MemberListInfoIcon.svg';
import RemoveMemberIcon from '../../../../assets/LandingPage/Org/account-remove-outline.svg';
import { handleAlert } from '../../../../utils/handleAlert';

import { organizationAPI } from '../../../../api/requests/organization/organizationAPI';
import { Tooltip } from '@mui/material';
import '../OrganizationInvites.css';

export default function InvitesMemberListDetails({ member, userRole }) {
  const [updatedRoles, setUpdatedRoles] = useState({});

  const updateRole = async (username, updatedRole) => {
    try {
      if (member.role !== updatedRole) {
        const response = await organizationAPI.updateRole(username, updatedRole);
        handleAlert('Role updated successfully:', 'success');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const removeMemberFromOrganization = async (username) => {
    try {
      const response = await organizationAPI.removeMember(username);
      handleAlert('Member removed successfully:', 'success');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const renderProfilePhoto = (user) => {
    if (user.profilePhotoLink) {
      return <img style={{ width: '40px', height: ' 40px' }} src={user.profilePhotoLink} alt="" />;
    } else {
      const firstNameInitial = user.firstName?.charAt(0) || '';
      const lastNameInitial = user.lastName?.charAt(0) || '';

      return (
        <div className="initials-container">
          <span>{firstNameInitial}</span>
          <span>{lastNameInitial}</span>
        </div>
      );
    }
  };

  const getTooltipText = (role) => {
    if (role === 'SUPERADMIN' || role === 'CREATOR') {
      return (
        <div>
          <ul>
            <li>
              Edit and update organizational details, including mission statements and branding.
            </li>
            <li>Track and analyze performance of any task or course across the entire platform.</li>
            <li>
              Analyze usage statistics to understand user behavior and identify popular courses.
            </li>
            <li>Contribute to strategic planning by leveraging insights from usage statistics.</li>
            <li>
              Serve as the top-level administrator, overseeing both educational and organizational
              aspects.
            </li>
          </ul>
        </div>
      );
    } else if (role === 'ADMIN') {
      return (
        <div>
          <ul>
            <li>
              Create and manage courses, specifying subjects, topics, and learning objectives.
            </li>
            <li>Assign tasks and activities to users for an engaging learning experience.</li>
            <li>Monitor individual user progress within assigned tasks and courses.</li>
            <li>Provide user support related to course content and tasks.</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <ul>
            <li>Enroll in courses based on personal or organizational learning goals.</li>
            <li>Access course content, participate in activities, and complete assigned tasks.</li>
            <li>Track personal progress within enrolled courses.</li>
            <li>Seek assistance or clarification on course-related matters when needed.</li>
            <li>
              Contribute to the organization's goals by completing assigned tasks and courses.
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div>
      {member.map((user) => (
        <div key={user.username}>
          <div>
            <div className="viewSecondRow-orgDetailsMemberBlock-Email">
              <div className="viewSecondRow-orgDetailsMemberBlockDetsCont">
                <div className="viewSecondRow-orgDetailsMemberBlockDetsCont-Email">
                  {renderProfilePhoto(user)}
                  <div className="viewSecondRow-orgDetailsMemberBlockDets viewSecondRow-orgDetailsMemberBlockDets-Invite">
                    <p className="memberTitle">
                      {user.firstName} {user.lastName}
                    </p>
                    <span>{user.username}</span>
                  </div>
                </div>
                {userRole === 'ADMIN' || userRole === null ? (
                  <div className="MembersList-ButtonsCont">
                    {user.role === null ? (
                      <div className="MembersList-Role">User</div>
                    ) : (
                      <div className="MembersList-Role">{user.role}</div>
                    )}
                    <Tooltip title={getTooltipText(user.role)} placement="left">
                      <img src={InfoIcon} alt="" />
                    </Tooltip>
                  </div>
                ) : userRole === 'SUPERADMIN' || userRole === 'CREATOR' ? (
                  <div className="MembersList-ButtonsCont">
                    {user.role === null ? (
                      <div className="MembersList-Role-SA">
                        <select
                          className="MembersList-Select"
                          onChange={(e) => {
                            const selectedRole = e.target.value;
                            setUpdatedRoles((prevRoles) => ({
                              ...prevRoles,
                              [user.username]: selectedRole,
                            }));
                            updateRole(user.username, selectedRole);
                          }}
                        >
                          <option value="USER">USER</option>
                          <option value="SUPERADMIN">SUPERADMIN</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </div>
                    ) : user.role === 'SUPERADMIN' || userRole === 'CREATOR' ? (
                      <div className="MembersList-Role-SA">
                        <select
                          className="MembersList-Select"
                          disabled={user.role === 'CREATOR'}
                          value={user.role}
                          onChange={(e) => {
                            const selectedRole = e.target.value;
                            setUpdatedRoles((prevRoles) => ({
                              ...prevRoles,
                              [user.username]: selectedRole,
                            }));
                            updateRole(user.username, selectedRole);
                          }}
                        >
                          <option value="SUPERADMIN">SUPERADMIN</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="USER">USER</option>
                          <option value="CREATOR" disabled>
                            CREATOR
                          </option>
                        </select>
                      </div>
                    ) : user.role === 'ADMIN' ? (
                      <div className="MembersList-Role-SA">
                        <select
                          className="MembersList-Select"
                          onChange={(e) => {
                            const selectedRole = e.target.value;
                            setUpdatedRoles((prevRoles) => ({
                              ...prevRoles,
                              [user.username]: selectedRole,
                            }));
                            updateRole(user.username, selectedRole);
                          }}
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="USER">USER</option>
                          <option value="SUPERADMIN">SUPERADMIN</option>
                          <option value="CREATOR">CREATOR</option>
                        </select>
                      </div>
                    ) : null}
                    {user.role !== 'CREATOR' && (
                      <img
                        className="MembersList-RemoveIcon"
                        src={RemoveMemberIcon}
                        alt=""
                        onClick={() => removeMemberFromOrganization(user.username)}
                      />
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
