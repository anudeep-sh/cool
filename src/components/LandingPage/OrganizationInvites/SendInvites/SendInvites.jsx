import React, { useState } from 'react';
import SendButtonInvitesIcon from '../../../../assets/LandingPage/Org/SendInvitesBtnIcon.svg';
import AddEmailButtonIcon from '../../../../assets/LandingPage/Org/EmailBtnIcon.svg';
import '../OrganizationInvites.css';
import { handleAlert } from '../../../../utils/handleAlert';

import SendInvitesDetails from './SendInvitesDetails';
import AddEmailPopUp from './AddEmailPopUp';
import { organizationAPI } from '../../../../api/requests/organization/organizationAPI';
export default function SendInvites() {
  

  const [orgNote, setOrgNote] = useState('');
  const [enteredEmails, setEnteredEmails] = useState([]);
  const [showAddEmailPopup, setShowAddEmailPopup] = useState(false);

  const openAddEmailPopup = () => {
    setShowAddEmailPopup(true);
  };

  const closeAddEmailPopup = () => {
    setShowAddEmailPopup(false);
  };
  const handleSendInvites = async () => {
    if (enteredEmails.length > 0) {
      try {
        const response = await organizationAPI.inviteViaEmail({
          note: orgNote,
          emails: enteredEmails,
        });
        handleAlert('Invites sent successfully:', 'success');
        closeAddEmailPopup();
        window.location.reload();
      } catch (error) {
        console.error('Error sending invites:', error.message);
      }
    } else {
      console.error('* Please enter at least one email address to send invites');
    }
  };
  const handleAddEmails = (enteredEmails) => {
    setEnteredEmails(enteredEmails);
  };

  const handleRemoveEmail = (emailToRemove) => {
    const updatedEmails = enteredEmails.filter((email) => email !== emailToRemove);
    setEnteredEmails(updatedEmails);
  };

  return (
    <>
      <div className="SendInvitesCon">
        <div>
          <div className="SendInvitesCon-addingEmailsCon">
            <p>Add Emails :</p>
            <button className="SendInvites-Btn-AddEmail" onClick={openAddEmailPopup}>
              Add Email ID <img src={AddEmailButtonIcon} alt="" />
            </button>
          </div>
          <div className="SendInvites-AddEmailCon">
            <p>Included Emails :</p>
            <div className="SendInvites-AddEmail-EmailList">
              {enteredEmails.map((email, index) => (
                <SendInvitesDetails email={email} key={index} onRemove={handleRemoveEmail} />
              ))}
            </div>
          </div>
        </div>

        <div className="SendInvites-leftCon-Main">
          <p>Add note to your Invite :</p>
          <div className="SendInvites-leftCon">
            <textarea
              type="text"
              placeholder="Enter your note/message here"
              onChange={(e) => setOrgNote(e.target.value)}
            />
          </div>
          <div className="SendInvites-BtnCon">
            <button className="SendInvites-Btn-SendInvites" onClick={handleSendInvites}>
              Send Invites <img src={SendButtonInvitesIcon} alt="" />
            </button>
          </div>
        </div>

        {showAddEmailPopup && (
          <AddEmailPopUp onCancel={closeAddEmailPopup} onOk={handleAddEmails} />
        )}
      </div>
      <div className="SendInvitesCon-Phone">
        <div className="SendInvites-leftCon">
          <p>Add note to your Invite :</p>
          <textarea
            type="text"
            placeholder="Enter your note/message here"
            onChange={(e) => setOrgNote(e.target.value)}
          />
          <div className="SendInvites-BtnCon">
            <button className="SendInvites-Btn-AddEmail" onClick={openAddEmailPopup}>
              Add Email ID <img src={AddEmailButtonIcon} alt="" />
            </button>
            <button className="SendInvites-Btn-SendInvites" onClick={handleSendInvites}>
              Send Invites <img src={SendButtonInvitesIcon} alt="" />
            </button>
          </div>
        </div>
        <div className="SendInvites-AddEmailCon">
          <p> Added Emails :</p>
          <div className="SendInvites-AddEmail-EmailList">
            {enteredEmails.map((email, index) => (
              <SendInvitesDetails email={email} key={index} onRemove={handleRemoveEmail} />
            ))}
          </div>
        </div>
        {showAddEmailPopup && (
          <AddEmailPopUp onCancel={closeAddEmailPopup} onOk={handleAddEmails} />
        )}
      </div>
    </>
  );
}
