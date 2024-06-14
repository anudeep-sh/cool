import React from 'react';
import './SendInvites.css';
import RemoveEmailBtnIcon from '../../../../assets/LandingPage/Org/account-remove-outline.svg';

export default function SendInvitesDetails({ email, onRemove }) {
  const handleRemoveClick = () => {
    onRemove(email);
  };

  return (
    <div className="SendInvitesDetails-div">
      <p>{email}</p>
      <div className="SendInvitesDetails-RemoveInvitesImg" onClick={handleRemoveClick}>
        <img src={RemoveEmailBtnIcon} alt="Remove" />
      </div>
    </div>
  );
}
