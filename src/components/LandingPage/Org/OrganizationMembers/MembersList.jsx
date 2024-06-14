import React from 'react';
import '../ViewOrganizations.css';
import MemberDetails from './MemberDetails';

export default function MembersList({
  members,
  showEmail,
  inviteSent,
  inviteAccepted,
  inviteRejected,
  inviteReceived,
  UsedForInvitesSent,
  sendMail,
  organization,
  setSelectedOrgName,
  requestReceieved
}) {
  return (
    <div
      className={
        organization
          ? 'viewSecondRow-orgDetailsMembersListNotification'
          : 'viewSecondRow-orgDetailsMembersList'
      }
    >

      {members?.map((member) => (
        <div key={member.username}>
          <MemberDetails
            member={member}
            showEmail={showEmail}
            inviteAccepted={inviteAccepted}
            inviteRejected={inviteRejected}
            inviteReceived={inviteReceived}
            requestReceieved={requestReceieved}
            sendMail={sendMail}
            inviteSent={inviteSent}
            UsedForInvitesSent={UsedForInvitesSent}
            organization={organization}
            setSelectedOrgName={setSelectedOrgName}
          />
        </div>
      ))}
    </div>
  );
}

MembersList.defaultProps = {
  members: [],
};
