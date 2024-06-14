import React from 'react';
import '../ViewOrganizations.css';
import './MembersList.css';
import EmailIcon from '../../../../assets/LandingPage/Org/send-email-Black.svg';
import AcceptIconBtn from '../../../../assets/LandingPage/Org/AcceptIconBtn.svg';
import RejectIconBtn from '../../../../assets/LandingPage/Org/RejectIconBtn.svg';
import { organizationAPI } from '../../../../api/requests/organization/organizationAPI';
import ViewORgBtnIcon from '../../../../assets/LandingPage/Org/viewOrgWhiteIcon.svg';
import { handleAlert } from '../../../../utils/handleAlert';

export default function MemberDetails({
  member,
  showEmail,
  inviteSent,
  inviteAccepted,
  inviteRejected,
  inviteReceived,
  UsedForInvitesSent,
  sendMail,
  organization,
  setSelectedOrgName,
  requestReceieved,
}) {
  if (!member) {
    return null;
  }

  const renderProfilePhoto = () => {
    if (member.profilePhotoLink || member.user?.profilePhotoLink) {
      return (
        <img
          style={{ width: '40px', height: ' 40px' }}
          src={member?.profilePhotoLink || member.user?.profilePhotoLink}
          alt=""
          width={'40px'}
          height="auto"
        />
      );
    } else {
      const firstNameInitial =
        member?.firstName?.charAt(0) || member.user?.firstName?.charAt(0) || '';
      const lastNameInitial = member?.lastName?.charAt(0) || member.user?.lastName?.charAt(0) || '';

      return (
        <div className="initials-container">
          <span>{firstNameInitial}</span>
          <span>{lastNameInitial}</span>
        </div>
      );
    }
  };
  const renderProfilePhotoOrg = () => {
    if (member?.organization.logoLink) {
      return (
        <img
          style={{ width: '40px', height: ' 40px' }}
          src={member?.organization?.logoLink}
          alt=""
        />
      );
    } else {
      const firstNameInitial = member?.organization?.name?.charAt(0) || '';
      return (
        <div className="initials-container">
          <span>{firstNameInitial}</span>
        </div>
      );
    }
  };
  const acceptInvite = () => {
    organizationAPI
      .inviteAction(member.id, 'ACCEPT')
      .then(() => {
        window.location.reload();
        handleAlert('Invite accepted successfully', 'success');
      })
      .catch((error) => {
        handleAlert('Error accepting invite', 'error');
      });
  };

  const rejectInvite = () => {
    organizationAPI
      .inviteAction(member.id, 'REJECT')
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        handleAlert('Error rejecting invite', 'error');
      });
  };

  const acceptRequest = () => {
    organizationAPI
      .requestAction(member.id, 'ACCEPT')
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        handleAlert('Error accepting request', 'error');
      });
  };

  const rejectRequest = () => {
    organizationAPI
      .requestAction(member.id, 'REJECT')
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        handleAlert('Error rejecting request', 'error');
      });
  };

  const openView = (organizationName) => {
    setSelectedOrgName(organizationName);
  };

  return (
    <>
      {sendMail ? (
        <div className="viewSecondRow-orgDetailsMemberBlock-Email">
          <div className="viewSecondRow-orgDetailsMemberBlockDetsCont">
            <div className="viewSecondRow-orgDetailsMemberBlockDetsCont-Email">
              {renderProfilePhoto()}
              <div className="viewSecondRow-orgDetailsMemberBlockDets">
                <p>
                  {member?.firstName} {member?.lastName}
                </p>
                <span>{showEmail ? member?.Email : member?.username}</span>
              </div>
            </div>
            <div className="MembersList-ButtonsCont">
              <img src={EmailIcon} alt="" />
            </div>
          </div>
        </div>
      ) : UsedForInvitesSent ? (
        <div className="viewSecondRow-orgDetailsMemberBlock-Invite">
          <div className="viewSecondRow-orgDetailsMemberBlockDets-Email">
            <p>{showEmail ? member?.created_for : member?.username} </p>
          </div>
          <div className="MembersList-ButtonsCont">
            <button className="MembersList-AcceptedBtn">&#x2022; &nbsp;{member?.status}</button>
          </div>
        </div>
      ) : organization ? (
        <div className="viewSecondRow-Notification">
          <div className="viewSecondRow-orgDetailsMemberBlock-PhotoUserName">
            {renderProfilePhotoOrg()}
            <div className="viewSecondRow-orgDetailsMemberBlockDets">
              <p>{member?.organization?.name}</p>
              <button
                className="ViewBtnNotification"
                style={{
                  borderRadius: '15px',
                  background: '#98AFFF',
                  border: 'none',
                  padding: '3px 10px',
                  color: 'white',
                  filter: ' drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.50))',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  marginTop: '5px',
                }}
                onClick={() => openView(member?.organization?.name)}
              >
                View Org
                <img src={ViewORgBtnIcon} style={{ width: '22px', height: 'auto' }} alt="" />
              </button>
            </div>
          </div>

          <div className="MembersList-ButtonsCont">
            {inviteSent ? (
              <button className="MembersList-AcceptedBtn">&#x2022; &nbsp;{member.status}</button>
            ) : inviteAccepted ? (
              <button className="MembersList-AcceptedBtn">&#x2022; &nbsp;Accepted</button>
            ) : inviteRejected ? (
              <button className="MembersList-RejectedBtn">&#x2022; &nbsp;Rejected</button>
            ) : inviteReceived ? (
              <div className="MembersList-inviteReceived">
                <button
                  className="MembersList-inviteReceived-Accept"
                  onClick={() => acceptInvite()}
                >
                  Accept <img src={AcceptIconBtn} alt="" />
                </button>
                <button
                  className="MembersList-inviteReceived-Reject"
                  onClick={() => rejectInvite()}
                >
                  Reject <img src={RejectIconBtn} alt="" />
                </button>
              </div>
            ) : requestReceieved ? (
              <div className="MembersList-inviteReceived">
                <button
                  className="MembersList-inviteReceived-Accept"
                  onClick={() => acceptRequest()}
                >
                  Accept <img src={AcceptIconBtn} alt="" />
                </button>
                <button
                  className="MembersList-inviteReceived-Reject"
                  onClick={() => rejectRequest()}
                >
                  Reject <img src={RejectIconBtn} alt="" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="viewSecondRow-orgDetailsMemberBlock">
          <div className="viewSecondRow-orgDetailsMemberBlock-PhotoUserName">
            {renderProfilePhoto()}
            <div className="viewSecondRow-orgDetailsMemberBlockDets">
              <p>
                {member.user?.firstName || member?.firstName}
                {member.user?.lastName || member?.lastName}
              </p>
              <span>
                {showEmail ? member.user?.Email : member.user?.username || member?.username}
              </span>
            </div>
          </div>

          <div className="MembersList-ButtonsCont">
            {inviteSent ? (
              <button className="MembersList-AcceptedBtn">&#x2022; &nbsp;{member.status}</button>
            ) : inviteAccepted ? (
              <button className="MembersList-AcceptedBtn">&#x2022; &nbsp;Accepted</button>
            ) : inviteRejected ? (
              <button className="MembersList-RejectedBtn">&#x2022; &nbsp;Rejected</button>
            ) : inviteReceived ? (
              <div className="MembersList-inviteReceived">
                <button
                  className="MembersList-inviteReceived-Accept"
                  onClick={() => acceptInvite()}
                >
                  Accept <img src={AcceptIconBtn} alt="" />
                </button>
                <button
                  className="MembersList-inviteReceived-Reject"
                  onClick={() => rejectInvite()}
                >
                  Reject <img src={RejectIconBtn} alt="" />
                </button>
              </div>
            ) : requestReceieved ? (
              <div className="MembersList-inviteReceived">
                <button
                  className="MembersList-inviteReceived-Accept"
                  onClick={() => acceptRequest()}
                >
                  Accept <img src={AcceptIconBtn} alt="" />
                </button>
                <button
                  className="MembersList-inviteReceived-Reject"
                  onClick={() => rejectRequest()}
                >
                  Reject <img src={RejectIconBtn} alt="" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
