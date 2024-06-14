import React, { useState, useEffect, useRef } from 'react';
import './SendInvites.css';
import AddBtnIcon from '../../../../assets/LandingPage/Org/addbtn_invitespage_icon.svg';

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function AddEmailPopUp({ onCancel, onOk }) {
  const [emailAddresses, setEmailAddresses] = useState('');
  const [enteredEmails, setEnteredEmails] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isInputOrTextarea = ['INPUT', 'TEXTAREA', 'BUTTON'].includes(event.target.tagName);
      if (!isInputOrTextarea) {
        onCancel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);

  const handleAddEmail = () => {
    const newEmails = emailAddresses.split(',').map((email) => email.trim());
    const validEmails = newEmails.filter((email) => email !== '' && isValidEmail(email));

    if (validEmails.length > 0) {
      setEnteredEmails((prevEmails) => [...prevEmails, ...validEmails]);
      setEmailAddresses('');
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleOk = () => {
    if (enteredEmails.every(isValidEmail)) {
      onOk(enteredEmails);
      setEnteredEmails([]);
      onCancel();
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="AddEmailPopUp-View">
      <div className="AddEmailPopUp-View-main" ref={popupRef}>
        <div className="add-email-popup">
          <p>Invite team members :</p>
          <span>
            Elevate your team collaboration! Add one or more emails to invite your team members.
          </span>
          <div className="AddEmailPopUp-input">
            <textarea
              name="emailAddresses"
              id="emailAddresses"
              cols="30"
              rows="10"
              placeholder="Enter Email address here"
              value={emailAddresses}
              onChange={(e) => {
                setEmailAddresses(e.target.value);
                setIsValid(true);
              }}
            />
            <button onClick={handleAddEmail}>
              Add <img src={AddBtnIcon} alt="" />
            </button>
          </div>
          {!isValid && <div className="validation-error">Please enter a valid email address.</div>}
          {enteredEmails.length > 0 && (
            <div className="enteredEmailsDiv">
              <ul>
                {enteredEmails.map((email, index) => (
                  <li key={index}>{email}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="AddEmailPopUp-closingbtns">
            <button className="AddEmailPopUp-closingbtns-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button className="AddEmailPopUp-closingbtns-ok" onClick={handleOk}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
