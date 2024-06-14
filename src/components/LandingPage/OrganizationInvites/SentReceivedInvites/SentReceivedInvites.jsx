import React from 'react';
import '../OrganizationInvites.css';
import OrganizationMembers from '../../Org/OrganizationMembers/MembersList';

export default function SentReceivedInvites({ DataFromApiInvites, DataFromApiRRequests }) {
  return (
    <div className="SentReceivedInvitesCon">
      <div className="SentReceivedInvites-1">
        <p>Invites Sent :</p>
        {DataFromApiInvites && DataFromApiInvites.length > 0 ? (
          <div className="SentReceivedInvites-1-MemberList">
            <OrganizationMembers
              members={DataFromApiInvites}
              showEmail={true}
              inviteSent={true}
              UsedForInvitesSent={true}
            />
          </div>
        ) : (
          <div className="SentReceivedInvites-1-MemberList">
            <span className="DataFromApiSent">No invites sent.</span>
          </div>
        )}
      </div>
      <div className="SentReceivedInvites-2">
        <p>Requests Received :</p>
        {DataFromApiRRequests && DataFromApiRRequests.length > 0 ? (
          <div className="SentReceivedInvites-1-MemberList">
            <OrganizationMembers
              members={DataFromApiRRequests}
              showEmail={false}
              inviteAccepted={false}
              inviteRejected={false}
              inviteReceived={false}
              requestReceived={true}
            />
          </div>
        ) : (
          <div className="SentReceivedInvites-1-MemberList">
            <span className="DataFromApiReceived">No requests received.</span>
          </div>
        )}
      </div>
    </div>
  );
}
