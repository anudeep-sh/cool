import React, { useEffect, useState } from 'react';
import { Backdrop } from '@mui/material';
import orgLogo from '../../assets/LandingPage/ocean-engine.svg';
import viewEye from '../../assets/LandingPage/Org/viewIcon-white.svg';
import closeIcon from '../../assets/LandingPage/Org/cancelIcon.svg';
import denyIcon from '../../assets/LandingPage/Org/denyIcon.svg';
import acceptIcon from '../../assets/LandingPage/Org/acceptIcon.svg';
import { Modal } from '@mui/material';
import { organizationAPI } from '../../api/requests/organization/organizationAPI';
import './Invite.css';
const Invite = ({ inviteId, setSelectedOrgName }) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [inviteInfo, setInviteInfo] = useState();
  useEffect(() => {
    organizationAPI
      .getInvite(inviteId)
      .then((data) => {
        setInviteInfo(data.inviteData);
        setLoading(false);
      })
      .catch(() => {
        window.location.replace('/organization');
      });
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const acceptInvite = () => {
    organizationAPI
      .inviteAction(inviteId, 'ACCEPT')
      .then(() => {
        window.location.replace(`/org/${inviteInfo?.organizationdata?.name}/dashboard`);
        localStorage.setItem('orgName', inviteInfo?.organizationdata?.name);
      })
      .catch(() => handleClose());
  };
  const rejectInvite = () => {
    organizationAPI
      .inviteAction(inviteId, 'REJECT')
      .then(() => window.location.replace('/organization'))
      .catch(() => handleClose());
  };
  const openView = (organizationName) => {
    setSelectedOrgName(organizationName);
  };

  return (
    <div>
      <Modal
        open={open && !loading}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <div className="inviteActionModal ">
          <button onClick={handleClose} className="inviteActionClose">
            <img src={closeIcon} alt="" />
          </button>
          <h1 className="inviteActionHead">You have received an Invite:</h1>
          <h4 className="inviteActionSubhead">
            View and respond to organizations invitations and thoughtfully express your decision to
            accept or decline the invitations.
          </h4>
          <div className="inviteActionCon">
            <div className="inviteActionOrg">
              <img
                width={'60px'}
                height={'60px'}
                srcSet={[inviteInfo?.organizationdata?.orglink, orgLogo]}
                alt=""
              />
              <div className="inviteActionOrgName">
                <h3 className="">{inviteInfo?.organizationdata?.name}</h3>
                <h5>{inviteInfo?.organizationdata?.domain}</h5>
              </div>
              <button
                className="btn-viewOrg"
                onClick={() => openView(inviteInfo?.organizationdata?.name)}
              >
                <span>View Org</span>
                <img width={'20px'} height={'20px'} src={viewEye} alt="" />
              </button>
            </div>
            <div className="inviteActionBtns">
              <button onClick={acceptInvite} className="btn-accept">
                <span>Accept</span>
                <img width={'20px'} height={'20px'} src={acceptIcon} alt="" />
              </button>
              <button onClick={rejectInvite} className="btn-deny">
                <span>Deny</span>
                <img width={'24px'} height={'24px'} src={denyIcon} alt="" />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Invite;
