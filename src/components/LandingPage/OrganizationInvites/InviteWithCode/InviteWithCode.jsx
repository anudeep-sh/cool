import React from 'react';
import '../OrganizationInvites.css';
import InviteWithCodeDetails from './InviteWithCodeDetails';
export default function InviteWithCode({ code }) {
  return (
    <div className="InviteWithCodeDiv">
      <p>Invite with Code :</p>
      <InviteWithCodeDetails Code={code} />
    </div>
  );
}
