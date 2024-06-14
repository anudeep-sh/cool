import React, { useState } from 'react';
import OrganizationMembers from '../../OrganizationInvites/InvitesMemberList/InvitesMemberListDetails';
import { Button, Chip, Modal, Stack, TextField, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';

import { handleAlert } from '../../../../utils/handleAlert';
import { organizationAPI } from '../../../../api/requests/organization/organizationAPI';

export default function InvitesMemberList({ organizationMembers, userRole, fetchInvite }) {
  const [searchInput, setSearchInput] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [open, setOpen] = useState(false);
  const [mailArray, setMailArray] = useState([]);
  const [mail, setMail] = useState('');
  const [note, setNote] = useState('');

  const handleSearch = () => {
    const searchTerm = searchInput.trim();
    const filtered = searchTerm
      ? organizationMembers.filter((member) => {
        const formattedSearchTerm = capitalize(searchTerm);
        const formattedFirstName =
          typeof member.firstName === 'string' ? capitalize(member.firstName) : '';
        const formattedLastName =
          typeof member.lastName === 'string' ? capitalize(member.lastName) : '';
        const fullName =
          formattedFirstName && formattedLastName
            ? `${formattedFirstName} ${formattedLastName}`
            : '';

        return fullName.includes(formattedSearchTerm);
      })
      : organizationMembers;

    setFilteredMembers(filtered);
    setIsSearchPerformed(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleMailArray = (index) => {
    const des = [...mailArray];
    des.splice(index, 1);
    setMailArray(des);
  };

  const capitalize = (s) => {
    try {
      if (typeof s !== 'string' || s.length === 0) {
        throw new Error('Input is not a non-empty string');
      }
      return s.charAt(0).toUpperCase() + s.slice(1);
    } catch (error) {
      console.error('Error in capitalize function:', error.message);
      return s;
    }
  };

  async function sendInvite() {
    if (mailArray.length > 0) {
      try {
        await organizationAPI.inviteViaEmail({
          note: note,
          emails: mailArray,
        });
        handleAlert('Invites sent successfully:', 'success');
        fetchInvite();
      } catch (error) {
        handleAlert(error.message, 'error');
      }
    } else {
      handleAlert('Please enter atleast one email', 'warning');
    }
    setOpen(false);
    setMailArray([]);
    setNote('');
  }

  return (
    <div className="OrganizationInvites-SearchUsers">
      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { sm: '400px', xs: '80vw' },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            gap: '8px',
          }}
        >
          <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>Invite Members</Typography>
          <Typography sx={{ fontSize: '16px' }}>
            Add one or more emails to invite your team members
          </Typography>
          <TextField
            placeholder="Enter mail id"
            helperText="Press Enter to add the email ids"
            size="small"
            onChange={(e) => setMail(e.target.value)}
            value={mail}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter') {
                ev.preventDefault();
                if (isValidEmail(mail)) {
                  setMailArray((mailArray) => [...mailArray, mail]);
                  setMail('');
                } else {
                  handleAlert('Enter valid email', 'warning');
                }
              }
            }}
          />
          <Stack direction={'row'} sx={{ maxWidth: '100%', flexWrap: 'wrap', gap: '4px' }}>
            {mailArray?.map((x, index) => (
              <Chip label={x} onDelete={() => handleMailArray(index)} />
            ))}
          </Stack>
          <Typography sx={{ fontWeight: '600' }}>Add note to your invite</Typography>
          <TextField
            placeholder="Enter your note/message here"
            minRows={2}
            maxRows={4}
            multiline
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#93A9FA',
              borderRadius: '14px',
              textTransform: 'none',
              fontWeight: '500',
            }}
            endIcon={<Send />}
            onClick={() => sendInvite()}
          >
            Invite
          </Button>
        </Stack>
      </Modal>
      <div className="SearchUsers-title">
        <p>Members</p>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#93A9FA',
            borderRadius: '14px',
            textTransform: 'none',
            fontWeight: '500',
          }}
          onClick={() => setOpen(true)}
        >
          Invite Members
        </Button>
      </div>
      <div className="OrganizationInvites-SearchUsers-top">
        <input
          type="text"
          placeholder="Enter Name..."
          value={searchInput}
          onChange={(e) => {
            setFilteredMembers(organizationMembers);
            setSearchInput(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch} style={{ fontSize: '16px' }}>
          Search
        </button>
      </div>
      <div className="OrganizationInvites-SearchUsers-List">
        {searchInput === '' ? (
          organizationMembers.length > 0 ? (
            <OrganizationMembers member={organizationMembers} userRole={userRole} />
          ) : (
            <p>No users found. Send invites to add members.</p>
          )
        ) : isSearchPerformed && filteredMembers.length > 0 ? (
          <OrganizationMembers member={filteredMembers} userRole={userRole} />
        ) : isSearchPerformed ? (
          <p>
            There is no user found in the organization. Please send an invitation to their email.
          </p>
        ) : null}
      </div>
    </div>
  );
}
